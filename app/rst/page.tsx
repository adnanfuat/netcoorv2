
import Link from "next/link";
import s from "./page.module.css";


import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin', "latin-ext"], variable:"--font-inter" }) ; // weight:["100", "200", '300', "400", '500', "600","700", "800", "900"],

export default async function Home(context) {
  
//   let params = await context?.params;
  


  return (
    <div className={s.shell}>

            
                  <Link href="/p/payment">ÖDEME BAŞARILI</Link>
                  
                      
    </div>
  );
}




