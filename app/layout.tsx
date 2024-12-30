// import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/header/header";
import { TanstackProvider } from "@/modules/functions/tanstackprovider";
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutMain } from "./layoutmain";


 
export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
}>) 
{

  let userdata = await isloggedv4_clerk();
  //props.params.userdata = userdata;
  //console.log("propsprops:", props);

   
  return (<ClerkProvider>
                <LayoutMain userdata={userdata}>
                  <TanstackProvider>
                    {/* {JSON.stringify(props)} */}
                    {props?.children}
                  </TanstackProvider>
                </LayoutMain>
            </ClerkProvider>                    
  );
}


// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) 