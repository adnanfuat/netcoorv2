
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";

import { Inter } from "next/font/google";
import { MyAccount_Contract } from "@/modules/contracts/myaccount_contract";
import Contract_Next15 from "@/modules/contract_next15";


const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function ContractPage() {  
      
  let userdata = await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician    =   userscopes?.isTechnician;
  let manegerAuth     =   userscopes?.isManager;
  let patreonAuth     =   userscopes?.isPatreon;
  let technicianAuth  =   userdata?.userscopes.isManager;        
  // console.log("data::::assasa",  noncontrolleds_count)
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});

  if (!technicianAuth) // Sistemi başkasına açtığımızda burayı düşünürüz.
  {
    return undefined
  }
    

  return (
          <Contract_Next15 userdata={userdata} />          
        )
}


