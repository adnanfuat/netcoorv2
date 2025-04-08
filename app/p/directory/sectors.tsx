"use client"
import j from "./sectors.module.css";
import {_userState} from "@/modules/constants/user"
import {redirect_postfix } from "@/modules/constants/redirect_postfix";
import Link from "next/link";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import FilterCompanies from "@/modules/memberships_next15/filtercompanies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { projectshook_next15 } from "@/modules/functions/projectshook_next15";
import { RiEditBoxLine } from "react-icons/ri";


export default function Sectors(props) {

  let {userdata} = props ?? {};
  
      const searchParams = useSearchParams();    
        const subsector = searchParams.get('subsector');
        const sector = searchParams.get('sector');
        const project = searchParams.get('project');

        let {userscopes } = userdata ?? {};
        let email = userdata?.email;  
        let isTechnician       =   userscopes?.isTechnician;
        let manegerAuth        =   userscopes?.isManager;
        let patreonAuth        =   userscopes?.isPatreon;
        let technicianAuth     =   userdata?.userscopes.isManager;    
  
        const title_tabstates = useState([]); // doping modalı
  
        const params =  useState({                                                
                                      order:0,      
                                      itemsperpage:10,
                                      page:1,
                                      keyword:undefined
                                });
  
        useEffect(() => {
              sector && sectorStateObj[1](sector)
              subsector && subsectorStateObj[1](subsector)
              project && projectStateObj[1](project)
        }, [subsector, sector])
        
  
      let projectStateObj = useState("sakaryarehberim.com");
        
      const fetch_relatedcategory = async ()=> {let res = await fetch("/api/perfectquery_next15", { method: "POST", body: JSON.stringify({ data:{ type:"companydirectoryv2", project:projectStateObj[0], locale:"tr", defaultLocale:"tr",  imgCloud:(process.env.NEXT_PUBLIC_IMGSOURCE+"/pictures")}  } )} );  res=await res.json(); return res };
      const {  isError, error, isSuccess, data:sectors } = useQuery( {queryKey:["companydirectoryv2", projectStateObj[0] ], queryFn:() => fetch_relatedcategory(), staleTime:5000000000, }  );          
  
      const sectorStateObj     =  useState(undefined);
      const subsectorStateObj  =  useState(undefined);
  
         
        // useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser])                            
        let { data:projects, isLoading:projectsIsLoading } = projectshook_next15();
        // return JSON.stringify(sectors?.[0]);

  return <div className={j.shell}>
      
              { 1==1 && <FilterCompanies  projects={projects}  params={params} changeFilterSelect={1 } countryStateObj={undefined} cityStateObj={undefined} districtStateObj={undefined} subdistrictStateObj={undefined}  projectStateObj={projectStateObj}  sectors_options={undefined}  subsectors_options={undefined} sectorStateObj={undefined} subsectorStateObj={undefined} showorder={false}/>}
      
              <div className={j.list}>

                {sectors?.map((a,i)=>   {      
                                                                                            
                                              return (
                                                <div key={i}>             
                                                              <div className={j.row}> 
                                                                                                          
                                                                    <div style={{display:"flex", gap:10, alignItems:"center"}}>
                                                                          <Image
                                                                              src={a?.img}
                                                                              alt={a?.title}
                                                                              width={44}
                                                                              height={30}        
                                                                              style={{
                                                                                objectFit: "cover",
                                                                                maxWidth: "100%",
                                                                                height: "auto",
                                                                                border: "1px solid rgb(184, 184, 184)"

                                                                                      }} 
                                                                              />

                                                                              <Link
                                                                                href={`/p/directory/companies?sector=${a?.slug}`}
                                                                                prefetch={false}
                                                                                style={{fontWeight:"bold", fontSize:12}}>
                                                                                {` ${a?.title}`}
                                                                              </Link>

                                                                      </div>

                                                                          {technicianAuth ? <div className={j.rankswr}><span title="Rank" className={j.rank}>{a?.rank}</span> <span title="Google Rank" className={j.googlerank}>{a?.googlerank}</span></div> : undefined }                                                                          

                                                                          {technicianAuth ? <Link href={`/p/directory/se?id=${a?.id}`}> 
                                                                                                                                          <RiEditBoxLine size={16}/> 
                                                                                                                                </Link> : undefined }
                                                                </div>

                                                                <div className={j.s_shell}> 

                                                                        {a?.subsectors?.map((s,o)=>
                                                                                              
                                                                                                    <div style={{display:"flex",  alignItems:"center", fontSize:12, gap:8}}>       
                                                                                                    
                                                                                                              {technicianAuth ? <div className={j.rankswr}><span title="Rank" className={j.rank} style={{backgroundColor:"#dedede"}}>{s?.rank}</span> <span title="Google Rank"  className={j.googlerank} style={{backgroundColor:"#dedede"}}>{s?.googlerank}</span></div> : undefined }                                                                                                                                                                     

                                                                                                              {technicianAuth ? <Link href={`/p/directory/su?id=${s?.id}`}> 
                                                                                                                                          <RiEditBoxLine size={16}/> 
                                                                                                                                </Link> : <FaCaretRight/> }

                                                                                                                                <Link href={`/p/directory/companies?sector=${a?.slug}&subsector=${s?.slug}`} key={o}> {s?.title} </Link>
                                                                                                    </div>
                                                                                              
                                                                        )}

                                                                </div>      

                                                  </div>
                                              );
                                              }

                                            )
                                            
                                            }
              </div>


               </div>
}





