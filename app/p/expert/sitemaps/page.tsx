import 'react-tabs/style/react-tabs.css';
 import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
// import ExpertCore from '@/modules/expert_core/page';
import Sitemaps from '.';

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function SitemapsPage(context) {
  
  let params = await context?.params;      
  let userdata =  await isloggedv4_clerk();  
  let {userscopes } = userdata ?? {};

  let email = userdata?.email;  
  let isTechnician       =   userscopes?.isTechnician;
  let manegerAuth        =   userscopes?.isManager;
  let patreonAuth        =   userscopes?.isPatreon;
  let technicianAuth     =   userdata?.userscopes.isManager;        
  // console.log("data::::assasa",  noncontrolleds_count)
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});
        
  return (
            <Sitemaps userdata={userdata}/>
         );
}



