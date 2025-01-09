import Head from 'next/head';
import 'react-tabs/style/react-tabs.css';
import s from "./index.module.css";
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user";
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import { useQuery, useQueryClient } from 'react-query';
import Payment_Core from '@/modules/payment_core';
import { useSearchParams } from 'next/navigation';

const Payment = () =>{

  const childTabStateObj_1 = useState(0);  

  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let contractowneremailStateObj = useState(selecteduser);

  

  const queryClient = useQueryClient();
  
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

      const searchParams = useSearchParams()
      const tab = searchParams.get('tab');

      useEffect(() => {
                    if (tab=="packages") { childTabStateObj_1[1](1);} 
                }, [tab])
      
      let fetchUser= async (user) => { let res= await fetch(`/api/user?a=${user}`); let datajson = await res?.json(); return datajson; }      
      const {   data:selecteduserdata, error:selectedusererror } = useQuery(['userquery', user], async () => await fetchUser(selecteduser) , {enabled:!!selecteduser} )

      let defaultusername= selecteduserdata?.bigdata?.live?.name? (selecteduserdata?.bigdata?.live?.name +" "+ selecteduserdata?.bigdata?.live?.surname ?? "" ?? "")  : undefined
      let defaultuserphone=selecteduserdata?.bigdata?.live?.phones?.[0]?.phone ?? ""

      // console.log("AAAAA::___", user);
      
      return (<LayoutMain layout_title={"Ödeme"}> 
                          <div className={s.shell}> 
                                      {/* {JSON.stringify(useSnapshot(_userState).myAccountUser)}                                                                                       */}
                                      <Head><title>ÖDEME</title> </Head>                                       
                                      { isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {user?.email} </div> }                                                                                                                                  
                                      { selecteduser!="all" && <Payment_Core selecteduser={selecteduser} childTabStateObj_1={childTabStateObj_1} tabCount={4} domain="netcoor.com" project_type="independent" module_type={"free"} defaultusername={defaultusername} defaultdetail={undefined} defaultamount={undefined} defaultphone={defaultuserphone}/>}
                          </div>
             </LayoutMain>
             );
}
export default Payment;



// type PaymentSystemParametersType = { system:string, connectionparameters:ParamPosConnectionVars, environment:"development" | "production", version:string | undefined, }

// type ParamPosConnectionVars = { PP_API_URL:string, PP_CLIENT_CODE:string, PP_CLIENT_USERNAME:string, PP_CLIENT_PASSWORD:string, PP_GUID:string }

// let paymentSystemCreateConnection = async (props:PaymentSystemParametersType) => { let { environment="development", system="parampos", version=undefined, connectionparameters } = props ?? {}; }

// paymentSystemCreateConnection({environment:"development", connectionparameters:undefined, system:"aaa", version:"aaaa"})


