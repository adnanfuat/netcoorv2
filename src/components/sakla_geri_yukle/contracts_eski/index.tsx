import Head from 'next/head';
import s from "./index.module.css"
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user"
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import { MyAccount_Contracts } from "@/modules/contracts/myaccount_contracts";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import { MyAccount_Contracts_ContractOwnerSelection } from "@/components/commonnew/myaccount/myaccount_contracts_contractownerselection";

const  Contracts = () =>{

  //// son haberleri çek----->
  let isloggeddata  =  isLogged();            
  let userscopes  =  isloggeddata?.userscopes;  

  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let contractowneremailStateObj = useState(selecteduser);

  let _userStateData = useSnapshot(_userState);

  useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser]);

  let {name, permissions, user} = isLogged();     


      useEffect(() => {
                              let initializeuser=undefined;
                              // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                              if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                              _userState.myAccountUser.email=initializeuser
                }, [user?.email])


      let isTechnician  = userscopes?.isTechnician;
      let manegerAuth  =  userscopes?.isManager;
      let patreonAuth  =  userscopes?.isPatreon;

      return (<LayoutMain layout_title={"Sözleşmeler"} >
                                      <div className={s.shell}> 
                                                {/* {JSON.stringify(users)} */}
                                                <Head><title>Sözleşmeler</title></Head>                                               
                                                
                                                {isTechnician ? <UserSelection/> : 
                                                <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
                                                {user?.email}
                                                </div>
                                 }
                                                
                                                {/* {selecteduser} */}                                            
                                                {/* contractowneremailStateObj[0]!=selecteduser ? selecteduser : undefined */}
                                                { (selecteduser!="all" &&  userscopes?.isTechnician) ? <MyAccount_Contracts_ContractOwnerSelection selecteduser={selecteduser}/> : undefined }
                                                { selecteduser!="all"  &&  userscopes?.isTechnician  && <MyAccount_Contracts selecteduser={_userStateData?.contractowneremail} targetuser={_userStateData?.contractowneremail!=selecteduser ? selecteduser : undefined}/> }
                                        </div>
             </LayoutMain>
             );
}

export default Contracts


