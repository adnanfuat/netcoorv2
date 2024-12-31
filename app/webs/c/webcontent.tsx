"use client"
import CoreContent_Next15 from  "@/modules/common/contentv2_next15/corecontent_next15";
import {_userState} from "@/modules/constants/user"
import 'react-tabs/style/react-tabs.css';
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { langConverter } from '@/modules/constants/langconverter';
import { useState } from 'react';
import { useSearchParams,useRouter } from "next/navigation";


const WebContent_Next15 = (props) => {

        let {userdata} = props;
        let locale="tr";
    
        const searchParams = useSearchParams();
        const content_id = searchParams.get('id');
        const domain = searchParams.get('domain');
    
        const navigatonLevelObj = useState(); // deep, peak... // İleri geri butonları hangi saeviyedeki kategoriden tarama yapılacak...
        let  editUrlPrefix = "webs/c";
        let  listingUrlPrefix = "webs";
        let  tab = "webs";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
        let  subtab = "contents";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için      
    
      const filtered_categoriesFunc = ({value}) => { _userState.web_contents_filtered_categories  =value; }

      const queryClient = useQueryClient();
      let router = useRouter();
      
      // return JSON.stringify("contentData")
      let fetcher_WebContent_Backend = async () => {       
                                                      let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"webcontent_backend_next15",domain, id:content_id, level:navigatonLevelObj[0]} }) } ); 
                                                      let datajson =  await res?.json();   
                                                      // console.log("datajsondatajson1:", datajson);                                                             
                                                      // datajson = datajson?.fetcheddata;     
                                                      return datajson;                                                      
                                                  }
                  
        const { data:contentData, isLoading } = useQuery({queryKey:["webcontent_backend_next15", content_id, navigatonLevelObj[0]], queryFn:() => fetcher_WebContent_Backend()}); // { enabled:(!!userdata && !!domain) }
        const addContentButtonState = useState(true); // Ekleme butonları ekleme esnasında disable yapmak için..
        let fetcher_ContentsInTheSameCategory_Backend = async ({parentskeys}) => {  // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.     

        let res = await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"webcontentsinthesamecategory_backend", domain, parentskeys} }) } );            
        let datajson =  await res?.json();      
        // console.log("datajsondatajso1n", datajson);
        return datajson;
  }

  // return JSON.stringify(contentData)
   
  const fetcher_webcategories = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"web_categories_next15", domain } }) } ); res =  await res?.json(); return res; };
    
  let { data:categories } = useQuery( {queryKey:["web_categories_next15" ], queryFn:() => fetcher_webcategories()} 
                                                                                                                // {                                                          
                                                                                                                //     enabled:!!userdata?.email,
                                                                                                                //     refetchOnWindowFocus:false,  
                                                                                                                //     refetchOnReconnect: false,
                                                                                                                //     retry: false,
                                                                                                                //     staleTime: 6000,
                                                                                                                // }
                                    );
                                    
       
    const updateWebContent =async ({values})=>{                                                 
                                                    let res= await fetch(process.env.NEXT_PUBLIC_API_URL, {
                                                          method: "POST",
                                                          headers: { "Content-Type": "application/json",  "authorization": `Bearer ${userdata?.user?.accessToken}` },
                                                          body: JSON.stringify({ query: WebContentMutation_Update, variables: {data:{ values, domain}},}),
                                                          }                                                                        
                                                                      );                                                                      
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
                                                      queryClient.invalidateQueries();
                                                      addContentButtonState[1](true);    
                                                      router.push(`/webs/c?domain=${domain}&id=${datajson?.id}`);                                                          
                                                      return datajson;

                                                                       }
                                                                   
                                                                                                                                  
    const routeChangerFunc = ({value}) =>          {                                                                                                                                                  
                                                        _userState.myaccount_contents_filtered_categories = value;              
                                                        router.push(`/${listingUrlPrefix}?subtab=${subtab}&p=${value?.join(",")}`, undefined, { shallow: true });
                                                   }  
  
                                                            
               
      let {  text:web_content_editing }   =  langConverter({locale, keyword:"web_content_editing"});
      
        
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

    
  return (
    <div>
        {contentData ? <CoreContent_Next15 {...props}/>:                             
                                          isLoading ? <div> Yükleniyor </div> : <div> <Link href={"/webs"} >Böyle bir içerik yok!</Link> </div>                                                                                          
                                      }
    </div>
  )
}

export default WebContent_Next15
