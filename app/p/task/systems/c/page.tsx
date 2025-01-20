
import {_userState} from "@/modules/constants/user"
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import TaskSystemEdit from "@/modules/task/tasksystem";



export default async function TaskSystemPage(context) {
  
  let params = await context?.params;      
  let userdata =  await isloggedv4_clerk();  
      
  return (
              <TaskSystemEdit userdata={userdata}/>
         );
}


