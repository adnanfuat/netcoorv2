"use client"
import s from "./layoutleft.module.css";
// import UploadModal from "@/modules/selectimg/uploadmodal";
// import { FlagsMenu } from "@/modules/common/flagsmenu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { RiComputerFill, RiMoneyCnyBoxFill, RiNotification2Fill, RiMailFill, RiAdminFill, RiShoppingCart2Fill, RiBox1Fill      } from "react-icons/ri";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RiAccountCircleFill,RiBuilding3Fill  } from "react-icons/ri";
import { RiNewspaperFill } from "react-icons/ri";
import { RiGalleryFill } from "react-icons/ri";
import { RiHome2Fill } from "react-icons/ri";
import { RiMapPinUserFill } from "react-icons/ri";
import { RiTaskFill } from "react-icons/ri";
import { RiListSettingsFill } from "react-icons/ri";
import { RiPagesFill } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { RiCloseCircleLine, RiWhatsappFill  } from "react-icons/ri";
import { _userState } from "@/modules/constants/user";
// import {open_sans} from "@/constants/fonts/index"
import permissionsControlV3 from '@/modules/functions/permissionscontrolv3';
import { Open_Sans } from 'next/font/google';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
const open_sans = Open_Sans({weight:"400",subsets:["latin","latin-ext"], variable:"--font-opensans"   }); 

// const DynamicUploadCentral = dynamic(() => import("@/components/commonnew/uploadcentral"),{ loading: () => 'Loading...', });

