// import type { Metadata } from "next";
import { trTR } from '@clerk/localizations'

import { Geist, Geist_Mono } from "next/font/google";

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

  // const localization = {
  //   socialButtonsBlockButton: 'Sign In with11 {{provider|titleize}}',
  // }
   
  return (<ClerkProvider>
                          <TanstackProvider>
                                      <LayoutMain userdata={userdata}>                                                
                                                              {props?.children}
                                      </LayoutMain>
                          </TanstackProvider>                                      
          </ClerkProvider>     
      );
}


// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) 