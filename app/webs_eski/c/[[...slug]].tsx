import 'react-tabs/style/react-tabs.css';
import Link from "next/link"
import {useQuery, useQueryClient } from "react-query";
import CoreContent from  "@/modules/common/contentv2/corecontent";
import { gql } from "graphql-request"; 
import { _userState } from "@/modules/constants/user";
import { useRouter } from 'next/router';
import { isLogged } from '@/components/hooksnew/islogged';
import { LayoutMain } from '@/layouts/console/layoutmain';
import { langConverter } from '@/modules/constants/langconverter';
import { useState } from 'react';

const  ContentModule = (props) =>{

      const router = useRouter();   
      let isloggeddata  =  isLogged();  
      const {locale, defaultLocale, query:{slug, p}}= router;      
      
      let [domain, content_id] = slug ?? [];      
      
      const navigatonLevelObj = useState(); // deep, peak... // İleri geri butonları hangi saeviyedeki kategoriden tarama yapılacak...

      let editUrlPrefix="webs/c";
      let listingUrlPrefix="webs";
      let tab="webs";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
      let subtab="contents";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için      
                  
      const filtered_categoriesFunc = ({value}) => { _userState.web_contents_filtered_categories  =value; }
      const queryClient = useQueryClient()

      let fetcher_WebContent_Backend = async () => {       
                                                      let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{type:"webcontent_backend",domain, id:content_id, level:navigatonLevelObj[0]} }) } );            
                                                      let datajson =  await res?.json();   
                                                      // console.log("datajsondatajson1:", datajson);                                                             
                                                      // datajson = datajson?.fetcheddata;     
                                                      return datajson;                                                      
                                                   }
                    
     const { data:contentData, isLoading } = useQuery( ["webcontent_backend", content_id, navigatonLevelObj[0]], () => fetcher_WebContent_Backend() , { enabled:(!!isloggeddata && !!domain) } );
     const addContentButtonState = useState(true); // Ekleme butonları ekleme esnasında disable yapmak için..
     let fetcher_ContentsInTheSameCategory_Backend = async ({parentskeys}) => {  // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.     

     let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{type:"webcontentsinthesamecategory_backend", domain, parentskeys} }) } );            
     let datajson =  await res?.json();      
      // console.log("datajsondatajso1n", datajson);
     return datajson;
  }
  // return JSON.stringify(contentData)
  const fetcher_webcategories = async () => { let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{ type:"web_categories", domain } }) } ); res =  await res?.json(); return res; };

  let { data:categories } = useQuery( ["web_categories" ], () => fetcher_webcategories() ,
                        {                                                          
                            enabled:!!isloggeddata?.email,
                            refetchOnWindowFocus:false,  
                            refetchOnReconnect: false,
                            retry: false,
                            staleTime: 6000,
                        }
              );   

  
      const updateWebContent =async ({values})=>{                                                 
                                                      let res= await fetch(process.env.NEXT_PUBLIC_API_URL, {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json",  "authorization": `Bearer ${isloggeddata?.user?.accessToken}` },
                                                            body: JSON.stringify({ query: WebContentMutation_Update, variables: {data:{ values, domain}},}),
                                                            }                                                                        
                                                                        ) ;
                                                                        
                                                            let datajson =  await res.json();                                                                                                                          
                                                            return datajson?.data;                                                                                                                                    
                                                };    

      let webAddContent= async ({willSendParents}) => {       

                                                      addContentButtonState[1](false);
                                                                                    
                                                        let res= await fetch(`/api/web_addcontent`,
                                                        {
                                                          method: "POST",      
                                                          // headers: { "Content-Type": "application/json", "authorization": `Bearer ${session?.user?.accessToken}` },
                                                          body: JSON.stringify({
                                                            // query: SwissArmyKnifeMutation,
                                                            data:{domain, willSendParents}
                                                          }),
                                                        }                                                  
                                                        );            
                                                        let datajson =  await res?.json();   
                                                        datajson = datajson?.fetcheddata;
      
                                                        //  console.log("datajsondatajson: ", datajson);                                                                 
                                                        queryClient.invalidateQueries()                                                      
                                                        addContentButtonState[1](true);    
                                                        router.push(`/webs/c/${domain}/${datajson?.id}`)                                                      
                                                            
                                                        return datajson;
    
                                                                         }
                                                                     
                                                                         
      const routeChangerFunc = ({value}) =>       {                                                                                                                                                  
                                                                          _userState.myaccount_contents_filtered_categories= value;              
                                                                          router.push(`/${listingUrlPrefix}?subtab=${subtab}&p=${value?.join(",")}`, undefined, { shallow: true });
                                                              }  


                 
        let {  text:web_content_editing  }   =  langConverter({locale, keyword:"web_content_editing"});
          
        const BackToContents = ()  => <Link href={`/webs`}  style={{fontWeight:"bold"}}> {domain} </Link>

        let {content, relatedcontents, indexOfThisContentOnLastParent, afterContent, beforeContent} = contentData ?? {}
          
                    
          props = {
                  // domain:web?.slug_tr,
                  content,
                  isLoading, 
                  // contents,
                  categories,
                  BackToContents,      // Tüm İçeriklere geri dönme komponenti
                  updateContentFunc:updateWebContent,   // 
                  indexOfThisContentOnLastParent, // Bu içerin breadcrrumbı (parentsları) arasında, bu içeriğin kaçıncı index'te olduğu. İleri geri butonları buna göre çalışacak...
                  relatedcontents,
                  afterContent,
                  beforeContent,
                  addContentFunc:webAddContent, // Sağ üstteki ekle butonundan ekleme yapmak için...
                  addContentButtonState, // Ekleme butonlarının disabled durumlarını kontrol için state...                  
                  filtered_categoriesFunc,
                  fetcher_ContentsInTheSameCategory_Backend, // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.      
                  editUrlPrefix, // İleri geri butonlarında kullanılıyor...
                  listingUrlPrefix, // Sağ üstteki breadcrumta kullanılıyor
                  tab, // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
                  subtab, // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
                  routeChangerFunc, //Breadcrumta kullanıyorum..
                  navigatonLevelObj,
      }
              // return JSON.stringify(contentData)
          return ( <LayoutMain layout_title={web_content_editing} suptitle={content?.title_tr}>                         
                             {contentData ? <CoreContent {...props}/>:                             
                                  isLoading ? <div> Yükleniyor </div> : <div> <Link href={"/webs"} >Böyle bir içerik yok!</Link> </div>                                                                                          
                              }
                    </LayoutMain>
                 )
}




export default ContentModule






const WebContentMutation_Update = gql
`  mutation WebContentMutation_Update ($data:JSON)  {
    webcontentmutation_update (data:$data) {
          id                       
    }
  }`
;

