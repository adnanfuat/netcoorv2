
import s from "./page.module.css";


import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function Home(context) {
  
// let params = await context?.params;
  
  return (
          <a href="/p"><div className={s.shell}>
                              {/* <div className="text-8xl font-bold underline bg-amber-400">Hello, Next.js!</div> */}
                              <a href="/p"><img src="logo_netcoor.png"/></a>
                              GİRİŞ

                              
          </div></a>
         );
}




