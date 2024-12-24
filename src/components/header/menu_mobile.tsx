

import { RiCloseFill } from "react-icons/ri";
import Link from "next/link"
import s from "./menu_mobile.module.css";
import { useState } from "react";
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";



export default function HeaderV2_MobileMenu ({props})  {

      const [wr, setwr] = useState(false);

      let router =useRouter();
  
      let {session, adminauthority, closeMobileMenu} =props ?? {}
    
      const [mobileadvertiesmenu, setmobileadvertiesmenu] = useState(false)
      const [mobilecompaniesmenu, setmobilecompaniesmenu] = useState(false)
      const [mobilecontentsmenu, setmobilecontentsmenu] = useState(false)
      const [adminmenu, setadminmenu] = useState(false)
      const [panelmenu, setpanelmenu] = useState(false)

      const advertsmenufunc = () => { setmobileadvertiesmenu(a=>!a); setmobilecontentsmenu(false); setmobilecontentsmenu(false); }
      const companiesmenufunc = () => { setmobilecompaniesmenu(a=>!a); setmobilecontentsmenu(false); }
      const contentsmenufunc = () => { setwr(true); setmobilecontentsmenu(a=>!a); setmobilecompaniesmenu(false); }      
      const adminmenufunc = () => { setadminmenu(a=>!a); setmobilecontentsmenu(false); setmobilecompaniesmenu(false); }      
      const panelmenufunc = () => { setpanelmenu(a=>!a); setmobilecontentsmenu(false); setmobilecompaniesmenu(false); setadminmenu(false); }      



      // Tip: https://stackoverflow.com/questions/65086108/next-js-link-vs-router-push-vs-a-tag 
      return (
               <div className={`${s.mobilemenu}`}>
                                      
                                      <div className={`${s.close}`} onClick={()=>closeMobileMenu()}><RiCloseFill/></div>

                                            {/* <Link href={`/`} className={`${s.title}`}> Ana sayfa </Link> */}
                                            {/* <div onClick={() => { router.push("/"); closeMobileMenu(); }} className={`${s.title}`}> Ana Sayfa </div> */}
                                            <Link href={`/`} onClick={()=>closeMobileMenu()} className={`${s.title}`}> Ana Sayfa </Link>  
    
                                            <div>                                                
                                                <div className={`${s.title}`} onClick={()=>{companiesmenufunc()}}> Firmalar </div>  

                                                        {mobilecompaniesmenu && <div className={`${s.submenu}`}>                                                                                            
                                                                                    {/* <div onClick={()=>{ router.push("/firmarehberi"); closeMobileMenu(); }}>  Firma rehberi    </div>
                                                                                    <div onClick={() => { router.push("/addcompany"); closeMobileMenu(); }}>  Firma ekle       </div> */}
                                                                                    <Link href={`/firmarehberi`} onClick={() => closeMobileMenu()}> Firma rehberi</Link>
                                                                                    <Link href={`/addcompany`} onClick={()=>closeMobileMenu()}> Firma ekle </Link>
                                                                                </div>}

                                            </div> 
    


                                                
                                               <div>
                                                  <div className={`${s.title}`} onClick={()=>{advertsmenufunc()}}> İlanlar </div>                                                   
                                                        {mobileadvertiesmenu && <div className={`${s.submenu}`}>
                                                                                                                                                                                     
                                                                          {/* <div onClick={()=>{ router.push("/advs"); closeMobileMenu(); }}>  Tüm ilanlar    </div> */}
                                                                          {/* <div onClick={()=>{ router.push("/advs/vasita"); closeMobileMenu(); }}>  İkinci el araç   </div> */}
                                                                            {/* <div onClick={() => { router.push("/rs/emlak"); closeMobileMenu(); }}>  Emlak  </div> */}
                                                                            <Link href={`/rs/emlak`} onClick={() => closeMobileMenu()}> Emlak</Link>

                                                                          
                                                                          <hr/>
                                                                          <Link href={`https://www.supereleman.com`} target={"_blank"}  onClick={()=>closeMobileMenu()}> İş ilanları (SüperEleman) </Link>  
                                                                          {/* <Link href={`https://www.superemlak.com`} target={"_blank"}  onClick={()=>closeMobileMenu()}> Emlak ilanları (SüperEmlak)</Link>                                                                                                                                                                                                                                             */}
                                                        </div> }                                                                                       
                                                  
                                            </div>                                                 
    
                                              <Link href={`/contact`} className={`${s.title}`} onClick={() => closeMobileMenu()}> İletişim </Link> 
                                              {/* <div onClick={()=>{ router.push("/contact"); closeMobileMenu(); }} className={`${s.title}`}> İletişim </div> */}

                                            {adminauthority && <Admin props={{  adminmenufunc, adminmenu }}/>}
    
                                            {(session) && <div className={`${s.link} ${s.admin}`}> <Panel props={{panelmenufunc, panelmenu}}/> </div> }                                                                                                                                                                                                       

                                      </div>
             )
    }
    
    






    const Panel = ({props}) => {

      let { authorizednavItems, panelmenufunc, panelmenu} = props ?? {}
      
      return (
        <div>
               <div className={`${s.title}`} onClick={()=>{panelmenufunc();}} >Panel</div>
                                                                   
                                              {
                                              panelmenu && <div className={`${s.submenu}`}>                                                                                                                                                               
                                                                  { authorizednavItems?.map((item, index) => { return <Link  href={item.link}>{item.text}</Link> } ) }                                                      
                                              </div>
                                              }  
        </div>
      )
    }
    
    
    
    
    



const Admin = ({props}) => {

  let { authorizednavItems, adminmenufunc, adminmenu} = props ?? {}
  

  return (
    <div>
           <div className={`${s.title}`}  onClick={()=>{adminmenufunc();}} >Yönetim</div>
                                                               
                                          {
                                          adminmenu && <div className={`${s.submenu}`}>                                                                                                                                                               
                                                              { authorizednavItems.map((item, index) => { return <Link  href={item.link}>{item.text}</Link> } ) }                                                      
                                          </div>
                                          }  
    </div>
  )
}




