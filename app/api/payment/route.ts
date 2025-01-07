import perfectqueryv2_clerk from "@/modules/functions/perfectqueryv2_clerk";
import { currentUser } from "@clerk/nextjs/server";
import * as jose from 'jose'
import { type NextRequest, NextResponse } from 'next/server'
import apipaymentfunc from "../../../modules/api/apipaymentfunc"


export async function POST(req:NextRequest, res:NextResponse) {
  try {
    
    // let bodyaaa = await req.json();    
    //console.log("11111::::::::::__________",req?.body);
    //  let bodyaaa = await req.json();    

    // let data = body?.data ?? {};
    // const {body, query} = req; //,method  
    // let data = body?.data ?? {};
    
    //   let clerkuser = await currentUser();
    //   let emailAddresses = clerkuser?.emailAddresses ?? [];
    //   let emailAddressObj=emailAddresses[0];
    //   let emailAddress=emailAddressObj?.emailAddress;
    //   const secret = new TextEncoder().encode( process.env.JWT_SECRET, );        
    //   const jwt = await new jose.SignJWT({ 'urn:example:claim': true, payload:{email:emailAddress} })
    //     .setProtectedHeader({ alg: 'HS256' })
    //     .setIssuedAt()
    //     .setIssuer('urn:example:issuer')
    //     .setAudience('urn:example:audience')
    //     .setExpirationTime('2h')
    //     .sign(secret)
            
    // let result = await perfectqueryv2_clerk({data, session:{user:{accessToken:jwt}}, undefinedreturn:[]});                   
    // data?.type=="sectorsandsubsectors_next15" && console.log("perfectquery_next15:______ ", result,  data?.type);

    //console.log("aaaaaaaaaaa_r___ 0 ", req);
    let returndata = await apipaymentfunc({req,res});

    
    let result=returndata?.result;
    let status=returndata?.status;
    //console.log("aaaaaaaaaaa_r___ 1111___111", result[0]);

      return NextResponse.json( { result,
                                  status }
                              );


  } catch (error) {

  }

}


