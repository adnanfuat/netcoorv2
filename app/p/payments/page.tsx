
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import UserSelection from "@/components/myaccount/userselection"
import Payment_Core_Next15 from "@/modules/payment_core_next15";
import PaymentsCore from "./payments_core";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function PaymentsPage(context) {
  
  let params = await context?.params;
  let userdata =  await isloggedv4_clerk();

  let { userscopes } = userdata ?? {};  
  let isTechnician = userscopes?.isTechnician;
      
  return ( <PaymentsCore userdata={userdata}/> );
  
}


