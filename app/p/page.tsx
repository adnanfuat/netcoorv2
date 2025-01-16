
import s from "./page.module.css";
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import Link from "next/link";
import { RiBuilding4Fill, RiCoinFill, RiDatabaseFill, RiExchangeFill, RiExternalLinkFill, RiHome3Fill, RiLinksFill, RiMailFill, RiNotification2Fill, RiPenNibFill, RiPhoneFill, RiShieldUserFill, RiUser2Fill } from "react-icons/ri";
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import Home_Tasks from "@/src/components/home/home_tasks";
import Home_Contracts from "@/src/components/home/home_contracts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function Home(context) {
  
//   let params = await context?.params;
  let userdata = await isloggedv4_clerk();

  let {userscopes } = userdata ?? {};
  let email = userdata?.email;  
  let isTechnician  = userscopes?.isTechnician;
  let manegerAuth  =  userscopes?.isManager;
  let patreonAuth  =  userscopes?.isPatreon;
  let technicianAuth  =  userdata?.userscopes.isManager;
        
  // console.log("data::::assasa",  noncontrolleds_count)
  let cache =  permissionsControlV3({askList:["cache"], type:"some", permissions:userdata?.permissions});
  
  return (
    <div className={s.shell}>

    {/* {JSON.stringify("params")}     */}
    <div className={s.mainwr}>  
    {/* {those_waiting_for_your_control} */}
    
          <div  className={`${s.descwr}`}>
                {/* <main className={`${dancingScript.className} ${s.titletext}`}> Hoş geldiniz </main>     */}
                <main className={`${inter.className} ${s.desctext}`}> Bu site <Link href={`https://www.sakaryarehberim.com`} target={"_blank"}>SakaryaRehberim.com</Link>, <Link href={`https://www.supereleman.com`} target={"_blank"}>SüperEleman.com</Link> ve bağlantılı sitelerle entegre olarak çalışmaktadır. </main>   
          </div>
     
     
     <div className={s.gridwr}>
    
     <div className={`${s.griditemwr}`}>
                <Link href={`/p/jobadverts`}>
                      <div className={`${s.griditemicon} ${s.blink_me}`}><RiUser2Fill  size="30"/></div>                              
                      <div className={s.griditemtitle}>İş ilanı ekle</div>
                </Link>
          </div>    
    
          <div className={s.griditemwr}>
                <Link href={`/p/webs`}>
                <div className={s.griditemicon}><RiLinksFill size="30"/></div>                              
                <div className={s.griditemtitle}>Web sitesi oluştur</div>
                </Link>
          </div>
    
          
    
          <div className={s.griditemwr}>
                <Link href={`/p/memberships`} >
                      <div className={s.griditemicon}><RiBuilding4Fill size="30"/></div>                              
                      <div className={s.griditemtitle}>Firmalarım</div>
                </Link>
          </div> 
    
          {/* <div className={s.griditemwr}>
                <Link href={`/myaccount?tab=adverts&type=realestates`}>
                <div className={s.griditemicon}><RiHome3Fill  size="30"/></div>                              
                <div className={s.griditemtitle}>Emlak ilanı ekle</div>
                </Link>
          </div>                         */}
    
                     
    
          <div className={s.griditemwr}>
                <Link href={`/p/payment`}>
                      <div className={s.griditemicon}><RiCoinFill  size="30"/></div>                              
                      <div className={s.griditemtitle}>Ödeme yap</div>
                </Link>
          </div>    
    
          <div className={s.griditemwr}>
                <Link href={`/p/myaccount?tab=personal&subtab=resumes`}>
                      <div className={s.griditemicon}><RiUser2Fill size="30"/></div>                              
                      <div className={s.griditemtitle}>Özgeçmiş Oluştur</div>
                </Link>
          </div>   
    
          {/* <div className={s.griditemwr}>
                <Link href={`/p/notifications`}>
                      <div className={s.griditemicon}><RiNotification2Fill size="30"/></div>                              
                      <div className={s.griditemtitle}>Bildirimler</div>
                </Link>
          </div>    */}
    
          <div className={s.griditemwr}>
                <Link href={`/p/messages`}>
                      <div className={s.griditemicon}><RiMailFill size="30"/></div>                              
                      <div className={s.griditemtitle}>Mesajlar</div>
                </Link>
          </div>  
    
    
    
          <div className={s.griditemwr}>
                <Link href={`/p/myaccount`}>
                      <div className={s.griditemicon}><RiShieldUserFill size="30"/></div>                              
                      <div className={s.griditemtitle}>Hesabım</div>
                </Link>
          </div>   
    
    
          <div className={s.griditemwr}>
                <Link href={`/p/myaccount?tab=personal&subtab=phones`}>
                      <div className={s.griditemicon}><RiPhoneFill size="30"/></div>                              
                      <div className={s.griditemtitle}>Telefonlarım</div>
                </Link>
          </div>         
    
    
          <div className={s.griditemwr}>
                <Link href={`/p/myaccount?tab=contents`}>
                      <div className={s.griditemicon}><RiPenNibFill size="30"/></div>                              
                      <div className={s.griditemtitle}>Kişisel İçeriklerim</div>
                </Link>
          </div>                                                                                                                                                                  
    
     </div>
    
    
     {(userdata?.userscopes.isTechnician  ) && <Home_Contracts userdata={userdata}/> }
          
    
     
     
    
    
    </div>
    
                           
    <Home_Tasks userdata={userdata}/>
    
    
    {/* {patreonAuth ?<div className={s.icons}>
          {patreonAuth && <div onClick={()=>cacheDeleteFunc()} title="Düğmeye bir kere bastığınızda backend tarafındaki sistemi hızlandıran cache verileri silinecektir. Daha sonra zamanla tekrar oluşacaktır."> Sil / Backend Cache </div>}
    </div> : undefined} */}
    
    </div>
  );
}





const SwissArmyKnifeQuery =
  `  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {      
      o_key_1      
    }
  }`
  ;
