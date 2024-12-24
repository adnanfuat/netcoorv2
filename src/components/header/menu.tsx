"use client";
import dynamic from 'next/dynamic'

import s from "./menu.module.css"; 
// import { useDetectClickOutside } from 'react-detect-click-outside';
import { RiMenuLine } from "react-icons/ri";

import { useEffect, useRef, useState } from "react";
import {interactionProxy} from "@/modules/constants/interaction";
import { useSnapshot } from 'valtio';
import Link from 'next/link';

// Sticky kaynak: https://css-tricks.com/how-to-create-a-shrinking-header-on-scroll-without-javascript/
// const Dynamic_Login = dynamic(() => import("@/components/commonnew/login").then(comp=>comp.Login), { loading: () => <div></div> });
// const Dynamic_Jingle = dynamic(() => import("@/components/commonnew/jingle").then(comp=>comp.Jingle));

const Dynamic_DesktopMenu = dynamic(() => import("./menu_desktop").then(comp=>comp.default), { loading: () => <div>~</div> });
const Dynamic_MobilMenu = dynamic(() => import("./menu_mobile").then(comp=>comp.default), { loading: () => <div>~</div> });


export default function Menu()
{
 
      let interactionValtio = useSnapshot(interactionProxy);

      const [mobileIsOpen, setMobileIsOpen] = useState(false);
      const [desktopIsOpen, setDesktopIsOpen] = useState(false);
      function closeMobileMenu() {  setMobileIsOpen(false); }
      function closeDesktopMenu() { setDesktopIsOpen(false); }
      
      // const desktopref = useDetectClickOutside({ onTriggered: ()=>closeDesktopMenu() });

      const desktopref = useRef(null);

      useEffect(() => {
        const handleOutSideClick = (event) => {
          if (!desktopref.current?.contains(event.target)) {
            // alert("Outside Clicked.");
            console.log("Outside Clicked. ");
            closeDesktopMenu()
          }
        };
    
        window.addEventListener("mousedown", handleOutSideClick);
    
        return () => {
          window.removeEventListener("mousedown", handleOutSideClick);
        };
      }, [desktopref]);

      

    return <div>
                                    {/* ref={desktopref} */}
                            <div className={`${s.desktopmenuwr}`} ref={desktopref} >
                                          <div className={`${s.sakarya}`}><Link href="/rg/sakarya"  title="Sakarya burada, siz neredesiniz?">SAKARYA</Link></div>
                                          { (desktopIsOpen) && <Dynamic_DesktopMenu props={{closeDesktopMenu}}/> }
                                          {/* <div className={`${s.admin}`}> {interactionValtio.interaction && <Dynamic_Login/>}  </div>  */}
                                          <div className={`${s.menuicon}`} onClick={() => setDesktopIsOpen(old=>!old)}><RiMenuLine/></div>
                               </div>

                              <div className={`${s.mobilemenuwr}`}>
                                    <div className={`${s.sakarya}`}><Link href="/rg/sakarya"  title="Sakarya burada, siz neredesiniz?">SAKARYA</Link></div>
                                    {/* <div className={`${s.admin}`}> {interactionValtio.interaction && <Dynamic_Login/>}</div>           */}
                                    <div className={`${s.menuicon}`} onClick={() => setMobileIsOpen(true)}> {interactionValtio.interaction && <RiMenuLine/>} </div> 
                              </div>

                              { (mobileIsOpen) && <Dynamic_MobilMenu props={{closeMobileMenu}}/> }


            </div>
    
}