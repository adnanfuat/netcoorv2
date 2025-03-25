
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
 import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import UserSelection from "@/components/myaccount/userselection"
import Memberships_Next15 from "@/modules/memberships_next15";

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
  
  // return (JSON.stringify("Proje seçimi +++ Sektörler Sayfası+ Alt sektörler sayfası aynı yere gitsin.... "));

  return (
      <div className={s.shell}>                 
                <Memberships_Next15 
                        userdata={userdata} 
                        selecteduser={undefined} 
                        project={"sakaryarehberim.com"} 
                        membershipEditUrl="qqqqaaaaaaaaaaaaaaaaaaa" // Zaten bu proje üzerindeyiz ya, o nedenle boş bıraktım.                                                
                        />
        </div>
  );
}



// membershipEditUrl=router.push(`${membershipEditUrl}${membershipsPath}/c?id=${newcompany?.id}`);

