import Head from 'next/head';
import MyAccount_TaskCategories from "@/components/commonnew/myaccount/myaccount_taskcategories";
import s from "./index.module.css"
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user"
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import { useQuery } from 'react-query';
import LayoutTask from '@/layouts/task/layouttask';


const  TaskCategories = () =>{

  //// son haberleri çek----->
  let isloggeddata  =  isLogged();            
  let userscopes  =  isloggeddata?.userscopes;  

  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let contractowneremailStateObj = useState(selecteduser);
  
  useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser]);

  let { name, permissions, user } = isLogged();

  const task_systemsFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"task_systems_forusers", selecteduser } }) } ); res =  await res?.json();  return res; };
  let { data:task_systems, isLoading } = useQuery( ["task_systems_forusers", selecteduser ], async () => await task_systemsFunc());

  useEffect(() => {
                          let initializeuser=undefined;
                          // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                          if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                          _userState.myAccountUser.email=initializeuser;                          
            }, [user?.email])

                        let isTechnician  = userscopes?.isTechnician;
                        let manegerAuth  =  userscopes?.isManager;
                        let patreonAuth  =  userscopes?.isPatreon;

                                                                      
      return (<LayoutMain layout_title={"Görev Kategorileri"}>
                                      <div className={s.shell}>
                                                
                                                {/* {JSON.stringify(task_systems)} */}
                                                <Head><title>Görev Kategorileri</title></Head>                                                                                                
                                                {isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {user?.email} </div> }                                                                                              
                                                {/* { (selecteduser!="all" ) ? <MyAccount_Mobicoo_AccountSelection selecteduser={selecteduser}  task_systems={task_systems}/> : undefined } */}

                                                {/* task_systems={task_systems} */}
                                                <LayoutTask  initialtaindex={3} > 
                                                        <div className={s.maintab}>
                                                                {    (selecteduser!="all" ) ? <MyAccount_TaskCategories  user={selecteduser} task_systems={task_systems}/> : <div className={s.empty}> Erişime kapalı </div>   }
                                                        </div>
                                                </LayoutTask>
                                        </div>
             </LayoutMain>
             );
}

export default TaskCategories


