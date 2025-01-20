import { mailName } from  "@/modules/functions/mailname";
import { RiEdit2Fill, RiCheckboxFill, RiRegisteredFill, RiFocus3Fill, RiLightbulbFlashLine, RiShieldCheckFill, RiShieldCheckLine, RiStarFill, RiStarHalfFill, RiChromeFill, RiNotification2Fill, RiMailFill, RiCellphoneFill  } from "react-icons/ri";
import Link from "next/link";
import {useFormik} from 'formik';
import {useQuery, useQueryClient} from "react-query";
import {useRouter } from 'next/router';
import s from "./index_core.module.css"
import { permissionsControl } from "@/components/hooksnew/permissionscontrol";
import { useEffect, useState } from "react";
import {_userState} from "@/modules/constants/user";
import { isLogged } from '@/components/hooksnew/islogged';
import { LayoutMain } from '@/layouts/console/layoutmain';
import { useSnapshot } from "valtio";
import UserSelection from "../myaccount/userselection";
import LayoutTask from "@/layouts/task/layouttask";
import { datetimeFunc } from "@/components/utilsnew/datetimefunc";
import { tabStatesFunc_WithKey } from "@/modules/functions/tabstatesfunc_withkey";
import MyAccount_PGA_CreatedTasks from "@/components/commonnew/myaccount/myaccount_pga_createdtasks";
import Modal from "react-responsive-modal";
import { TaskSystem } from "@/components/commonnew/task/tasksystem";

import sendNotification from "@/components/utilsnew/sendnotification";
import runpgasFunc from "@/components/utilsnew/runpgasfunc";


export default function  TaskSystems (props) {

const router = useRouter();    
const {locale, defaultLocale, query:{id}}= router;    

 let waitingPgasForRunStatesObj =  useState([]); // Çalıştırılmak için bekleyen PGA'lar..
let isloggeddata  =  isLogged();            
let userscopes    =  isloggeddata?.userscopes;  

let selecteduser = useSnapshot(_userState).myAccountUser.email;
let contractowneremailStateObj = useState(selecteduser);

const queryClient = useQueryClient();

const editModalStateObj    = useState(false); // Edit penceresininin state verisini tutar...


const task_systemsFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"task_systems_forusers", selecteduser } }) } ); res =  await res?.json();  return res; };
let { data:task_systems, isLoading } = useQuery( ["task_systems_forusers", selecteduser ], async () => await task_systemsFunc());


useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser]);

let { name, permissions, user } = isLogged();

    useEffect(() => {
                              let initializeuser=undefined;
                              // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                              if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                              _userState.myAccountUser.email=initializeuser;
              }, [user?.email])

        
let mobicooaccount_edit_authority=permissionsControl({askList:["mobicooaccount_edit"], type:"some"}); // parça yetkilere göre hareket etmek için sorgulama___ // slug değişimi hassas konu___


const createdTasksStateObj = useState(undefined);
   
   const formik = useFormik({
                            enableReinitialize: true,
                            initialValues: { task_systems },
                            onSubmit: (values, {setSubmitting}) => { 
                                                                        // fetcher({values}).then(()=>{ queryClient.invalidateQueries(); 
                                                                        // setSubmitting(false)});
                                                                    },
                          });   

let Mobicooaccounts =  formik?.values?.task_systems;
let isTechnician    =  userscopes?.isTechnician;
let manegerAuth     =  userscopes?.isManager;
let patreonAuth     =  userscopes?.isPatreon;

const infobarState= useState(false);

// const runpgasFunc = async ({datakey, createdTasksStateObj, selecteduser, queryClient}) => {      
//       insertingObj[1](true); let res = await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{type:"runpgas",  datakey, selecteduser  } }) }); 
//                                                 res =await res.json();
//                                                 res=res?.fetcheddata;  
                                                
//                                                 let createdtasks=res?.createdtasks;
//                                                 createdTasksStateObj[1](createdtasks);   
//                                                  console.log("asdsad1:s111 ", createdtasks);
//                                                 createdtasks?.map(task=> { if (task?.userObj?.firebase_tokens && task?.send_browsernotification) { sendNotification({defactouserObj:undefined, task, defaultBackgroundUrl:"https://www.netcoor.com/images/avatar_pga_black.jpg"}); } });   

//       setTimeout(() => { queryClient.invalidateQueries(); insertingObj[1](false); }, 4000);
//       return res;
// }; 

