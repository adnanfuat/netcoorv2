import perfectmutationv2_clerk from "@/modules/functions/perfectmutationv2_clerk";
let s3directory = "file/all"; 
import { currentUser } from "@clerk/nextjs/server";
import convertemail2jwt from "../../../modules/functions/convertemail2jwt";
import filenameslugify from "../../../modules/functions/filenameslugify"

// app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// https://fra1.digitaloceanspaces.com
const Bucket = "sakaryarehberim";
const s3 = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  }
});




// endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

// endpoint to upload a file to the bucket
export async function POST(request) {
  const formData = await request.formData();

  console.log("formData:::1", formData);

  const files = formData.getAll("theFiles");
  
  console.log("formData:::1", files[0]);

  const response = await Promise.all(
    files.map(async (file) => {
      // not sure why I have to override the types here
      const Body = (await file.arrayBuffer());      
      console.log("formData:::2", Bucket, file.name, Body);      
          

      let clerkuser = await currentUser();
      let emailAddresses = clerkuser?.emailAddresses ?? [];
      let emailAddressObj=emailAddresses[0];
      let emailAddress=emailAddressObj?.emailAddress;
      let jwt = await convertemail2jwt({email:emailAddress});
        

                      let filename= file.name ?? "central.xxx";
                      var fileprefix = filename?.split('.')?.[0];
                      var suffix = filename?.split('.')?.[1]?.toLowerCase();
                      // console.log('fileNameSlugify1', fileprefix)
                      let {sluggedfilename} = filenameslugify({title:fileprefix,suffix, locale:"mix"});

                      s3.send(new PutObjectCommand({ Bucket, Key: `${s3directory}/${sluggedfilename}`, Body, ACL:"public-read" }));

    let senddata = {
                      type:"fileinsert",                       
                      filename:sluggedfilename, 
                      s3directory, 
                      user_email:emailAddress
                      // parent_slug:process.env.NEXT_PUBLIC_PROJECT,    
                   } 
     
     perfectmutationv2_clerk({data:senddata, session:{user:{accessToken:jwt}}, undefinedreturn:{}});


    })
  );

  console.log("formData:::", response);

  return NextResponse.json(response);
}



// const s3Client = new S3({
//   endpoint: "https://fra1.digitaloceanspaces.com",
//   region: "us-east-1",
//                                         credentials: {
//                                                                 accessKeyId: process.env.SPACES_KEY,
//                                                                 secretAccessKey: process.env.SPACES_SECRET
//                                                      }
//                         });

// let s3bucket="sakaryarehberim";
