
// import apipaymentresultfunc from '@/modules/api/apipaymentresultfunc';
import { type NextRequest, NextResponse } from 'next/server'
//import apipaymentresultfunc from "@/modules/api/apipaymentresultfunc"; 

console.log("000",1);  

export async function POST(req:NextRequest, res:NextResponse) {      
  // const { messages } = await req.json()
  console.log("saaaaaaaaaaaaaa",1);  

    try {
  
          console.log("geldimmm");
          //let data = await apipaymentresultfunc({req});          
          return NextResponse.json( 
                                            { 
                                                result:"///", //data?.result, //data?.result
                                                status:200,                                   // data?.status
                                            }
                                  );

        } catch (error) {
          console.log("errorrrrrrrrrrr", error)

        }


}











// export async function POST(req:Request) {
//   // const { messages } = await req.json()
   
//   console.log("saaaaaaaaaaaaaa",1);
//     try {
  
//     console.log("geldimmm");

//      //let data = await apipaymentresultfunc({req});
     
//     // return NextResponse.json( 
//     //                            { 
//     //                               result:data?.result, //data?.result
//     //                               status:200,                                   // data?.status
//     //                            }
//     //                          );

//   } catch (error) {
//     console.log("errorrrrrrrrrrr", error)

//   }


// }







