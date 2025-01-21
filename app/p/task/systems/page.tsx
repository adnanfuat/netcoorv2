
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
 import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import TaskSystemsCore from "@/modules/task/tasksystemscore";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function TaskSystemsPage(context) {
  
  let params = await context?.params;      
  let userdata =  await isloggedv4_clerk();  
      
  return (
            <TaskSystemsCore userdata={userdata}/>
         );
}


