
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import Company_Admin_Edit from "@/modules/company_admin_edit";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function MembershipPage(props) {
        
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
  // return (JSON.stringify(userdata?.permissions));

  return ( <Company_Admin_Edit 
                              userdata={userdata}
                              cclassesPanel={true}
                              labelsPanel={true}
                              galleryPanel={true}
                              realestatesPanel={true}
                              jobadvertsPanel={true}
                              contractsPanel={true}
                              viewCompanyInConsole={true}
                              listingPath={`/p/memberships`}
                              viewCompanyPrefix={`/p/directory/c`}
                            
                            /> )
  
}


