import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";

import { Inter } from "next/font/google";

import Contents_Core from "@/modules/contents_core";
import Cuffs_Core from "@/modules/cuffs_core";
import UserSelection from "@/components/myaccount/userselection"
import MyAccount_Shell from "@/modules/myaccount/myaccount_shell"


const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function MyAccount() {
  
  
  let userdata = await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;

  let isTechnician    =   userscopes?.isTechnician;
  let manegerAuth     =   userscopes?.isManager;
  let patreonAuth     =   userscopes?.isPatreon;
  let technicianAuth  =   userdata?.userscopes.isManager;      
  

  return ( 
            <div className={s.shell}>             

                { isTechnician ? <UserSelection userdata={userdata}/> : 
                <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
                {userdata?.email}
                </div> }

                <MyAccount_Shell userdata={userdata}/>
            </div>
          );
}


