
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
 import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import TaskSystemsCore from "@/modules/task/tasksystemscore";
import { Inter } from "next/font/google";
import UserSelection from "@/components/myaccount/userselection"


const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function TaskSystemsPage(context) {
  
  let params = await context?.params;      
  let userdata =  await isloggedv4_clerk();  

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician       =   userscopes?.isTechnician;
  let manegerAuth        =   userscopes?.isManager;
  let patreonAuth        =   userscopes?.isPatreon;
  let technicianAuth     =   userdata?.userscopes.isManager;  


  
      
  return (
            <div className={s.shell}> 
            {/* {JSON.stringify(userdata)}                                                   */}
            { isTechnician ? <UserSelection userdata={userdata}/> : 
            <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
            {userdata?.email}
            </div> }                  
                  <TaskSystemsCore userdata={userdata}/>
            </div>
        );
}



