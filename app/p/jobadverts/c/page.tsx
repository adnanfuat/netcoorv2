import JobAdvert from "@/components/job/jobadvert";

import { LayoutMain } from "@/app/layoutmain";

import s from "./page.module.css";

import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import JobAdvert_Core_Next15 from "@/modules/jobadverts_core_next15/jobadvert_core_next15";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function Home() {
  
      
  let userdata = await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician    =   userscopes?.isTechnician;
  let manegerAuth     =   userscopes?.isManager;
  let patreonAuth     =   userscopes?.isPatreon;
  let technicianAuth  =   userdata?.userscopes.isManager;        
  // console.log("data::::assasa",  noncontrolleds_count)
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});
    

  return ( <JobAdvert_Core_Next15 
                                    userdata={userdata}
                                    mypackageslink={"/p/packages?c1=0&c2=0"}  // c1="Satın Aldıklarım" / c1="Tüm Paketler"
                                    allpackageslink={"/p/packages?c1=1&c2=0"} // c1="Satın Aldıklarım" / c1="Tüm Paketler"
                                    listingPageUrl="/p/jobadverts"
                                    dataPageUrl="/p/jobadverts/c"
                                    /> )
}


