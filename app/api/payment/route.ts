import perfectqueryv2_clerk from "@/modules/functions/perfectqueryv2_clerk";
import { currentUser } from "@clerk/nextjs/server";
import * as jose from 'jose'
import { type NextRequest, NextResponse } from 'next/server'
import apipaymentfunc from "../../../modules/api/apipaymentfunc"




export async function POST(req:NextRequest, res:NextResponse) {
  try {


    //console.log("aaaaaaaaaaa_r___ 0 ", req);
    let returndata = await apipaymentfunc({req,res});
    
    let result=returndata?.result;
    let status=returndata?.status;
    //console.log("aaaaaaaaaaa_r___ 1111___111", result[0]);

      return NextResponse.json( { result,
                                  status }
                              );


  } catch (error) {

    console.log("erroooor:", error);
  }

}


