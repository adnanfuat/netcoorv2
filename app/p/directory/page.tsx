
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
 import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import {redirect_postfix } from "@/modules/constants/redirect_postfix";

import Link from "next/link";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa";
import Sectors from "./sectors";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function DirectoryPage(context) {
  
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
  //  return (JSON.stringify(sectors));

  return ( <Sectors userdata={userdata} />);
}





const SwissArmyKnifeQuery = 
`  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {
      tunnel
    }
  }`
;


