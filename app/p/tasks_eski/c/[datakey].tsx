import Head from 'next/head';
import { useRouter } from "next/router";  
import s from "./index.module.css"
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user"

import { useEffect, useState } from "react";

import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";

import { useQuery } from 'react-query';
import { MyAccount_Pga } from '@/components/commonnew/myaccount/myaccount_pga';
import { MyAccount_Task } from '@/components/commonnew/myaccount/myaccount_task';
import LayoutTask from '@/layouts/task/layouttask';


const  PTA = (props) =>{

  //// son haberleri çek----->
  let router = useRouter();

  let {query:{datakey}} = router;

  

  let isloggeddata  =   isLogged();
  let userscopes    =   isloggeddata?.userscopes;

  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let tasksowneremailStateObj = useState(selecteduser);


  const task_systemsFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"task_systems_forusers", selecteduser } }) } ); res =  await res?.json();  return res; };
  let { data:task_systems, isLoading } = useQuery( ["task_systems_forusers", selecteduser ], async () => await task_systemsFunc());

  let _userStateData = useSnapshot(_userState);
  
  // const fetcher_myaccountptacategories = async () => { let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_task_categories", email:selecteduser } }) } ); res =  await res?.json(); return res; };
  // let  { data:categories } = useQuery( ["myaccount_pgacategories", selecteduser ], () => fetcher_myaccountptacategories() , { enabled:!!selecteduser, } );  // refetchOnWindowFocus:false, refetchOnReconnect: false, retry: false, staleTime: 6000,
  // let  filtered_categories = _userStateData?.myaccount_pgas_filtered_categories;
    
  // Filitre selecti değişince çalışan fonksiyon  
  const filtered_categoriesFunc = ({value}) =>  { _userState.myaccount_pgas_filtered_categories  = value; }
  
  const countriesv2_alldataFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"countriesv2_alldata", givedistricts:true } }) } ); res =  await res?.json(); return res; };
  let { data:countries, isLoading:countriesIsLoading } = useQuery( ["countriesv2_alldata", ], async () => await countriesv2_alldataFunc(), {keepPreviousData:true , refetchOnWindowFocus:false});

  const insertingObj = useState(false);

  let closeFunc = () => router.back() 
  
  let common_modal_props={closeFunc, filtered_categoriesFunc, insertingObj, countries, countriesIsLoading, task_systems, selecteduser} // Ekleme ve Düzenle Modallarına Gönderilen Ortak Propslar..

  useEffect(() => { tasksowneremailStateObj[1](selecteduser); }, [selecteduser]);

  let {name, permissions, user} = isLogged();     

  let isTechnician  = userscopes?.isTechnician;
  let manegerAuth  =  userscopes?.isManager;
  let patreonAuth  =  userscopes?.isPatreon;

      useEffect(() => {
                              let initializeuser=undefined;
                              // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                              if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                              _userState.myAccountUser.email=initializeuser
                }, [user?.email])

                
                

      return <LayoutMain layout_title={"Görev DÜZENLEME"} >
                                       <div className={s.shell}> 
                                                {/* {JSON.stringify(task_systems)} */}
                                                <Head><title>Görev DÜZENLEME</title></Head>                                               
                                                
                                                <LayoutTask initialtaindex={5} iscontent={true}>
                                                          <div className={s.maintab}>                                                                
                                                          { selecteduser!="all" ?  <MyAccount_Task mode="edit" {...common_modal_props} taskdatakey={datakey}/> : <div></div> }
                                                          </div>
                                                </LayoutTask>

                                        </div>
             </LayoutMain>
}

export default PTA


