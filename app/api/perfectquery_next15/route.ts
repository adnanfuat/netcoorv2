import perfectqueryv2_clerk from "@/modules/functions/perfectqueryv2_clerk";
import { currentUser } from "@clerk/nextjs/server";
import * as jose from 'jose'
import { type NextRequest } from 'next/server'
import { NextResponse } from "next/server";


export async function POST(req:NextRequest) {

  try {
    
      let body = await req.json();    
      let data = body?.data ?? {};
      

      let clerkuser = await currentUser();
      let emailAddresses = clerkuser?.emailAddresses ?? [];
      let emailAddressObj=emailAddresses[0];
      let emailAddress=emailAddressObj?.emailAddress;
      const secret = new TextEncoder().encode( process.env.JWT_SECRET, );        
      const jwt = await new jose.SignJWT({ 'urn:example:claim': true, payload:{email:emailAddress} })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .sign(secret)
            
    let result = await perfectqueryv2_clerk({data, session:{user:{accessToken:jwt}}, undefinedreturn:data?.undefinedreturn ?? []});                   
    data?.type=="sectorsandsubsectors_next15" && console.log("perfectquery_next15:______ ", result,  data?.type);
    
    // console.log("perfectquery_next15:______ ", result,  data?.type);

      return NextResponse.json(
                                  result,
                                  { status: 200 }
                              );


  } catch (error) {

  }

}


