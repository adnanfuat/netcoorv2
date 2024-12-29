// import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/header/header";
import { TanstackProvider } from "@/modules/functions/tanstackprovider";
import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutMain } from "./layoutmain";


 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   let userdata = undefined; //await isloggedv4_clerk();
  return (<ClerkProvider>
                <LayoutMain userdata={userdata}>
                  <TanstackProvider>
                    {children}
                  </TanstackProvider>
                </LayoutMain>
            </ClerkProvider>                    
  );
}
