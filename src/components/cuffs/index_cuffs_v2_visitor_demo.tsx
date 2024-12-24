import Image from 'next/image'
import s from "./index_cuffs_v2_visitor_demo.module.css"

export const  Index_Cuffs_V2_Visitor_Demo = ({props}) => {

            let {cuffs, locale} = props;    

            let firstImg = cuffs[0]?.img?.[0];
            let newimg = firstImg? `${firstImg?.source}/${firstImg?.folder}/${firstImg?.filename}` : undefined;
                     
            //  return { img_filename:cuff?.name, src:newimg, link:cuff?.link,  img_blank:cuff?.blank, id: cuff?.id    }       
            //  return JSON.stringify(newimg);
     
         return (                                                                                                
                                        //  <Link href={cuff?.link} prefetch={false}  aria-label={`Manşet`} >
                                        <div className={s.imgwr}>



                                            <Image src={newimg} width={809} height={471}  alt={cuffs[0]?.name ?? "..."} priority={true} loading="eager" className={s.img}/>

                                            {/* <img src={newimg} alt={cuff?.name ?? "..."}  width="100%" height={"auto"} /> */}
                                        </div>
                                        //  </Link>                                                                                                                     
                                        );
                                    }
                                    {/* <img src={newimg} alt={cuff?.name ?? "..."}  width="100%" height={"auto"} /> */}