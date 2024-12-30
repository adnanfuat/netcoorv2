import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const jose = require('jose');
import perfectqueryv2_clerk from "@/modules/functions/perfectqueryv2_clerk"
import iscached from "@/modules/functions/iscached";
import makecached from "@/modules/functions/makecached";

export async function GET() {

  // console.log("aaaaaaaaaaaaaaaaaaaaa_______________", );
//   const {userId} = auth();
  let user = await currentUser();
  
  //console.log("useruser:____ ", user);

  let emailAddresses = user?.emailAddresses ?? [];

  let emailAddressObj=emailAddresses[0];
  let emailAddress=emailAddressObj?.emailAddress;
  //console.log("emailAddressObj::: ", emailAddress);

  // return NextResponse.json({});
  //return NextResponse.json({ emailAddressObj?.emailAddress}, { status: 401 })

  if (!user?.id) {
    return NextResponse.json({ message: "Not Authenticated" , user, id:user?.id }, { status: 401 });
  }


  const secret = new TextEncoder().encode( process.env.JWT_SECRET, );
    
  const jwt = await new jose.SignJWT({ 'urn:example:claim': true, payload:{email:emailAddress} })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(secret)

    const claims = jose.decodeJwt(jwt)
    

    let cachekey  =  `giveuserv2_${jwt}`;
    let {cached}  =  iscached({cachekey});

    let userdata=undefined;
    
    if (cached) { return cached }
    else 
    {
       userdata = await perfectqueryv2_clerk({ 
        data:{type:"giveuserv2"}, 
        session:{user:{accessToken:jwt}}, 
        undefinedreturn:undefined
                        });

                        
        makecached({cachekey, value:userdata, ttl:50000});


    }

    
                          
     try {
       // verify token       
      //  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
      //                                   issuer: 'urn:example:issuer',
      //                                   audience: 'urn:example:audience',
      //                                 });
       //  log values to console
       //  console.log(payload);
       //  console.log(protectedHeader);
       
     } catch (e) {
       // token verification failed
       console.log("Token is invalid");
     }
  
  
  // console.log("cypt::", userdata)

  return NextResponse.json(
    {
          message: "Authenticated",
          data: userdata?.id,
    },
    { status: 200 }
  );
}