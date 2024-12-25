"use client"
import { SiAkasaair } from "react-icons/si";
import s from "./home_tasks.module.css"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Home_Tasks(props) {

    let {userdata} = props;

    

  let {userscopes, email } = userdata ?? {};    
  let isTechnician  = userscopes?.isTechnician;
  let manegerAuth  =  userscopes?.isManager;
  let patreonAuth  =  userscopes?.isPatreon;
  let technicianAuth  =  userdata?.userscopes.isManager;



  const task_system_StateObj = useState();
  const task_system_user_StateObj = useState(email);
  const task_system_allsystems_StateObj = useState();

  const task_systemsFunc = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"task_systems_forusers", selecteduser:email, scope:task_system_allsystems_StateObj[0],} }) } ); res =  await res?.json();  return res; };
  let { data:task_systems, isLoading } = useQuery({queryKey:["task_systems_forusers", email, task_system_allsystems_StateObj[0]  ], queryFn: async () => await task_systemsFunc() }); //, {keepPreviousData:true}


  let task_system = task_systems?.find(a=>a?.datakey==task_system_StateObj[0])
  let task_system_users = task_system?.users ?? [];  


  if ( !!email && task_system?.user!=email && !manegerAuth) // O sistemin sahibi değilse ve yönetici yetkisi yoksa
  {
        task_system_users = task_system_users?.filter(a=>a?.email==email); // sadece kendisini görmeye zorlayalım
  }

const task_reportsFunc = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"task_reports", selecteduser:task_system_user_StateObj[0], task_system_datakey:task_system_StateObj[0] } }) } ); res =  await res?.json(); return res; };
let { data:task_reports, isLoading:task_reportsIsLoading } = useQuery( {queryKey:["task_reports", task_system_user_StateObj[0], task_system_StateObj[0]], queryFn:async () => await task_reportsFunc()}); //, {enabled:!!technicianAuth, keepPreviousData:true}

let {those_waiting_for_your_control=0, the_tasks_you_neglected=0, your_interrupted_assignments=0, those_under_control_but_not_closed=0  } = task_reports ?? {}


if (task_systems?.length==0 ) return (<div>...</div>)

return <div className={s.tasks_mainwr}>
    
    <div className={s.tasks_maintitle}>Görev Raporları</div>  

    <div className={s.task_systems_mainwr}>         

                                                    {manegerAuth ?<select value={task_system_allsystems_StateObj[0]} onChange={(e)=>{ task_system_allsystems_StateObj[1](e?.target?.value); }}  className={s.select} disabled={false} style={{fontSize:14, padding:"5px 8px", backgroundColor:"#dedede", width:200}}>
                                                                                                                                                                                                                                        
                                                                                                          <option value={0}> Bağlı olduğum sistemler </option>
                                                                                                          <option value={1}> Tüm sistemler </option>
                                                    </select> : undefined}


                                                    <select value={task_system_StateObj[0]} onChange={(e)=>{                                                                               
                                                                      task_system_StateObj[1](old=>e?.target?.value);                                                                                    
                                                                }}  className={s.select} disabled={false} style={{fontSize:14, padding:"5px 8px", backgroundColor:"#dedede", width:200}}>
                                                                                                                      {/* Görev sistemi atanmamışsa ya da görev sistemleri arasında bu datakeye ait bir görev sistemi yoksa (Belki sonradan görev sistemi silinmiş olabilir) */}
                                                                                                                      {/* { !pta?.task_system_datakey || !task_systems?.find(a=>a?.datakey==pta?.task_system_datakey)   ? <option value=""> Görev Sistemi Seçiniz </option> : undefined } */}                                                                                                                                          
                                                                                                                      <option value=""> Görev Sistemi Seçiniz </option>
                                                                                                                      {task_systems?.map((task_system, i)=>{

                                                                                                                                                    return <option value={task_system?.datakey} key={i}>  {task_system?.title}  </option>
                                                                                                                      })}

                                                    </select>

                                                    {task_system_users?.length>0 ? <select value={task_system_user_StateObj[0]} onChange={(e)=>{ task_system_user_StateObj[1](e?.target?.value); }}  className={s.select} disabled={false} style={{fontSize:14, padding:"5px 8px", backgroundColor:"#dedede", width:200}}>
                                                                                                                                                                                                                                        
                                                                                                          <option value=""> Kullanıcı Seçiniz </option>

                                                                                                          {task_system_users?.map((user, i)=>{

                                                                                                                                        return <option value={user?.email}  key={i}>  { user?.email }  </option>

                                                                                                          })}

                                                    </select> : undefined}

                                                    
                                                    {task_system_StateObj[0] ? <Link href={`/tasksystems/c/${task_system_StateObj[0]}`}><RiExternalLinkFill size={20} color={"gray"} style={{cursor:"pointer"}} title="Görev sistemine git"/></Link> : undefined}
                
    </div>
    
          <div className={s.tasks_reportswr}>
                            <div className={s.tasks_reports_itemwr}>
                                  <div className={s.tasks_reportsitem_title}> Kontrolünüzü bekleyenler       </div>
                                  <div className={s.tasks_reportsitem_data}>  {those_waiting_for_your_control} </div>
                            </div>

                            <div className={s.tasks_reports_itemwr} title="Kontrolörü sizin olduğunuz görevlerdir. Fakat süresi geçmesine rağmen kapatılmaya gönderilmemişlerdir.">
                                  <div className={s.tasks_reportsitem_title}> Kontrolünüze gönderilmeyenler       </div>
                                  <div className={s.tasks_reportsitem_data}>  {those_under_control_but_not_closed} </div>
                            </div>

                            <div className={s.tasks_reports_itemwr}>
                                  <div className={s.tasks_reportsitem_title}> Aksattığınız görevler     </div>
                                  <div className={s.tasks_reportsitem_data}>  {the_tasks_you_neglected} </div>
                            </div>

                            <div className={s.tasks_reports_itemwr} title="Birilerine görev verdiniz. Fakat verdiğiniz görevlerin süresi geçmiş.">
                                  <div className={s.tasks_reportsitem_title}> Aksatılan görevlendirmeleriniz       </div>
                                  <div className={s.tasks_reportsitem_data}>  {your_interrupted_assignments}       </div>
                            </div>
          </div>
                                   
</div>

}

