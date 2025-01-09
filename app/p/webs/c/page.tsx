import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import 'react-tabs/style/react-tabs.css';
import WebContent_Next15 from "./webcontent";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; 

export default async function Web() {
        
  let userdata = await isloggedv4_clerk();
  let { userscopes } = userdata ?? {};

  let email = userdata?.email;  
  let isTechnician    =   userscopes?.isTechnician;
  let manegerAuth     =   userscopes?.isManager;
  let patreonAuth     =   userscopes?.isPatreon;
  let technicianAuth  =   userdata?.userscopes.isManager;        

  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});  
  let locale = "tr";
  
  return <WebContent_Next15 userdata={userdata}/>
  //  return ( <div>----</div> )
}


