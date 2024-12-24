import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  // Index_Cuffs için...
import { Carousel } from 'react-responsive-carousel';
import Link from "next/link";
import s from "./cuffs_real.module.css"


export const  Cuffs_Real = ({props}) => {

      let {cuffs, locale} = props;
     

      let images=cuffs?.map(cuff=>
         {                       
           
      //      let file = cuffs?.o_key_2?.find(g=>g?.slug_tr==cuff?.files?.[0]);
     
      //      const newimg= file?.bigdata?.filename ? `${imgs_source}/${file?.bigdata?.folder}/${file?.bigdata?.filename}`  : "/images/common/whitelogo.jpg"

                                    let firstImg = cuff?.img?.[0];
                                    let newimg = firstImg? `${firstImg?.source}/${firstImg?.folder}/${firstImg?.filename}` : undefined;


               return { img_filename:cuff?.name, src:newimg, link:cuff?.link,  img_blank:cuff?.blank, id: cuff?.id    }       
         }     
     );   

          
         return (
               <Carousel showThumbs={false} showStatus={true}>
                       {cuffs?.map((item, i) => {

                                                      let firstImg = item?.img?.[0];
                                                      let newimg = firstImg? `${firstImg?.source}/${firstImg?.folder}/${firstImg?.filename}` : undefined;
                                                      
                                                      return <Link href={(item?.link ?? "#")} prefetch={false} key={`cuff-l-${i}`} aria-label={`Manşet-${i}`}>
                                                            <div key={`cuff-${i}`} className={s.cuffitem}> {}
                                                                  <img src={newimg} />
                                                                  {item?.img_filename && <p className="legend">{item?.img_filename}</p>}
                                                            </div>
                                                      </Link>
                             
                        }

                        )}
               </Carousel>          
         );
     }