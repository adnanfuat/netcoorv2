"use client"
import s from "./sectors.module.css";
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


export default function Sectors(props) {

  let {aaa} = props ?? {};
  
  const searchParams = useSearchParams();    
        const subsector = searchParams.get('subsector');
        const sector = searchParams.get('sector');
        const project = searchParams.get('project');
  
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
  
        // return JSON.stringify(data);
        // useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser])                            
        let { data:projects, isLoading:projectsIsLoading } = projectshook_next15();


  return <div className={s.shell}   > 
      
      { 1==1 && <FilterCompanies  projects={projects}  params={params} changeFilterSelect={1 } countryStateObj={undefined} cityStateObj={undefined} districtStateObj={undefined} subdistrictStateObj={undefined}  projectStateObj={projectStateObj}  sectors_options={undefined}  subsectors_options={undefined} sectorStateObj={undefined} subsectorStateObj={undefined} showorder={false}/>}
      
              <div className={s.list} >
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
                                                                            href={`/p/directory/companies?sector=${a?.slug}`}
                                                                            prefetch={false}
                                                                            style={{fontWeight:"bold"}}>
                                                                            {` ${a?.title}`}
                                                                          </Link>
                                                                </div>

                                                                <div className={s.s_shell}>

                                                                        {a?.subsectors?.map((s,j)=>
                                                                                              <Link href={`/p/directory/companies?sector=${a?.slug}&subsector=${s?.slug}`} key={j}>
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


               </div>
}





