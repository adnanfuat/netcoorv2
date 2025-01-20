
import { QueryClient } from "react-query";
import {_userState} from "@/modules/constants/user"
import 'react-tabs/style/react-tabs.css';
import {useQuery, useQueryClient } from "react-query";
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import s from "./core.module.css"
import {isLogged} from "@/components/hooksnew/islogged";
import { LayoutMain } from '@/layouts/console/layoutmain';
import LayoutTask from "@/layouts/task/layouttask";
import UserSelection from "@/pages/myaccount/userselection";
import {TaskSystem} from "@/components/commonnew/task/tasksystem";


const  TaskSystemPage = (props) =>{
  
  const router = useRouter();    
  const {locale, defaultLocale, query}= router;

  let isloggeddata = isLogged();

  let userscopes     =  isloggeddata?.userscopes; 
  let isTechnician   =  userscopes?.isTechnician;
  let manegerAuth    =  userscopes?.isManager;  
  let patreonAuth    =  userscopes?.isPatreon;
  
  let datakey = query?.datakey?.[0];
  // console.log('tamerrrr', query?.id?.[0],mobicooaccountclientparsed)

  const queryClient = new QueryClient();
  const taskSystemFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"task_system", datakey} }) } ); res =  await res?.json(); return res; };
  let { data:tasksystem, isLoading:task_systemsIsLoading } = useQuery( ["task_system", datakey ], async () => await taskSystemFunc(), {});
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: tasksystem,
                          onSubmit: tasksystem => { 
                                                    // updateFunc(tasksystem)//.then(()=>{ }) ; 
                                                 },
                          });   


                          tasksystem=formik?.values;

      return ( <LayoutMain layout_title="Görev Sistemi Düzenle" suptitle={undefined}>
                        {tasksystem ? <div className={s.shell}>
                          {/* {JSON.stringify(tasksystem)} */}
                          {isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {isloggeddata?.user?.email} </div> }                                                                                              
                          
                                    <LayoutTask initialtaindex={5} waitingPgasLength={undefined} iscontent={true}>
                                        <div className={s.maintab}>                                                                
                                                { task_systemsIsLoading ? "Yükleniyor" : <TaskSystem props={{formik, locale, mode:"edit"}}/>  }
                                        </div>
                                    </LayoutTask>
                            
                          </div>: <div></div>}
                  </LayoutMain>);
}








export default TaskSystemPage





