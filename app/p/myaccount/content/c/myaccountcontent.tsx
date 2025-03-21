"use client"
import CoreContent_Next15 from  "@/modules/common/contentv2_next15/corecontent_next15";
import {_userState} from "@/modules/constants/user"
import 'react-tabs/style/react-tabs.css';
import Link from "next/link";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { langConverter } from '@/modules/constants/langconverter';
import { useState } from 'react';
import { useSearchParams,useRouter } from "next/navigation";
import { giveuserv2hook_next15 } from "@/modules/functions/giveuserv2hook_next15";
import { useSnapshot } from "valtio";


const MyAccountContent_Next15 = (props) => {

        let {userdata} = props;
        let locale = useSnapshot(_userState).locale;
    
        const searchParams = useSearchParams();
        const content_id = searchParams.get('id');
        
        let editUrlPrefix="p/myaccount/content/c";
        let listingUrlPrefix="p/myaccount";
        let tab="contents";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
        let subtab="x";  // x:önemsiz bir değer. Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için.. MyAccount > Content için gerek yok. Zaten content en üst seviyede...
  
        let router=useRouter();
                    
        const filtered_categoriesFunc = ({value}) => { _userState.myaccount_contents_filtered_categories  =value; }                  
        
                                                           
        const queryClient = useQueryClient();    

      
  
        let fetcher_Myaccount_Content_Backend = async () => {       
  
                                                            // web sitesinin vierleri için yapmıştım bu bölümü. Web sitesinde çok yoğun bir içerik çekiyordu. Proweb referansların olduğu yer... Burada yoğun bir veri çekişi olmayacak...
                                                            // Geçici olarak aşağıyı bıraktım. Veri yoğunluğu artarsa apilere kaydırırız çekişleri.
                                                            // Şimdilik yukarıdan okuyorum...
                                                            // return contents?.find(a=>a.id==content_id)
  
                                                            let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"myaccount_content_backend",  id:content_id} }) } );            
                                                            let datajson =  await res?.json();                                                            
                                                            
  
                                                            return datajson;                                                              
                                                     }
  
  
        //  let {} fetcher_contentsinthesamecategory_backend_hook                                                   
                      
        const { data:contentData, isLoading } = useQuery({queryKey: ["contentdata", content_id], queryFn:() => fetcher_Myaccount_Content_Backend() }  );      
        let contentowner = contentData?.content?.user

        // return JSON.stringify(contentData)
                                             
                                             
        const fetcher_myaccountcategories = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_categories", email:contentowner } }) } ); res =  await res?.json(); return res; };  
        let { data:categories } = useQuery({queryKey:["myaccount_categories", contentData?.user ], queryFn:() => fetcher_myaccountcategories() , enabled:!!contentowner });                                              
  
       const addContentButtonState = useState(true);   // Ekleme butonları ekleme esnasında disable yapmak için..
  
  
       let fetcher_ContentsInTheSameCategory_Backend = async ({parentskeys}) => {  // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.     
        
                                                                          console.log("parentskeysparentskeys: ",parentskeys);
                                                                          let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"myaccount_contentsinthesamecategory_backend", email:contentowner, parentskeys} }) } );            
                                                                          let datajson =  await res?.json();                                                                             
                                                                          return datajson;     
                                                                        }
  
  
        const { data:myaccount } = giveuserv2hook_next15({anotheruser:contentowner, enabled:!!contentowner})
  
  
        const updateMyContent =async ({values})=>{                                                                                                           
                                                          // console.log("dsasasadsdsadsad ",  {...values.content, selecteduser});  
                                                          let res= await fetch(`/api/perfectmutation_next15`, { method: "POST", body: JSON.stringify({ data: { type:"myaccount_savecontent", content:values.content }}), } );  
                                                          let datajson =  await res?.json();
                                                          console.log("datajson::::", datajson);
                                                          queryClient.invalidateQueries();                                                                                                                                            
                                                          return datajson                                                          
                                                  };    
  
  
  
        let myaccountAddContent= async ({willSendParents}) => {       
  
                                                        addContentButtonState[1](false);                                                                                    
                                                        let res= await fetch(`/api/perfectmutation_next15`,
                                                        {
                                                          method: "POST",      
                                                          // headers: { "Content-Type": "application/json", "authorization": `Bearer ${session?.user?.accessToken}` },
                                                          body: JSON.stringify({                                                          
                                                            data:{type:"myaccount_addcontent", selecteduser:contentowner, willSendParents}
                                                          }),
                                                        }                                                  
                                                        );            
                                                        let datajson =  await res?.json();                                                           
                                                            
                                                        queryClient.invalidateQueries()                                                      
                                                        addContentButtonState[1](true);    
                                                        router.push(`/p/myaccount/content/c?selecteduser=${contentowner}&id=${datajson?.id}`)                                                      
                                                            
                                                        return datajson;
      
                                                                           }
                                                                       
                                                                           
          const routeChangerFunc = ({value}) =>  {                                                                                                                                                  
            
                                                _userState.myaccount_contents_filtered_categories= value;              
                                                router.push(`/${listingUrlPrefix}?tab=${tab}&p=${value?.join(",")}`, undefined, { shallow: true });
                                      }        
           
          let {  text:myaccount_content_editing  }   =  langConverter({locale, keyword:"myaccount_content_editing"});
            
          const BackToContents = ()  => <Link href={`/${listingUrlPrefix}?tab=${tab}`}  style={{fontWeight:"bold"}}> {myaccount?.slug_tr} </Link>
  
          let {content, relatedcontents, indexOfThisContentOnLastParent, afterContent, beforeContent} = contentData ?? {}

    
     const navigatonLevelObj = useState(); // deep, peak... // İleri geri butonları hangi saeviyedeki kategoriden tarama yapılacak...


    props = {
      // domain:web?.slug_tr,
      content,
      isLoading:false,  // Şimdilik false yaptım...      
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
      listingUrlPrefix, // webs, myaccount gibi ana url prefixleri.. Breadcrumbtan geri dönerken lazım olacak // Sağ üstteki breadcrumta kullanılıyor
      tab, // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
      subtab, // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
      editUrlPrefix, // İleri geri butonları için lazım...
      navigatonLevelObj,
      userdata,
}
    
  return (
    <div>
        {contentData ? <CoreContent_Next15 {...props}/>:                             
                                          isLoading ? <div> Yükleniyor </div> : <div> <Link href={"/p/myaccount"} >Böyle bir içerik yok!</Link> </div>                                                                                          
                                      }
    </div>
  )
}

export default MyAccountContent_Next15
