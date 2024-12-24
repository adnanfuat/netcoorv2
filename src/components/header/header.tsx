"use client"
import s from "./header.module.css"; 

import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import Login from "../login";
import { ClerkProvider } from "@clerk/nextjs";


export const Header = ({props}) => {

  return (
    <div className={s.shell}> 

            <div className={`${s.logo_big} ${s.logo}`}> <Link href="/">
                        <Image
                              src={"/logo_desktop.png"}
                              width={220}
                              height={35}
                              priority={true}
                              unoptimized 
                              alt="Sakarya'yı seviyoruz. Sakarya için çalışıyoruz.'"                        
                              style={{ maxWidth: "100%", height: "auto" }}
                        />
                        {/* <img src={"/images/common/logo.png"} width={200} height={24}/> */}                        
               </Link>

               {/* {interactionValtio?.interaction && <Dynamic_Jingle/>} */}
              </div>

            <div className={`${s.logo_small} ${s.logo}`}><Link href="/">
                      <Image src="/logo_mobile.png" 
                            width={66} 
                            height={45} 
                            priority={true}  
                            unoptimized                      
                            alt="Sakarya'yı seviyoruz. Sakarya için çalışıyoruz.'" 
                      />
                      </Link> 
                              {/* {interactionValtio?.interaction && <Dynamic_Jingle/>}  */}
                              </div>

                              <ClerkProvider>      
                                      <Login/>
                              </ClerkProvider>  

                                    
                                    {/* <Link href="api/auth/signin">Giriş Yap</Link> */}
                            <Menu/>

                              
    </div>
  );
}








