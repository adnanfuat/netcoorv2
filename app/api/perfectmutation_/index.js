

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import perfectmutation from "../../../modules/functions/perfectmutation"


export default async function handler(req, res) {

  try {
        
    let body = await JSON.parse(req?.body);
    let data = body?.data ?? {};
    const session = await getServerSession(req, res, authOptions);    
    // if (!session) { console.log("Mutate Cancelled"); res.status(500).json({ xxx: null }) }; // Bunu kapatmazsam nextauthtan giden çağrılar başarılı olmuyor
    // console.log("asddddddddddddddd");
    let result = await perfectmutation({data, session });
    //  console.log("asddddddddddddddd111", data?.datakey);
    res.status(200).json(result);


  } catch (error) {

  }

}


