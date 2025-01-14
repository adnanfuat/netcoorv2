
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";

import { Inter } from "next/font/google";
import UserSelection from "@/components/myaccount/userselection"
import UserSelection_Minimal from "@/components/myaccount/userselection_minimal"



import JobAdverts_Core_Next15 from "@/modules/jobadverts_core_next15";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function Home(context) {
  
  let params = await context?.params;      
  let userdata = await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician    =   userscopes?.isTechnician;
  let manegerAuth     =   userscopes?.isManager;
  let patreonAuth     =   userscopes?.isPatreon;
  let technicianAuth  =   userdata?.userscopes.isManager;        
  // console.log("data::::assasa",  noncontrolleds_count)
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});
    
  return (
      <div className={s.shell}> 
        {/* {JSON.stringify(users)} */}                                                  
                            { isTechnician ? <UserSelection userdata={userdata}/> : <UserSelection_Minimal userdata={userdata}/> }
                            {/* {selecteduser} */}                                                
                            <JobAdverts_Core_Next15 selecteduser={undefined} subTabStateObj_1={undefined}  origin={"?????"} originTabStates={undefined} userdata={userdata} />
            </div>
  );
}


