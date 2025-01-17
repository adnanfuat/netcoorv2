import Head from 'next/head';
import 'react-tabs/style/react-tabs.css';
import s from "./index.module.css";
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user";
import UserSelection from '../myaccount/userselection';
import { useEffect, useState } from "react";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import Adverts from '@/components/console/rs/[[...slug]]';

const Packages = () =>{

  const childTabStateObj_1 = useState(0);  

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

      const searchParams = useSearchParams()
      const tab = searchParams.get('tab');

      useEffect(() => {
                    if (tab=="packages") { childTabStateObj_1[1](1);} 
                }, [tab])
      
      let fetchUser= async (user) => { let res= await fetch(`/api/user?a=${user}`); let datajson = await res?.json(); return datajson; }      
      const { data:selecteduserdata, error:selectedusererror } = useQuery(['userquery', user], async () => await fetchUser(selecteduser) , {enabled:!!selecteduser} )

      let defaultusername= selecteduserdata?.bigdata?.live?.name? (selecteduserdata?.bigdata?.live?.name +" "+ selecteduserdata?.bigdata?.live?.surname ?? "" ?? "")  : undefined
      let defaultuserphone=selecteduserdata?.bigdata?.live?.phones?.[0]?.phone ?? ""
      // console.log("AAAAA::___", user);
      
      return (<LayoutMain layout_title={"Ödeme"}> 
                          <div className={s.shell}> 
                                  {/* {JSON.stringify(useSnapshot(_userState).myAccountUser)}                                                                                       */}
                                  <Head><title>ÖDEME</title> </Head>                                       
                                  { isTechnician ? <UserSelection/> : <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}> {user?.email} </div> }                                                                                                                                  
                                  <Adverts 
                                                                                        root_parents={[{slug_tr:"paketler", title_tr:"Paketler", key:"1695110010332"}]}  // root_parents={[{slug_tr:"ilanlar", title_tr:"İlanlar", key:"1668310717"}, {slug_tr:"emlak", title_tr:"Emlak", key:"1668310884"}]} 
                                                                                        bigbigparent_key="1695110010332" 
                                                                                        bigbigparent_slug="paketler" 
                                                                                        // urlprefix={`packages`} 
                                                                                        urlprefix={`/packages`}    
                                                                                        urlprefix_editpage={`package`} 
                                                                                        urlprefix_viewpage={`p`} 
                                                                                        selecteduser={selecteduser}
                                                                            />
                          </div>
             </LayoutMain>
             );
}
export default Packages;





