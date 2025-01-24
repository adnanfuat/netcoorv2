import 'react-tabs/style/react-tabs.css';
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import CategoriesCore from '@/modules/categoriescore/page';


export default async function CategoriesPage(context) {
  
  let params = await context?.params;      
  let userdata =  await isloggedv4_clerk();
  
  let {userscopes } = userdata ?? {};

  let email = userdata?.email;  
  let isTechnician       =   userscopes?.isTechnician;
  let manegerAuth        =   userscopes?.isManager;
  let patreonAuth        =   userscopes?.isPatreon;
  let technicianAuth     =   userdata?.userscopes.isManager;        
  // console.log("data::::assasa",  noncontrolleds_count)
  
        
  return (<CategoriesCore userdata={userdata}/>);
}



