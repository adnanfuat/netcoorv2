// import type { Metadata } from "next";
"use server"

import "./globals.css";
// import { Header } from "@/src/components/header/header";
// import { TanstackProvider } from "@/modules/functions/tanstackprovider";
// import { isloggedv4_clerk } from "@/modules/functions/isloggedv4_clerk";
// import { ClerkProvider } from "@clerk/nextjs";
// import { LayoutMain } from "./layoutmain";

import { Geist, Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
}>) 
{

  // let userdata = await isloggedv4_clerk();
  //props.params.userdata = userdata;
  //console.log("propsprops:", props);
  // const localization = {
  //   socialButtonsBlockButton: 'Sign In with11 {{provider|titleize}}',
  // }



   
  return (<html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>                       
                              {props?.children}                                           
            </body>
    </html>   
  );
}


// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) 