import 'react-tabs/style/react-tabs.css';
import {useQuery, useQueryClient } from "react-query";
import CoreContent from  "@/modules/common/contentv2/corecontent";
// import fetcher_contentsinthesamecategory_backend_hook from  "@/components/commonnew/contentv2/fetcher_contentsinthesamecategory_backend_hook";
import { gql } from "graphql-request"; 
import { _userState } from "@/modules/constants/user";
import { useRouter } from 'next/router';
// import s from "./core.module.css";
import { isLogged } from '@/components/hooksnew/islogged';
import { LayoutMain } from '@/layouts/console/layoutmain';
import { langConverter } from '@/modules/constants/langconverter';
import Link from 'next/link';
import { useState } from 'react';


const  ContentModule = (props) =>{

      const router = useRouter();   
      let isloggeddata  =  isLogged();  
      const {locale, defaultLocale, query:{slug}}= router;
      let [selecteduser, content_id] = slug ?? [];      
                  
      let editUrlPrefix="mycontent";
      let listingUrlPrefix="myaccount";
      let tab="contents";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
      let subtab="x";  // x:önemsiz bir değer. Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için.. MyAccount > Content için gerek yok. Zaten content en üst seviyede...

      
                  
      const filtered_categoriesFunc = ({value}) => { console.log("zxcxzxcxzccxzcxz", value);  _userState.myaccount_contents_filtered_categories  =value; }

      let fetchUser= async () => {                                                                            
        let res= await fetch(`/api/user?a=${selecteduser}`);            
        let datajson =  await res?.json();                                                                    
        return datajson;
                                       }        
        const { isLoading, data:myaccount } = useQuery( ["userquery", isloggeddata], () => fetchUser() ,               
                                                              {                                                          
                                                                    enabled:(!!isloggeddata && !!selecteduser),
                                                                    refetchOnWindowFocus:true
                                                              }
                    );        
                                   

      const queryClient = useQueryClient();


      const fetcher_myaccountcategories = async () => { let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_categories", email:selecteduser } }) } ); res =  await res?.json(); return res; };

      let { data:categories } = useQuery( ["myaccount_categories", selecteduser ], () => fetcher_myaccountcategories() ,
                            {                                                          
                                enabled:!!selecteduser,
                                refetchOnWindowFocus:false,  
                                refetchOnReconnect: false,
                                retry: false,
                                staleTime: 6000,
                            }
                  ); 




      let fetcher_Myaccount_Content_Backend = async () => {       

                                                          // web sitesinin vierleri için yapmıştım bu bölümü. Web sitesinde çok yoğun bir içerik çekiyordu. Proweb referansların olduğu yer... Burada yoğun bir veri çekişi olmayacak...
                                                          // Geçici olarak aşağıyı bıraktım. Veri yoğunluğu artarsa apilere kaydırırız çekişleri.
                                                          // Şimdilik yukarıdan okuyorum...
                                                          // return contents?.find(a=>a.id==content_id)

                                                          let res= await fetch(`/api/myaccount_content_backend`, { method: "POST", body: JSON.stringify({ data:{selecteduser, id:content_id} }) } );            
                                                          let datajson =  await res?.json();
                                                          datajson = datajson?.fetcheddata;
                                                          queryClient.invalidateQueries();

                                                          return datajson;                                                              
                                                   }


      //  let {} fetcher_contentsinthesamecategory_backend_hook                                                   
                    
      const { data:contentData } = useQuery( ["contentdata", content_id], () => fetcher_Myaccount_Content_Backend() ,               
                                                                        {                                                          
                                                                              enabled:(!!isloggeddata && !!selecteduser),
                                                                              refetchOnWindowFocus:true
                                                                        }                               
                                           );         

     const addContentButtonState = useState(true);   // Ekleme butonları ekleme esnasında disable yapmak için..


     let fetcher_ContentsInTheSameCategory_Backend = async ({parentskeys}) => {  // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.     
      
                                                                        console.log("parentskeysparentskeys: ",parentskeys);
                                                                        let res= await fetch(`/api/myaccount_contentsinthesamecategory_backend`, { method: "POST", body: JSON.stringify({ data:{email:selecteduser, parentskeys} }) } );            
                                                                        let datajson =  await res?.json();   
                                                                        datajson = datajson?.fetcheddata;                                                                                                                                                          
                                                                        return datajson;     
                                                                      }





      const updateMyContent =async ({values})=>{                                                 
                                                        
                                                        // console.log("dsasasadsdsadsad ",  {...values.content, selecteduser});

                                                        let res= await fetch(`/api/myaccount_savecontent`, { method: "POST", body: JSON.stringify({ data: { content:values.content, selecteduser }}), } );  
                                                        let datajson =  await res?.json();   
                                                        datajson = datajson?.fetcheddata;     
                                                        queryClient.invalidateQueries();                                                                                                                
                          
                                                        return datajson
                                                        
                                                };    






      let myaccountAddContent= async ({willSendParents}) => {       

                                                      addContentButtonState[1](false);                                                                                    
                                                      let res= await fetch(`/api/myaccount_addcontent`,
                                                      {
                                                        method: "POST",      
                                                        // headers: { "Content-Type": "application/json", "authorization": `Bearer ${session?.user?.accessToken}` },
                                                        body: JSON.stringify({                                                          
                                                          data:{selecteduser, willSendParents}
                                                        }),
                                                      }                                                  
                                                      );            
                                                      let datajson =  await res?.json();   
                                                      datajson = datajson?.fetcheddata;
                                                          
                                                      queryClient.invalidateQueries()                                                      
                                                      addContentButtonState[1](true);    
                                                      router.push(`/mycontent/${selecteduser}/${datajson?.id}`)                                                      
                                                          
                                                      return datajson;
    
                                                                         }
                                                                     
                                                                         
        const routeChangerFunc = ({value}) =>  {                                                                                                                                                  
          
                                              _userState.myaccount_contents_filtered_categories= value;              
                                              router.push(`/${listingUrlPrefix}?tab=${tab}&p=${value?.join(",")}`, undefined, { shallow: true });
                                    }        
         
        let {  text:myaccount_content_editing  }   =  langConverter({locale, keyword:"myaccount_content_editing"});
          
        const BackToContents = ()  => <Link href={`/${listingUrlPrefix}?tab=${tab}`}  style={{fontWeight:"bold"}}> {myaccount?.slug_tr} </Link>

        let {content, relatedcontents, indexOfThisContentOnLastParent, afterContent, beforeContent} = contentData ?? {}
          
                    
          props = {
                  // domain:web?.slug_tr,
                  content,
                  isLoading:false,  // Şimdilik false yaptım...
                  // contents,
                  categories,
                  BackToContents,      // Tüm İçeriklere geri dönme komponenti
                  updateContentFunc:updateMyContent,   // 
                  indexOfThisContentOnLastParent, // Bu içerin breadcrrumbı (parentsları) arasında, bu içeriğin kaçıncı index'te olduğu. İleri geri butonları buna göre çalışacak...
                  relatedcontents,
                  afterContent,
                  beforeContent,
                  addContentFunc:myaccountAddContent, // Sağ üstteki ekle butonundan ekleme yapmak için...
                  addContentButtonState, // Ekleme butonlarının disabled durumlarını kontrol için state...                  
                  filtered_categoriesFunc,
                  fetcher_ContentsInTheSameCategory_Backend, // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.      
                  routeChangerFunc, // Breadcrumbtaki linklere tıkladığımda vatliod'daki 
                  listingUrlPrefix, // webs, myaccount gibi ana url prefixleri.. Breadcrumbtan geri dönerken lazım olacak
                  tab, 
                  subtab, 
                  editUrlPrefix, // İleri geri butonları için lazım...
      }



      //  return(<div>{JSON.stringify(contentData)}</div>)
            
          return ( <LayoutMain layout_title={myaccount_content_editing} suptitle={content?.title_tr}>                         
                            <CoreContent {...props}/>
                    </LayoutMain>
                 )
}




export default ContentModule




const SwissArmyKnifeQuery = gql
`  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {
      id
      title_tr    
      slug_tr  
      o_key_1
      o_key_2
      i_key_1
      createdat
    }
  }`
;



const WebContentMutation_Update = gql
`  mutation WebContentMutation_Update ($data:JSON)  {
    webcontentmutation_update (data:$data) {
          id                       
    }
  }`
;

