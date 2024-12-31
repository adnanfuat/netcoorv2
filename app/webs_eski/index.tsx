import Head from 'next/head';
import s from "./index.module.css";
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user";
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import {Webs} from "@/modules/webs_core/webs";


const WebsPage = () =>{
        
  const childTabStateObj_1 = useState(0);        
  // son haberleri çek----->
  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let contractowneremailStateObj = useState(selecteduser);
  
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
      
      return (<LayoutMain layout_title={"Web Siteleri"}> 
                          <div className={s.shell}> 
                                    {/* {JSON.stringify(token)} */}
                                    
                                    <Head><title>Web Siteleri</title> </Head>
                                    
                                    {isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {user?.email} </div> }                                                                                              

                                    { selecteduser!="all" && <Webs selecteduser={selecteduser} childTabStateObj_1={childTabStateObj_1}/> }

                            </div>
             </LayoutMain>
             );
}

export default WebsPage;









// const task_systemsFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"task_systems_forusers", selecteduser } }) } ); res =  await res?.json();  return res; };
// let { data:task_systems, isLoading } = useQuery( ["task_systems_forusers", selecteduser ], async () => await task_systemsFunc());



// const { token, notificationPermissionStatus } = usefcmtoken();

// const sendNotification = async ({
//                       defactouserObj, // görevleri ekleyen
//                        task }) => {

//                         let { userObj, title, description, datakey } = task ?? {};

//                         let link = `/tasks/c/${datakey}`;                              
//                         // Döngü deki görevin eklendiği kişi..
                      
//                         let id = task?.id;

//                         let tokens = userObj?.firebase_tokens ?? [];
//                         let defactouser_profile_img = defactouserObj?.profile_img ?? [];
//                         defactouser_profile_img =  generateImgUrlFromFullPathObj({imgSource:( defactouser_profile_img?.[0] ), isBackgroundImg:false, defaultUrl:"/images/avatar.jpg" });                                      
//                         let defactousername = (defactouserObj.name!="" && defactouserObj.name!=undefined ) ?  `${defactouserObj?.name} ${defactouserObj?.surname} ` : defactouserObj?.user;                                                                                           
//                         let noticitaion_title= defactousername + " " + "görev ekledi:";       
                        
//                         console.log("AAAAA::::1 ", userObj);
                        
//                         for await (const tokenObj of tokens)
//                         {
//                           const response = await fetch("/api/send-notification/route", {
//                                   method: "POST",
//                                   headers: { "Content-Type": "application/json"},
//                                   body: JSON.stringify({
//                                                               token:tokenObj?.token,
//                                                               title:noticitaion_title,
//                                                               message:title, // Görev başlığı...
//                                                               link,
//                                                               imageUrl:defactouser_profile_img
//                                                       }),
//                               });
                    
//                               const data = await response.json();
//                               //       console.log("USER:::::::", userObj?.user, data, noticitaion_title, token, defactouser_profile_img  );
//                         }
     
//                           // console.log(data);

//                          fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{type:"send_browsernotification_completed", id} }) });

// };




// { (selecteduser!="all") ? <MyAccount_Mobicoo_AccountSelection selecteduser={selecteduser}  task_systems={task_systems}/> : undefined }

// <LayoutTask initialtaindex={0} task_systems={task_systems}>
//         { (selecteduser!="all") ? <MyAccount_Tasks selecteduser={selecteduser} task_systems={task_systems}  initialSearchParams={{closed:0, controlled:0}} sendNotification={sendNotification}/> : <div>---</div> }
// </LayoutTask>