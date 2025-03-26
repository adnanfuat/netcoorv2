
import s from "./page.module.css";
import {_userState} from "@/modules/constants/user"
 import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { Inter } from "next/font/google";
import {redirect_postfix } from "@/modules/constants/redirect_postfix";

import Link from "next/link";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa";

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

  let sectors=[];
  try {            

        let result = await fetch(process.env.NEXT_PUBLIC_BACKEND_APIURL, {
        method: "POST",            
        // next: { revalidate: 100 },
        headers: { "Content-Type": "application/json", },               
        body: JSON.stringify({
          query: SwissArmyKnifeQuery,
          variables: { data: { type:"companydirectoryv2", project:"sakaryarehberim.com", locale:"tr", defaultLocale:"tr",  imgCloud:(process.env.NEXT_PUBLIC_IMGSOURCE+"/pictures")} },
        }),
      })
        result =  await result.json();        
        // console.log("result:::::::::", result);
        sectors=result?.data?.swissarmyknifequery?.tunnel;;       

  } catch (error) {
    console.log("Firma Rehberi getStaticProps error!!!!: ", error);
  }

  
  //  return (JSON.stringify(sectors));

  return ( <List sectors={sectors}/> );
}




const List = (props) =>{

  let {sectors} = props ?? {}


  return <div className={s.shell}   > 
      
  {/*  {listsectors?.length} vvvv {sectors?.length}  */}
  {/*  <HeadComp props={{pagetype:"directory"}}/>    */}

      {sectors?.map((a,i)=>            
                                    {      
                                                                                  
                                     return (
                                       <div key={i}>             
                                                    <div className={s.row}> 
                                                            <Image
                                                                src={a?.img}
                                                                alt={a?.title}
                                                                width={66}
                                                                height={44}        
                                                                style={{
                                                                  objectFit: "cover",
                                                                  maxWidth: "100%",
                                                                  height: "auto",
                                                                  border: "1px solid rgb(184, 184, 184)"

                                                                        }} 
                                                                />

                                                                <Link
                                                                  href={`/se/${a?.slug}/${redirect_postfix}`}
                                                                  prefetch={false}
                                                                  style={{fontWeight:"bold"}}>
                                                                  {` ${a?.title}`}
                                                                </Link>
                                                      </div>

                                                      <div className={s.s_shell}>

                                                              {a?.subsectors?.map((s,j)=>
                                                                                    <Link href={`/su/${s?.slug}/${redirect_postfix}`} key={j}>
                                                                                          <div style={{display:"flex",  alignItems:"center"}}>                                                                                                  
                                                                                                    <FaCaretRight/>
                                                                                                    {s?.title}
                                                                                          </div>
                                                                                    </Link>
                                                              )}

                                                      </div>      

                                        </div>
                                     );
                                    }

                                  )
                                  
                                  }
               </div>
}




const SwissArmyKnifeQuery = 
`  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {
      tunnel
    }
  }`
;


