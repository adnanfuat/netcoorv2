import Head from 'next/head';
import usefcmtoken from "@/components/hooksnew/usefcmtoken";
import s from "./index.module.css";
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user";
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import { MyAccount_Tasks } from '@/components/commonnew/myaccount/myaccount_tasks';
import { MyAccount_Mobicoo_AccountSelection } from '@/components/commonnew/myaccount/myaccount_mobicoo_ownerselection';
import { useQuery } from 'react-query';
import LayoutTask from "@/components/layouts/task/layouttask";



const Tasks = () =>{

  // son haberleri çek----->
  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let contractowneremailStateObj = useState(selecteduser);

  const task_systemsFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"task_systems_forusers", selecteduser } }) } ); res =  await res?.json();  return res; };
  let { data:task_systems, isLoading } = useQuery( ["task_systems_forusers", selecteduser ], async () => await task_systemsFunc());
  
  useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser]); // Ne alaka?

  let { name, permissions, user, userscopes  } = isLogged();

      useEffect(() => {
                              let initializeuser=undefined;
                              // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                              if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                              _userState.myAccountUser.email=initializeuser;                              
                }, [user?.email])

      let isTechnician  = userscopes?.isTechnician;
      let manegerAuth  =  userscopes?.isManager;
      let patreonAuth  =  userscopes?.isPatreon;
          // console.log("AAAAA::___", user);

      const { token, notificationPermissionStatus } = usefcmtoken();


      
      return (<LayoutMain layout_title={"Görevler"}>
                          <div className={s.shell}> 
                                    {/* {JSON.stringify(token)} */}
                                                                                      
                                    <Head><title>Görevler</title> </Head> 
                                    
                                    {isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {user?.email} </div> }                                                                                              
                                    { (selecteduser!="all") ? <MyAccount_Mobicoo_AccountSelection selecteduser={selecteduser}  task_systems={task_systems}/> : undefined }

                                    <LayoutTask initialtaindex={0} task_systems={task_systems}>
                                            { (selecteduser!="all") ? <MyAccount_Tasks selecteduser={selecteduser} task_systems={task_systems}  initialSearchParams={{closed:0, controlled:0}} /> : <div>---</div> }
                                    </LayoutTask>

                                    {/* {notificationPermissionStatus ? <div >{token} </div> : <div>İzinsiz</div> } */}
                            </div>
             </LayoutMain>
             );
}

export default Tasks;