import { LayoutContents } from '@/layouts/console/layoutcontents';
import {useFormik} from 'formik';
import {useQuery, useQueryClient} from "react-query";
import {useRouter } from 'next/router';
import s from "./index_core.module.css"
import { News_V2_Admin } from "@/components/commonnew/content/contents/news_v2_admin";
import { contentsAuthorizedClientMode_V2 } from "@/components/hooksnew/contentsauthorizedclientmode_v2";
import { permissionsControl } from "@/components/hooksnew/permissionscontrol";
import { useState } from "react";
import {_userState} from "@/modules/constants/user";
import { isLogged } from '@/components/hooksnew/islogged';


export default function  Contents () {

const router = useRouter();    
const {locale, defaultLocale, query:{id}}= router;    

const projectStateObj = useState("sakaryarehberim.com")

const queryClient = useQueryClient();  

let isloggeddata=isLogged()

let user=isloggeddata?.user;

const {articlesclient, isLoading } = contentsAuthorizedClientMode_V2({isloggeddata, whichPermissions:["article_edit", "article_add"], project:projectStateObj[0]});            

const fetcher_countries =async ()=> { let res= await fetch("/api/countries");  res = await res.json(); return res?.countries }
const {  data:countries } = useQuery( ["fetcher_countries"], () => fetcher_countries() );      



let article_edit_authority=permissionsControl({askList:["article_edit"], type:"some"}); // parça yetkilere göre hareket etmek için sorgulama___ // slug değişimi hassas konu___

   
   const formik = useFormik({
                            enableReinitialize: true,
                            initialValues: { articles:articlesclient },
                            onSubmit: (values, {setSubmitting}) => {  },
                          });   

let articles=formik?.values?.articles;

// return JSON.stringify(articles)
  
  return ( <LayoutContents layout_title="Haberler" projectStateObj={projectStateObj}>

                      {
                         (isLoading) ? ( <div className={s.shell}>Yükleniyor...!!!</div> )

                         :  (<div className={s.shell}>
                          {articles?.length>0 && <News_V2_Admin props={{locale, relatedcontents:articles, countries, article_edit_authority}}/>}
    
                          {(!(articles?.length>0) && !isLoading) && <div className={s.asdasdasdds}> Görüntüleme yetkiniz olan bir haber bulunmamaktadır. </div> }
                                              
                          </div>)                      
                      }                      
                  </LayoutContents> );

}







  
  