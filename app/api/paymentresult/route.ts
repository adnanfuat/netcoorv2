import { redirect } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'
import apipaymentresultfunc from "@/modules/api/apipaymentresultfunc"; 

console.log("000", 1);


export async function POST(req:NextRequest, res:NextResponse ) {       //NextRequest, res:NextResponse

     
  // let { TURKPOS_RETVAL_Siparis_ID, TURKPOS_RETVAL_Sonuc, TURKPOS_RETVAL_Islem_Tarih, TURKPOS_RETVAL_KK_No, TURKPOS_RETVAL_PB, TURKPOS_RETVAL_Tahsilat_Tutari, TURKPOS_RETVAL_Odeme_Tutari, TURKPOS_RETVAL_Taksit, } = await req?.body ?? {}; 


    // let body=await req?.body
    // body = JSON.parse(body);
    // redirect("/p/payment")
    // return NextResponse.redirect("https://localhost:3003/p/payment")

    try {
  
          console.log("geldimmm", req?.method);
          
          let data = await apipaymentresultfunc({req});
          if (data?.status==200)
          {                
                console.log("gidiyom::::", data?.result );                
                return NextResponse.redirect(data?.result, {
                  // headers: { Authorization: `Bearer ${"token"}` },
                  status:303
                });                
          }
          else
          {
                // return "aaaa"
                return NextResponse.redirect("https://www.netcoor.com")
          }

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








export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
}