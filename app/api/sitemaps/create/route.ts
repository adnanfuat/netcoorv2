
import sitemapscreatefunc from "@/modules/sitemap_scripts/sitemapscreatefunc";
import { type NextRequest } from 'next/server'

import { NextResponse } from "next/server";
// console.log("Girdim!!!!!!!!!!!!::::::::::");

export async function GET(req:NextRequest, res:NextResponse) {
  
  
    
        let result = await sitemapscreatefunc({req, res})

              return NextResponse.json(
                                  result,
                                  { status: 200 }
                              );

    

                  



}













