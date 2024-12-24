import s from "./index.module.css";
import Link from "next/link";
import { RiUser3Fill, RiUserStarFill } from "react-icons/ri";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { isloggedv3_server } from "@/modules/functions/isloggedv3_server";


export default function Login({props}) {
        
        // const {session, user, accessToken} = isloggedv3_server();
        
        // console.log("sessionsession: ", session)
        // if (!session) { res.status(500).json({ notlogged: null }) };
  
      //   const fetcher = async () => {
                
      //                   return await fetch(process.env.NEXT_PUBLIC_API_URL, {
      //                     method: "POST",
      //                     headers: { "Content-Type": "application/json", authorization: `Bearer ${accessToken}`},
      //                     body: JSON.stringify({
      //                       query: SwissArmyKnifeQuery_Raw,
      //                       variables: { data: {type:"notifications_count"} },
      //                     }),
      //                   })
      //                     .then((res) => res.json())
      //                     .then((result) => { return  result?.data?.swissarmyknifequery; });
      //   }
   

      // const { data} = useQuery( ["notifications_count"], () => fetcher() , {refetchOnWindowFocus:true})  // daha sonra false'a çevir...
      
      // console.log("sdsa--->", data?.i_key_1);

  //**************************** (sitemap fecth) */

  // let router = useRouter();

  return (<div>
  
                        <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  
                  </div>
                  )

  // return (        
  //              !session ?  <div><Link href="/api/auth/signin" className={s.icon}> <RiUser3Fill/> </Link></div>              
              
  //             : <div className={s.icon} style={{ backgroundImage:`url(${session?.user?.image})`, backgroundSize:"cover"}}  title={session?.user?.name} > 
                                  
  //                                 {!session?.user?.image && <RiUserStarFill/> }       

  //                                 {/* {data?.i_key_1>0 && <div onClick={()=>!user && signIn()}  className={s.notifications}>{data?.i_key_1}</div>        } */}

  //                                 <div className={s.ppp}>                                    
                                                
  //                                               <Link href={`${process.env.NEXT_PUBLIC_API_CONSOLE_URL}`} target={"_blank"}>Konsol</Link>
                                                
  //                                               <a href={`${process.env.NEXT_PUBLIC_API_CONSOLE_URL}/myaccount`} target={"_blank"}>Hesabım</a>
                                                                                                
  //                                               <a href={`${process.env.NEXT_PUBLIC_API_CONSOLE_URL}/notifications`} target={"_blank"}>Bildirimler</a>

  //                                               <a href={`${process.env.NEXT_PUBLIC_API_CONSOLE_URL}/myaccount?tab=payment`} target={"_blank"}>Ödeme</a>
                                                                                                
  //                                               <a href={`${process.env.NEXT_PUBLIC_API_CONSOLE_URL}/contents`} target={"_blank"}>Haber</a>
                                                                                                                                                
  //                                               <div> <Link href="/api/auth/signout">Çıkış</Link></div>

  //                                 </div>
  //                           </div>
              
        
  //   )
}













 const SwissArmyKnifeQuery_Raw = 
`  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {
      id
      title_tr
      o_key_1
      i_key_1
      createdat
    }
  }`
;