const insertingObj = useState(false);
let waitingPgas = waitingPgasForRunStatesObj[0]; // // Çalıştırılmak için bekleyen PGA'lar..

const insertFunc = async (task_system) => {
  insertingObj[1](true);    
  let res = await fetch("/api/swissarmyknifemutation", { method: "POST", body:
                                     JSON.stringify({ data:{type:"myaccount_tasksystem_insert", selecteduser, task_system } }) });
  queryClient.invalidateQueries(); 
  insertingObj[1](false); 
  editModalStateObj[1](false);
  return res;
};

let common_modal_props={selecteduser, insertFunc};
// console.log("editModalStateObj[0]:", editModalStateObj[0]);

  return (     <LayoutMain layout_title="Görev Sistemleri" suptitle={waitingPgas?.length>0 ? `${waitingPgas?.length} Görev sistemi PGA talimatı bekliyor!` : undefined}> 
                      <div className={s.shell}>

                        {/* {JSON.stringify(isloggeddata)} */}

                      {isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {user?.email} </div> }                                                                                                                    

                        <LayoutTask initialtaindex={4} waitingPgasLength={waitingPgas?.length}>
                           <div className={s.maintab}> 
                              
                              <div className={s.addwr} onClick={()=> editModalStateObj[1](true) }><div className={s.add_button}> Görev Sistemi Ekle </div></div> 
                              
                                 {Mobicooaccounts?.length>0 ? <TaskSystems_Listing props={{locale, queryClient, createdTasksStateObj, selecteduser, waitingPgasForRunStatesObj,  relatedcontents:Mobicooaccounts, mobicooaccount_edit_authority, insertingObj, }}/>
                                  : (isLoading || insertingObj[0]) ? <div style={{display:"flex", alignItems:"center", justifyContent:"center", minHeight:300, color:"gray", fontSize:12, cursor:"pointer"}}>Yükleniyor</div> : <div style={{display:"flex", alignItems:"center", justifyContent:"center", minHeight:300, color:"gray", fontSize:12, cursor:"pointer"}} onClick={()=>{ if(!insertingObj[0]) {insertFunc();} } }>En az bir tane görev sistemi ekleyiniz</div>                                  
                                  }  

                                  {(patreonAuth )? <div className={s.infobar}>

                                  <div className={s.aaaaaa} style={{fontWeight:"bold", fontSize:13, cursor:"pointer", userSelect:"none"}}  onClick={()=>infobarState[1](old=>!old)}> <RiLightbulbFlashLine/> Güncellemeler İçin Yol Haritası </div>  

                                  {/* {infobarState[0] &&<div style={{borderBottom:"2px solid gray", marginTop:20}}>Yapılması gerekenler</div>} */}

                                  {infobarState[0] && <div className={s.infodata}> Günlük bir görev atansın ama o kapanamadan yeni güne başlanamasın. "Mesala o gün nerelere gittin" görevi... </div>}

                                  </div> : undefined}

                                  <FirebaseTokens firebase_tokens={isloggeddata?.user?.userinfo?.firebase_tokens}/>

                           </div>

                        {/* { JSON.stringify(editModalStateObj[0]) } */}
                        </LayoutTask>                        
                              {/* { (editModalStateObj[0]) && <div>asdasdsa</div>} */}
                              { (editModalStateObj[0]) ? <MyModal title="Görev Ekle" mode="add" editModalStateObj={editModalStateObj} {...common_modal_props}/> : undefined }
                        </div>
                  </LayoutMain>          
         );

}



const FirebaseTokens =(props)=> {

  let {firebase_tokens} = props ?? {}


  return (
          <div>
    
                  {firebase_tokens?.map((a, index)=> {

                          return <div className={s.tokenwr}>
                                          <div className={s.tokentitle}>{a?.label} [{index+1}]</div>
                                          <div className={s.token}>{a?.token}</div>
                                 </div>

                  })
                  
                  }
                  
                    <div className={s.tokennote}>Her token, bir cihaza (bilgisayar, telefon) tekabül eder. Görev eklendiğinde bu cihazlara bildirim gider.</div>
          </div>
          )
}



