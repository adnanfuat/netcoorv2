// import dynamic from "next/dynamic";
import { useSnapshot } from "valtio";
 import {Index_Cuffs_V2_Visitor_Demo} from "./index_cuffs_v2_visitor_demo";
// import {interactionProxy} from "@/modules/constants/interaction"


// const Dynamic_Index_Cuffs_V2_Visitor_Real = dynamic(() => import("./cuffs_real").then(res=>res.Index_Cuffs_V2_Visitor_Real), { loading: () => <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", minHeight:"260px"}}>Kısa bekletiyoruz</div>, });


export const  Index_Cuffs_V2_Visitor = ({props}) => {

      // let interactionValtio = useSnapshot(interactionProxy);            
                  
      //   return JSON.stringify(props?.cuffs)
      // return (interactionValtio?.interaction ) ?<Dynamic_Index_Cuffs_V2_Visitor_Real props={props}/> : <Index_Cuffs_V2_Visitor_Demo props={props}/>  
      
      return <Index_Cuffs_V2_Visitor_Demo props={props}/>  
     
         
     }