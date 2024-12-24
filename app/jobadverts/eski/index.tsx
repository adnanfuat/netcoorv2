import Head from 'next/head';
import s from "./index.module.css"
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import {_userState} from "@/modules/constants/user"
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import {useSnapshot} from "valtio";
import { useSearchParams } from 'next/navigation';
import { isLoggedV2 } from '@/modules/functions/isloggedv2';
import JobAdverts_Core from '@/modules/jobadverts_core';

const  JobAdverts = (props) => {

  let {              
                    origin, // Eğer iş ilanı içinden çağrılıyorsa ve içinde bulunduğumuz ilanda iken ona tıklatmamamız lazım...
                    originTabStates, // Eğer iş ilanı içindeysek tıklandığında ilgili ilana gidebilmemiz lazım...
      } = props ?? {}

  //// son haberleri çek ----->
  let isloggeddata  =   isLoggedV2();
  let userscopes    =   isloggeddata?.userscopes;

  let   selecteduser = useSnapshot(_userState).myAccountUser.email;  
  const subTabStateObj_1 = useState(0);

  const searchParams = useSearchParams()
  const tab = searchParams.get('tab');

  useEffect(() => { if (tab=="followedjobseekers") { subTabStateObj_1[1](1);} }, [tab])  
  let { name, permissions, user } = isLoggedV2();

      useEffect(() => {
                              let initializeuser=undefined;
                              // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                              if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                              _userState.myAccountUser.email=initializeuser
                }, [user?.email])


      let  isTechnician  =   userscopes?.isTechnician;
      let  manegerAuth   =   userscopes?.isManager;
      let  patreonAuth   =   userscopes?.isPatreon;

      return (<LayoutMain layout_title={"İş İlanları"} >
        
                                      <div className={s.shell}> 
                                                {/* {JSON.stringify(users)} */}
                                                <Head><title>İş İlanları</title></Head>                                               
                                                
                                                { isTechnician ? <UserSelection/> : 
                                                  <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
                                                  {user?.email}
                                                  </div> }
                                                {/* {selecteduser} */}                                                
                                                <JobAdverts_Core selecteduser={selecteduser} subTabStateObj_1={subTabStateObj_1}  origin={origin} originTabStates={originTabStates}/>
                                      </div>
             </LayoutMain>
             );
}

export default JobAdverts


