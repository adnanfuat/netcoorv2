
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import UserSelection from "@/components/myaccount/userselection"
import CategoricalAds from "@/modules/categoricalads";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function CategoricalAdsPage(context) {
  
  let params = await context?.params;      
  let userdata =  await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician       =   userscopes?.isTechnician;
  let manegerAuth        =   userscopes?.isManager;
  let patreonAuth        =   userscopes?.isPatreon;
  let technicianAuth     =   userdata?.userscopes.isManager;          
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});
    
  return (
      <div className={s.shell}> 
        {/*  {JSON.stringify(userdata)}  */}
        { isTechnician ? <UserSelection userdata={userdata}/> : 
        <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
        {userdata?.email}
        </div> }                  
                    <CategoricalAds userdata={userdata} selecteduser={undefined}/>
        </div>
  );
}


