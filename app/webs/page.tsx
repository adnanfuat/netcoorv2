
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";

import { Inter } from "next/font/google";
import UserSelection from "@/components/myaccount/userselection"

import JobAdverts_Core_Next15 from "@/modules/jobadverts_core_next15";
import {Webs} from "@/modules/webs_core_next15/webs";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function WebsPage(context) {
  
  let params = await context?.params;      
  let userdata = await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician     =   userscopes?.isTechnician;
  let manegerAuth      =   userscopes?.isManager;
  let patreonAuth      =   userscopes?.isPatreon;
  let technicianAuth   =   userdata?.userscopes.isManager;        
  // console.log("data::::assasa",  noncontrolleds_count)
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});
    
  return (
      <div className={s.shell}> 
        {/* {JSON.stringify(users)} */}                                                  
        { isTechnician ? <UserSelection userdata={userdata}/> : 
        <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
        {userdata?.email}
        </div> }
      {/* {selecteduser} */}                                                                      
                      <Webs selecteduser={undefined} childTabStateObj_1={undefined}/>
            </div>
  );
}

