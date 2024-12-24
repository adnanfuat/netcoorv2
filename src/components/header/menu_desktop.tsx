
import { RiStore2Fill, RiHome2Fill, RiPhoneFill, RiShakeHandsFill, RiShieldUserFill    } from "react-icons/ri";

import Link from "next/link"
import ns from "./menu_desktop.module.css";

// import dynamic from "next/dynamic";
// const Dynamic_Login = dynamic(() => import("@/components/commonnew/login").then(comp=>comp.Login), { loading: () => <div>Yükleniyor</div> });

export default function HeaderV2_DesktopMenu ({props}) {

let { closeDesktopMenu } =props ?? {}  
// console.log("closeDesktopMenucloseDesktopMenu: ", props);  
  
    
  return (
           <div className={`${ns.desktopmenu}`}>

                                        <Link href={`/`}  className={`${ns.link}`}> <RiHome2Fill/> <span>Ana sayfa</span></Link>

                                        <Link href={`/firmarehberi`}  className={`${ns.link}`}> <RiStore2Fill/>  <span>Firmalar</span></Link>  

                                        <div className={`${ns.link} ${ns.companies}`}>
                                                                                        
                                                           <div className={`${ns.menuitems}`}>                                                 
                                                              <Link href={`/firmarehberi`}>- Firmalar </Link>  
                                                              <Link href={`/addcompany`}>- Firma ekle </Link>  
                                                            </div>                                                                                                                                                                       
                                            
                                        </div> 

                                        <Link href={`/rs/emlak`} className={`${ns.link}`}> <RiShakeHandsFill /> İlanlar </Link>

                                        <div className={`${ns.link} ${ns.companies}`}>
                                                                                                                                    
                                            
                                                           <div className={`${ns.menuitems}`}>                                                 
                                                              {/* <Link href={`/advs`}> Tüm ilanlar </Link>   */}
                                                              {/* <Link href={`/vasita`}> İkinci el araç</Link>                                                                 */}
                                                              <Link href={`/rs/emlak`}>- Emlak ilanları </Link>                                                                
                                                              <Link href={`https://www.supereleman.com`} target={"_blank"}>- İş ilanları</Link>  
                                                              <Link href={`https://www.yurtarama.com`} target={"_blank"}>- YurtArama.com</Link>  
                                                              {/* <Link href={`https://www.superemlak.com`} target={"_blank"}> Emlak ilanları (SüperEmlak)</Link>   */}
                                                            </div>                                                                                                                                                                       
                                                                                                                             

                                        </div> 





                                  
                                        {/* <div className={`${ns.link} ${ns.contents}`}> */}
                                        <Link href={`/contact`} className={`${ns.link}`}> <RiPhoneFill/>  İletişim </Link>
                                        <Link href={`${process.env.NEXT_PUBLIC_API_CONSOLE_URL}`} className={`${ns.link}`} target={"_blank"}> <RiShieldUserFill />  Yönetim konsolu </Link>
                                        

                                        {/* </div>   */}
                                        
                                        
                                         

                                        {/* {(process.env.NODE_ENV == "development" || 1 == 1) && <Dynamic_Login/> }                                                                                                                                                                           */}
                                  </div>
         )
}














// {(process.env.NODE_ENV == "development" || 1 == 1) && <Login props={{session}}/> } 



{/* {(session) && <div className={`${ns.link} ${ns.panel}`} onMouseOver={()=>{setpanel(true);}}  onMouseOut={()=>{setpanel(false);}}> 
                                                
                                                  Panel 
                                                  {panel && <div className={ns.subpanel}>                                                    
                                                            <div className={`${ns.menuitems}`}>
                                                                  <div>İçerik1</div>
                                                                  <div>İçerik2</div>                                                              
                                                          </div> 
                                                  </div>}                                                                                          
                                         </div> }  */}














