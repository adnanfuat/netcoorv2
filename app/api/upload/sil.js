import { GraphQLClient } from "graphql-request";
import nextConnect from 'next-connect';
import { FileMutation_Insert } from '@/__queries/global/file/filemutation_insert'
const multer = require('multer')
const multerS3 = require('multer-s3')
import {fileNameSlugify} from "@/components/utilsnew/filenameslugify"
import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  }
});


let s3bucket="sakaryarehberim";
let s3directory = "file/all"; 
//  Aşağıdaki kaldırdım.. Çünkü herkes artık kendi resmini görüyor zaten. Çift başlılığa gerek yok
//  s3directory= process.env.NEXT_PUBLIC_NODE_ENV=="development" ? "test" : s3directory;  // local modedda çalışıyorsak veriler teste gitsin.. öteki türlü gerçek verilerin arasına dosya atıyoruz..


const upload = multer({
  // storage: multer.diskStorage({
  //   destination: './public/uploads',
  //   filename: (req, file, cb) => cb(null, file.originalname),
  // }),
  storage: multerS3({
    s3: s3Client,
    bucket: s3bucket,
    acl: 'public-read',        
    key: async function (request, file, cb) {
                
                let headers=request?.headers;
                let user_email=headers?.user_email;
                let accesstoken=headers?.accesstoken;
                let file_originalname= Buffer.from(file.originalname, 'latin1').toString('utf8'); // Multer dosya ismindeki utf-8'i bozuyor.
                // console.log("user_emailuser_emailuser_email: ", file_originalname);
                let filename= file_originalname ?? "central.xxx";
                var fileprefix = filename?.split('.')?.[0];
                var suffix = filename?.split('.')?.[1]?.toLowerCase();
                // console.log('fileNameSlugify1', fileprefix)
                let {sluggedfilename} = fileNameSlugify({title:fileprefix,suffix, locale:"mix"});
                
                const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, { headers: { authorization: `Bearer ${accesstoken}` }});      //
                const data  = await graphcms?.request(FileMutation_Insert, {data:{filename:sluggedfilename, s3directory, user_email}}); 
                                
                cb(null,  `${s3directory}/${sluggedfilename}`);
                
    }
  })
});


const apiRoute = nextConnect({
  
  onError(error, req, res) {
    //console.log("onError ")
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    //console.log("not allowed ");
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },

});

apiRoute.use(upload.array('theFiles'));


apiRoute.post(async (req, res) => {

  
  if (res.statusCode==200) {
         console.log("tamam bu iş: ", req);
        res.status(200).json({ data: 'success' })//.then(result=>{ console.log("result::: ", result)});        
      }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};