const TaskSystems_Listing = ({props}) => {
  
  let {locale, relatedcontents,queryClient, createdTasksStateObj, waitingPgasForRunStatesObj, mobicooaccount_edit_authority, insertingObj, selecteduser} = props;
  
  return (<div className={s.accountswr}>
                    
                    { relatedcontents?.map((mobicooaccount, index )=>{ 
                                                                              
                                  let id    = mobicooaccount?.id;
                                  let pgas  = mobicooaccount?.pgas;
                                  let users = mobicooaccount?.users;
                                  let datakey = mobicooaccount?.datakey;
                                  let pgas_last_ran = mobicooaccount?.pgas_last_ran;
                                  let active = mobicooaccount?.active;
                                  let title = mobicooaccount?.title;                            
                                  let mobicooaccountuser = mobicooaccount?.user;
                                  let {name}=mailName({mail:mobicooaccountuser})
                                  // let img = eval(`mobicooaccount.img_${locale}`) ?? eval(`mobicooaccount.img_${localeStatic}`); img = img ? `${imgs_source}/${img}` :  undefined; 
                                  let rank=mobicooaccount?.rank;
                                  let related_createdtasks = createdTasksStateObj[0]?.filter(a=>a?.task_system_datakey==datakey);
                                  // return JSON.stringify(pgas)
                                  return <Item props={{queryClient, task_system:mobicooaccount, createdTasksStateObj, selecteduser, pgas_last_ran,users,pgas,related_createdtasks, waitingPgasForRunStatesObj, title, rank, insertingObj, mobicooaccount_edit_authority, user:mobicooaccount?.user, name, id, active}} key={mobicooaccount?.slug_tr+index}/>

                          }) }
            </div>
          )   
  }



  
function Item({props}) {
    
  const {queryClient, createdTasksStateObj, task_system, related_createdtasks, selecteduser, pgas, waitingPgasForRunStatesObj, users,title, rank,  active, mobicooaccount_edit_authority, id, name,  insertingObj, pgas_last_ran } = props;    
  
  let {control, user, datakey} = task_system;
  
  let dateObj = datetimeFunc({datetime:pgas_last_ran });
  let dayAgo = dateObj?.diffDays

  useEffect(() => {    
                      if (dayAgo>0) { tabStatesFunc_WithKey({ key:datakey, set_tabstates:waitingPgasForRunStatesObj[1] }); } else { waitingPgasForRunStatesObj[1](old=>old?.filter(a=>a?.key!=datakey)); }             // bu durumda listeden çıkartalım...
  }, [dayAgo])
  
  const router = useRouter();
  
  return (
    
    <div style={{ borderTop:active==0 ? "3px dashed #0a0000" : "0px" , justifyContent:"flex-start" }} className={s.itemwr}>

      {/* {JSON.stringify(createdTasksStateObj)} */}
         
      <div style={{position:"absolute" , right:5, top:5, color:"#e7e7e7", fontWeight:"bold"}}>{rank}</div>
      
          {mobicooaccount_edit_authority && 
            <div  className={s.authwr}>   
                      <div  className={s.authinfo}>                                      
                            <div className={s.userinfo}> {name} </div>
                            <div> <a href={`/tasksystems/c/${datakey}`}><RiEdit2Fill/></a></div>                                                
                      </div>
            </div>      
          }
          {/* {JSON.stringify(selecteduser)} */}
      
          <div className={s.title}>
                                    
          {selecteduser== user? 
                                <Link href={`/tasksystems/c/${datakey}`}>{title}</Link>
                              :
                                title
          }
                                    
          </div>

                    {pgas?.length>0 ? <div className={s.aaa__} style={{display:"flex", flexDirection:"row", alignItems:"center", backgroundColor:"transparent"}}>
                          { (dayAgo>=1 || dayAgo==NaN)  ? <button type="button" onClick={()=>runpgasFunc({datakey, createdTasksStateObj, selecteduser, queryClient, insertingObj})} disabled={insertingObj[0]} style={{display:"flex", alignItems:"center", gap:4, padding:8, width:300}}> <RiRegisteredFill size={20} color="darkred"/> Günlük Periyodik Görev Atamaları Yap </button> :
                                    <div className={s.pga_ok}> <RiCheckboxFill size={16}/>  {dayAgo==0 ? `Bugün görev atamaları yapılmış` : `${dayAgo} gün önce görev atamaları yapılmış` } </div>                                          
                          }
                    </div>: <div className={s.aaa__} style={{display:"flex", flexDirection:"row", alignItems:"center", backgroundColor:"transparent", cursor:"pointer", height:36, fontSize:13}}><button type="button" onClick={()=>{_userState.task_system_datakey=datakey; router?.push("/pgas")}}  disabled={insertingObj[0]} style={{display:"flex", alignItems:"center", gap:4, padding:8, cursor:"pointer", width:300}}> <RiFocus3Fill  size={20} color="#0d82cb"/> Periyodik görev ekleyiniz </button> </div> }

                    <div className={s.userswr} title={JSON.stringify(users?.map(a=>a?.email))}> 
                        {users?.length>0 ? `${users?.length} kullanıcı` : `Kullanıcı tanımlanmamış` }
                    </div>

                    <div className={s.userswr}  style={{color:control ? "darkgreen" : "black", textDecoration:control ? "underline" : "none"}}>
                    { selecteduser!=user ? <RiShieldCheckFill  size={16} /> : <RiShieldCheckLine  size={16} />  }     {control ? "Kontrol sistemi devrede" : "Kontrol sistemi devredışı"}
                    </div>

                    <div className={s.userswr}  style={{color:selecteduser!=user ? "black" : "darkgreen", textDecoration:selecteduser!= user ? "none" : "underline"}}>
                    { selecteduser!=user ? <RiStarHalfFill  size={16} /> : <RiStarFill  size={16} />  }  { selecteduser!=user ? "Görev sistemine dahil edildiniz" : "Görev sisteminin sahibisiniz." }
                    </div>

                    <div style={{ display:"flex", gap:10}} title="Bildirimler">                                                      
                                                            <div>
                                                            <RiChromeFill 
                                                                        color={task_system?.bigdata?.settings?.send_browsernotification ? "darkgreen" : "gray"} 
                                                                        title={task_system?.bigdata?.settings?.send_browsernotification ? "Aktif" : "Pasif"}
                                                                        size={22}                                                                         
                                                                        />
                                                                        </div>

                                                            <div>
                                                            <RiNotification2Fill 
                                                                        color={task_system?.bigdata?.settings?.send_systemnotification ? "darkgreen" : "gray"} 
                                                                        title={task_system?.bigdata?.settings?.send_systemnotification ? "Aktif" : "Pasif"}
                                                                        size={22}                                                                         
                                                                        />
                                                                        </div>
                                                            <div>     
                                                            <RiMailFill 
                                                                        color={task_system?.bigdata?.settings?.send_mail ? "darkgreen" : "gray"} 
                                                                        title={task_system?.bigdata?.settings?.send_mail ? "Aktif" : "Pasif"}
                                                                        size={22}                                                                         
                                                                        />
                                                                        </div>
                                                            
                                                            {/* {task_system?.send_sms  ? "doğru" : "yanlış"} */}

                                                            <div>
                                                            <RiCellphoneFill 
                                                                        color={task_system?.bigdata?.settings?.send_sms ? "darkgreen" : "gray"} 
                                                                        title={task_system?.bigdata?.settings?.send_sms ? "Aktif" : "Pasif"}
                                                                        size={22}                                                                         
                                                                        />
                                                                        </div>

                                                </div>

                    { related_createdtasks?.length>0  ? <MyAccount_PGA_CreatedTasks createdtasks={related_createdtasks} /> : undefined }


                    

    </div>
            
  );
}



