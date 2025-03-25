
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import Company_Admin from "@/modules/company_admin_edit";
import { Company_Admin_View } from "@/modules/company_admin_view";
import getserversidepropsfunction from "@/modules/company_visitor/getserversidepropsfunction";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function CompanyPage(props) {
        
  let userdata = await isloggedv4_clerk();
  // let userdata = props?.params?.userdata;
  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician      =   userscopes?.isTechnician;
  let manegerAuth       =   userscopes?.isManager;
  let patreonAuth       =   userscopes?.isPatreon;
  let technicianAuth    =   userdata?.userscopes.isManager;        
  
  // console.log("data::::assasa",  noncontrolleds_count);  
  let cache = permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});    

  let {params} = props ?? {};
  params = await params;  
  let data = await getserversidepropsfunction({params, project:process.env.NEXT_PUBLIC_PROJECT}) ?? {};   // { generatedData, locale } 
  
  // return (JSON.stringify(userdata?.permissions));

  return ( <Company_Admin_View 
                                userdata={userdata}                            
                                datakeyForMessage = "srcompany-message"  // Mesaşlaşma için bigparent_key
                                datakeyForComment = "srcompany-comment"  // Yorum için bigparent_key                                                                    
                                showrealestatespanel = {true} // Emlak paneli gösterilsin mi?
                                showjobadvertspanel = {true} // Emlak paneli gösterilsin mi?
                                shownewspanel = {true} // Emlak paneli gösterilsin mi?                            
                            />
        )
  
}


