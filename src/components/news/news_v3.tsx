
import s from "./news_v3.module.css"
import Link from "next/link";
import {interactionProxy} from "@/modules/constants/interaction"
import { useSnapshot } from 'valtio';
import Image from "next/image";
//import dynamic from "next/dynamic";
//let interactionValtio = useSnapshot(interactionProxy);


export const News_V3 = ({props}) => {
  
  let { relatedcontents } = props;

  let interactionValtio = useSnapshot(interactionProxy);
          
  return (    
              <div className={s.newsWr}>
                  { relatedcontents?.map((article, index )=>{ 
                                                                                
                                let title     =  article?.title;
                                let slug      =   article?.slug;
                                let img       =    article?.img; 
                                img           =        img ? `${process.env.NEXT_PUBLIC_IMGSOURCE}/${img}` :  `/images/common/whitelogo.jpg`;
                                                                   

                                return  <div className={s.itemwr} style={{position:"relative"}} key={`art_${index}`} >   
                                                    {<Link href={`/cn/${slug}`}  prefetch={false}>                                                        
                                                                       <Image
                                                                            src={img}
                                                                            width={260}
                                                                            height={151}                                              
                                                                            loading={index<1 ? "eager":"lazy"}                                                      
                                                                            alt={title}                                                  
                                                                            className={s.img}                                                                                                                         
                                                                      /> 
                                                    {/* <div style={{ backgroundImage:interactionValtio?.interaction ? `url(${img})` : "url(/images/common/whitelogo.jpg)", backgroundSize:"cover", backgroundPosition:"center",border: "3px solid #b8b8b8"}}  className={s.img}  alt={title} title={title} ></div> */}

                                                  </Link>}        
                                                                                                                                                          
                                              <Link href={`/cn/${slug}`}>{title}</Link>
                                        </div>
                                              

                        }) }          
                </div>
          )   
  }