const MyModal = (props) => {

  let { insertFunc, emptytask,  mode, title, isModalOpen,selecteduser, editModalStateObj, closeFunc, index_pta,  insertingObj, categories, filtered_categoriesFunc, countriesIsLoading, countries, myaccount_task_link_func} = props ?? {};

  let stateObj    =  editModalStateObj?.[0] ;
  let taskdatakey =  stateObj?.[0]?.key ;  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { 
                    title:"Görev sistemi", 
                    user:selecteduser, 
                    active:1, control:0, 
                    check:0, 
                    users:[{ name:selecteduser, email:selecteduser, active:1 }],
                    bigdata:{
                              settings:{
                                          send_browsernotification:0,
                                          send_systemnotification:0,
                                          send_sms:0,
                                          send_mail:0,
                                       }
                            }
                  
                  },
    onSubmit: (values, {setSubmitting}) => { 
                                                // fetcher({values}).then(()=>{ queryClient.invalidateQueries(); 
                                                // setSubmitting(false)});                                                
                                            },
                          });   

return (<Modal
                    open={editModalStateObj[0]}
                    onClose={()=>editModalStateObj[1](0)}
                    center
                    aria-labelledby="my-modal-title"
                    aria-describedby="my-modal-description"
                    classNames={{ overlay: "rrm_customOverlay", modal: "rrm_customModal2", }}
              >
                              <TaskSystem props={{formik, insertFunc, mode}}/>
              </Modal>)

}

 {/* <MyAccount_Task {...props} taskdatakey={taskdatakey}/> */}