export const LayoutLeft = (props) => {

  let {uploadObj, userdata} = props ?? {};
  // console.log("xzxczxcxczxcz", uploadObj);
  // const userdata = isLogged();
  let { permissions } = userdata ?? {};
  let email = userdata?.email;  
  // let showweb =
  //   user?.websites?.length > 0 ||
  //   user?.userinfo?.bigdata?.static?.authorizedwebs?.length > 0;

  // let upload_authority = permissionsControl({
  //     askList: ["upload"],
  //     type: "some",
  // }); // parça yetkilere göre hareket etmek için sorgulama___ // slug değişimi hassas konu___

  let upload_authority = permissionsControlV3({
    askList: ["upload"],
    type: "some",
    permissions:[],
}); // parça yetkilere göre hareket etmek için sorgulama___ // slug değişimi hassas konu___

 

  let test_technician = !!(
    email == "yigitruzgaruzun@gmail.com" ||
    email == "kevseresen@sakaryarehberim.com" ||
    email == "info@sakaryarehberim.com" || 
    email == "zulal@sakaryarehberim.com" 
  );

  let test_manager = !!(
    email == "yigitruzgaruzun@gmail.com" ||
    email == "kevseresen@sakaryarehberim.com" ||
    email == "info@sakaryarehberim.com"
  );
  let test_boss = !!(
     email == "info@sakaryarehberim.com" || email == "yigitruzgaruzun@gmail.com" 
  );

  
      
      // const searchParams = useSearchParams();
      // let userparam = searchParams.get('user');


      
  return (
    <div className={`${open_sans?.className} ${s.shell}`} > 
    {/* {JSON.stringify(userdata)} */}

        <div className={s.top}>
                    <div title="Çıkış" >
                                          <SignedOut>
                                            <RedirectToSignIn />
                                          </SignedOut>
                                          <SignedIn >
                                            <UserButton  />                                             
                                          </SignedIn>
                </div>

                 {/* <FlagsMenu /> */}
                 {/* {`https://---wa.me/+905495440554?text="Merhaba, size Sakaryarehberim.com üzerinden ulaşıyorum. "`} */}
                <Link href={`https://web.whatsapp.com/send?phone=905495440554&text=Merhaba, size Sakaryarehberim.com üzerinden ulaşıyorum.`} aria-label="Whatsapp" target="_blank"  className={s.wapp} >                                                                                
                                            <div title="Destek Al"><RiWhatsappFill  style={{fontSize:20}} /></div>
                </Link> 
      </div>    

      <div className={`${s.bodywr} flexcolumn`}>
        
              <div className={`${s.menuitem} flexrow`}>
                    <RiComputerFill />
                    <Link href="/p">Konsol</Link>
              </div>
          
              {upload_authority && (
                <div className={`${s.menuitem} flexrow`}>
                    <RiUploadCloud2Fill />
                    <a onClick={() => uploadObj[1]((old) => !old)}>Resim yükle</a>
                </div>
              )}

              <div className={`${s.menuitem} flexrow`}> <RiAccountCircleFill /> <Link href="/p/myaccount">Hesabım</Link> </div>
              
              <div className={`${s.menuitem} flexrow ${s.blink_me}`}> <RiMapPinUserFill /> <Link href="/p/jobadverts">İş İlanları</Link> </div>

              <div className={`${s.menuitem} flexrow`}> <RiBuilding3Fill  /> <Link href="/p/memberships">Firmalarım</Link> </div>
              
              <div className={`${s.menuitem} flexrow`}> <RiNotification2Fill  /> <Link href="/p/notifications">Bildirimler</Link> </div>

              <div className={`${s.menuitem} flexrow`}> <RiMailFill   /> <Link href="/p/messages">Mesajlar</Link> </div>
              
              { (
                <div className={`${s.menuitem} flexrow`}>
                  <RiMoneyCnyBoxFill />
                  <Link href="/p/payment">Ödeme</Link>
                </div>
              )}


              {permissionsControlV3({ askList: ["payments"], type: "some", permissions }) && (
                <div className={`${s.menuitem} flexrow`}>
                  <RiMoneyPoundBoxFill />
                  <Link href="/p/payments">Ödemeler</Link>
                </div>
              )}

                            
              <div className={`${s.menuitem} flexrow`}>
                  <RiBox1Fill />
                  <Link href="/p/packages">Paketler</Link>
                </div>


                { (
                <div className={`${s.menuitem} flexrow`}>
                  <RiPagesFill />
                  <Link href="/p/webs">Web siteleri</Link>
                </div>
              )}

              { (
                <div className={`${s.menuitem} flexrow`}>
                  <RiShoppingCart2Fill/>
                  <Link href="/p/webs?subtab=web_orders">Siparişler</Link>
                </div>
              )}
              

              <div className={`${s.menuitem} flexrow`}> <RiNewspaperFill /> <Link href="/p/contents">Haberler</Link> </div>

              <div className={`${s.menuitem} flexrow`}> <RiGalleryFill /> <Link href="/p/cuffs">Manşetler</Link> </div>

              {/* <div className={`${s.menuitem} flexrow`}> <RiHome2Fill /> <Link href="/p/realestates">Emlak İlanları</Link> </div> */}

              

                { 1==2 && (
                    <div className={`${s.menuitem} flexrow`}>
                      <RiTaskFill />
                      <Link href="/p/tasks">Görevler</Link>
                    </div>
                )}


              {test_manager && (
                <div className={`${s.menuitem} flexrow`}>
                  <RiListSettingsFill />
                  <Link href="/p/contracts">Sözleşmeler</Link>
                </div>
              )}





              {test_manager && (
                <div className={`${s.menuitem} flexrow`}>
                  <RiUser3Fill />
                  <Link href="/p/users">Kullanıcılar</Link>
                </div>
              )}



              {permissionsControlV3({ askList: ["payments"], type: "some", permissions }) && (
                <div className={`${s.menuitem} flexrow`}>
                  <RiAdminFill />
                  <Link href="/p/expert">Panel</Link>
                </div>
              )}

                                   
      </div>


  










 

                  <div className={s.bottom}>
                                    
                                <Link href="/">
                                        <img
                                          src="/logo_netcoor.png"
                                          width={150}
                                          height={29}
                                          alt="Sakarya'yı seviyoruz. Sakarya için çalışıyoruz :)'"
                                          
                                        />
                                </Link>
                            
                  </div>

      {/* {test_manager && <div style={{backgroundColor:'AppWorkspace', fontSize:12, padding:10}}>Mobil Koordinasyon</div>} */}

      {/* {test_boss && <div ><RiFileTextLine/><Link href="#">Harcamalarım</Link></div>} */}

        <div className={s.upload}>        
              {/* <UploadModal props={{ upload:uploadObj[0], setupload:uploadObj[1] }}/> */}
        </div>

    </div>
  );
};
