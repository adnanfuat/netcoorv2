
 import apipaymentresultfunc from '@/modules/api/apipaymentresultfunc';
import { type NextRequest, NextResponse } from 'next/server'



 
export async function POST(req: Request) {
  const { messages } = await req.json()
   
  console.log("saaaaaaaaaaaaaa",1);
  
}

// export async function GET(req:NextRequest, res:NextResponse) {
  
//   try {
  
//     console.log("geldimmm");

//     // const searchParams = req.nextUrl.searchParams
//     // const query = searchParams.get('domain')

//     // console.log("reqqqqqqqqqq", query);

//     // let body = await req.json();    
//     // let data = body?.data ?? {};

//     // console.log("data::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", data)
//     // const {body, query} = req; //,method  
//     // let { domain, project_type, module_type, method } = data ?? {}

//     let result = await apipaymentresultfunc({req,res});
            
//     return NextResponse.json( 
//                                { 
//                                   result:undefined,
//                                   status:undefined,                                  
//                                }
//                              );

//   } catch (error) {

//   }

// }


