 import {LayoutMain} from "@/components/layouts/console/layoutmain"; 
import { IoRocketSharp } from "react-icons/io5";
import {  RiAddCircleFill, RiListCheck } from "react-icons/ri";
import { useRouter } from 'next/router';

import permissionsControlV3 from '@/modules/functions/permissionscontrolv3';
import s from "./layoutcontents.module.css"
import React, { useState } from "react";


import Link from "next/link";
import perfectmutation from "@/modules/functions/perfectmutation";


// Haberlerle ilgili layout
export const LayoutContents = (props) => {

    let { children, projectStateObj} = props ?? {}

    return (<LayoutMain layout_title={"Haberler"}>
                        <div className={s.shell}>                                     
                                    <div className={s.header}><Shortcuts projectStateObj={projectStateObj}/></div>                                                                                                              
                                    { React.cloneElement(children,  props ) }
                        </div>        
            </LayoutMain> )
}




const Shortcuts = (props) => {

    let {projectStateObj} = props;

    const router = useRouter();   

    const isloggeddata=isLogged();

    let {user} = isloggeddata ?? {}

    let permissions = isloggeddata?.permissions;

    let article_auth=    permissionsControlV3({askList:["article_edit", "article_add"], type:"some", permissions});

  return (
    <div className={s.links}>        

                        
    
                        {projectStateObj?.[0] &&  <select value={projectStateObj?.[0]} onChange={(e)=>projectStateObj[1](e?.target?.value)} style={{fontSize:10, padding:"1px 8px"}}>
                                <option value={"sakaryarehberim.com"}>sakaryarehberim.com</option>
                                <option value={"yurtarama.com"}>yurtarama.com</option>
                        </select>}

            <AddContentButtton projectStateObj={projectStateObj}/> 
    </div>
  )
}



const AddContentButtton = (props) => {

    let {projectStateObj} = props;
    
    const router = useRouter();   
    const [disable, setdisable] = useState(false);

    const isloggeddata=isLogged();
    let {user, session} = isloggeddata ?? {}    

    ///////////////////////////////////     
               
      //////////////////////////////////
      async function handleClick  ({project}) {                
                                                  setdisable(true);                                                                                                    
                                                  let result = await perfectmutation({
                                                      data:{ type:"articleinsert", project, category:undefined },
                                                      session,                                                                                            
                                                  }); // payment_transactions'a bir tane kayıt aç...
                                                  router.push(`/contents/content/${result?.id}`);       
                                                  setdisable(false);
                                              }

                                 
                                                                                                             
                          
      ///////////////////////////////////      


  return (<div style={buttonWrStyle} title="İçerik ekle"> 

                                  {disable && <div style={loadingStyle}><IoRocketSharp title="Roket ateşlendi"/></div>}

                                  {!projectStateObj?.[0] &&  <Link href="/contents"><RiListCheck size={24} title="Haberler" style={{cursor:"pointer"}}/></Link> }

                                  <button
                                      onClick={() => { !disable && handleClick({project:"yurtarama.com"}); }}
                                      type="button"
                                      disabled={disable}
                                      style={buttonStyle}
                                      title="yurtarama.com"
                                  >
                                          <RiAddCircleFill/><span>YA</span>

                                  </button>


                                  <button
                                      onClick={() => { !disable && handleClick({project:"sakaryarehberim.com"}); }}
                                      type="button"
                                      disabled={disable}
                                      style={buttonStyle}
                                      title="sakaryarehberim.com"
                                  >
                                          <RiAddCircleFill/><span>SR</span>

                                  </button>

            </div>    
  );
}




let loadingStyle= {
    position:"absolute",    
    right:-8,
    top:-8
}


let buttonWrStyle= {
    position:"relative",    
    display:"flex",
    alignItems:"center",  
    justifyContents:"center" ,
    gap:10 

}


let buttonStyle= {
    backgroundColor:"transparent",
    border:"none",
    fontSize:20,
    cursor:"pointer",
    display:"flex",
    alignItems:"center",    
}