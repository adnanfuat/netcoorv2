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


const MyAccountContent_Next15 = (props) => {

        let {userdata} = props;
        let locale="tr";
    
        const searchParams = useSearchParams();
        const content_id = searchParams.get('id');
        const domain = searchParams.get('domain');


        let editUrlPrefix="mycontent";
        let listingUrlPrefix="myaccount";
        let tab="contents";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
        let subtab="x";  // x:önemsiz bir değer. Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için.. MyAccount > Content için gerek yok. Zaten content en üst seviyede...
  
        let router=useRouter();
                    
        const filtered_categoriesFunc = ({value}) => { console.log("zxcxzxcxzccxzcxz", value);  _userState.myaccount_contents_filtered_categories  =value; }
  
        
          // const { isLoading, data:myaccount } = giveuserv2hook_next15({anotheruser:selecteduser, enabled:!!selecteduser})
          
          
                                     
  
        const queryClient = useQueryClient();
  
  
        // const fetcher_myaccountcategories = async () => { let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_categories", email:selecteduser } }) } ); res =  await res?.json(); return res; };
  
        // let { data:categories } = useQuery({queryKey:["myaccount_categories", selecteduser ], queryFn:() => fetcher_myaccountcategories() }); 
  
  
  
  
        let fetcher_Myaccount_Content_Backend = async () => {       
  
                                                            // web sitesinin vierleri için yapmıştım bu bölümü. Web sitesinde çok yoğun bir içerik çekiyordu. Proweb referansların olduğu yer... Burada yoğun bir veri çekişi olmayacak...
                                                            // Geçici olarak aşağıyı bıraktım. Veri yoğunluğu artarsa apilere kaydırırız çekişleri.
                                                            // Şimdilik yukarıdan okuyorum...
                                                            // return contents?.find(a=>a.id==content_id)
  
                                                            let res= await fetch(`/api/myaccount_content_backend`, { method: "POST", body: JSON.stringify({ data:{selecteduser:undefined, id:content_id} }) } );            
                                                            let datajson =  await res?.json();
                                                            datajson = datajson?.fetcheddata;
                                                            queryClient.invalidateQueries();
  
                                                            return datajson;                                                              
                                                     }
  
  
        //  let {} fetcher_contentsinthesamecategory_backend_hook                                                   
                      
        const { data:contentData } = useQuery({queryKey: ["contentdata", content_id], queryFn:() => fetcher_Myaccount_Content_Backend() } 
                                             );         
  
       const addContentButtonState = useState(true);   // Ekleme butonları ekleme esnasında disable yapmak için..
  
  
       let fetcher_ContentsInTheSameCategory_Backend = async ({parentskeys}) => {  // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.     
        
                                                                          console.log("parentskeysparentskeys: ",parentskeys);
                                                                          let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"myaccount_contentsinthesamecategory_backend", email:"selecteduser", parentskeys} }) } );            
                                                                          let datajson =  await res?.json();                                                                             
                                                                          return datajson;     
                                                                        }
  
  
  
  
  
        const updateMyContent =async ({values})=>{                                                                                                           
                                                          // console.log("dsasasadsdsadsad ",  {...values.content, selecteduser});  
                                                          let res= await fetch(`/api/perfectmutation_next15`, { method: "POST", body: JSON.stringify({ data: { type:"myaccount_savecontent", content:values.content, selecteduser:"selecteduser" }}), } );  
                                                          let datajson =  await res?.json();                                                             
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
                                                            data:{type:"myaccount_addcontent", selecteduser:"selecteduser", willSendParents}
                                                          }),
                                                        }                                                  
                                                        );            
                                                        let datajson =  await res?.json();   
                                                        datajson = datajson?.fetcheddata;
                                                            
                                                        queryClient.invalidateQueries()                                                      
                                                        addContentButtonState[1](true);    
                                                        router.push(`/mycontent/${"selecteduser"}/${datajson?.id}`)                                                      
                                                            
                                                        return datajson;
      
                                                                           }
                                                                       
                                                                           
          const routeChangerFunc = ({value}) =>  {                                                                                                                                                  
            
                                                _userState.myaccount_contents_filtered_categories= value;              
                                                router.push(`/${listingUrlPrefix}?tab=${tab}&p=${value?.join(",")}`, undefined, { shallow: true });
                                      }        
           
          let {  text:myaccount_content_editing  }   =  langConverter({locale, keyword:"myaccount_content_editing"});
            
          const BackToContents = ()  => <Link href={`/${listingUrlPrefix}?tab=${tab}`}  style={{fontWeight:"bold"}}> {myaccount?.slug_tr} </Link>
  
          let {content, relatedcontents, indexOfThisContentOnLastParent, afterContent, beforeContent} = contentData ?? {}



    
  //       const navigatonLevelObj = useState(); // deep, peak... // İleri geri butonları hangi saeviyedeki kategoriden tarama yapılacak...
  //       let  editUrlPrefix = "p/myaccount/content/c";
  //       let  listingUrlPrefix = "p/myaccount/content";
  //       let  tab = "web????";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
  //       let  subtab = "contents????";  // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için      
    
  //       const filtered_categoriesFunc = ({value}) => { _userState.web_contents_filtered_categories  =value; }

  //       const queryClient = useQueryClient();
  //       let router = useRouter();
      
  //       // return JSON.stringify("contentData")
  //       let fetcher_WebContent_Backend = async () => {       
  //                                                       let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"webcontent_backend_next15",domain, id:content_id, level:navigatonLevelObj[0]} }) } ); 
  //                                                       let datajson =  await res?.json();   
  //                                                       // console.log("datajsondatajson1:", datajson);                                                             
  //                                                       // datajson = datajson?.fetcheddata;     
  //                                                       return datajson;                                                      
  //                                                   }
                  
  //         const { data:contentData, isLoading } = useQuery({queryKey:["webcontent_backend_next15", content_id, navigatonLevelObj[0]], queryFn:() => fetcher_WebContent_Backend(), placeholderData:keepPreviousData }); // { enabled:(!!userdata && !!domain) }
  //         const addContentButtonState = useState(true); // Ekleme butonları ekleme esnasında disable yapmak için..
  //         let fetcher_ContentsInTheSameCategory_Backend = async ({parentskeys}) => {  // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.     

  //         let res = await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"webcontentsinthesamecategory_backend", domain, parentskeys} }) } );            
  //         let datajson =  await res?.json();      
  //         // console.log("datajsondatajso1n", datajson);
          
  //         return datajson;
  // }

  // // return JSON.stringify(contentData)
   
  // const fetcher_webcategories = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"web_categories_next15", domain } }) } ); res =  await res?.json(); return res; };
    
  // let { data:categories } = useQuery( {queryKey:["web_categories_next15" ], queryFn:() => fetcher_webcategories()} 
  //                                                                                                               // {                                                          
  //                                                                                                               //     enabled:!!userdata?.email,
  //                                                                                                               //     refetchOnWindowFocus:false,  
  //                                                                                                               //     refetchOnReconnect: false,
  //                                                                                                               //     retry: false,
  //                                                                                                               //     staleTime: 6000,
  //                                                                                                               // }
  //                                   );
                                                                        
  //   const updateWebContent =async ({values})=>{        
        
  //                                                   //console.log("aaaaaaaaaaaaaaaaaaaaaaa____",values, domain );

  //                                                   let res= await fetch("/api/perfectmutation_next15", {
  //                                                         method: "POST",                                                          
  //                                                         body: JSON.stringify({ data:{ ...values, type:"websavecontent", domain } }),
  //                                                         }                                                                        
  //                                                                     );                                                                      
  //                                                         let datajson =  await res.json();                                                                                                                          
  //                                                         return datajson?.data;                                                                                                                                    
  //                                             };    
  
  //   let webAddContent= async ({willSendParents}) => {       
  
  //                                                   addContentButtonState[1](false);
                                                                                  
  //                                                     let res= await fetch(`/api/web_addcontent`,
  //                                                     {
  //                                                       method: "POST",      
  //                                                       // headers: { "Content-Type": "application/json", "authorization": `Bearer ${session?.user?.accessToken}` },
  //                                                       body: JSON.stringify({
  //                                                         // query: SwissArmyKnifeMutation,
  //                                                         data:{domain, willSendParents}
  //                                                       }),
  //                                                     }                                                  
  //                                                     );            
  //                                                     let datajson =  await res?.json();                                                         
  //                                                     datajson = datajson?.fetcheddata;    
  //                                                     //  console.log("datajsondatajson: ", datajson);                                                                 
  //                                                     queryClient.invalidateQueries();
  //                                                     addContentButtonState[1](true);    
  //                                                     router.push(`/p/webs/c?domain=${domain}&id=${datajson?.id}`);                                                          
  //                                                     return datajson;

  //                                                                      }
                                                                   
                                                                                                                                  
  //   const routeChangerFunc = ({value}) =>          {                                                                                                                                                  
  //                                                       _userState.myaccount_contents_filtered_categories = value;              
  //                                                       router.push(`/${listingUrlPrefix}?subtab=${subtab}&p=${value?.join(",")}`, undefined, { shallow: true });
  //                                                  }  
  
                                                            
               
  //     let {  text:web_content_editing }   =  langConverter({locale, keyword:"web_content_editing"});
      
        
  //     const BackToContents = ()  => <Link href={`/p/webs`}  style={{fontWeight:"bold"}}> {domain} </Link>
  
  //     let {content, relatedcontents, indexOfThisContentOnLastParent, afterContent, beforeContent} = contentData ?? {}
        
       

    //     props = {
    //             // domain:web?.slug_tr,
    //             content,
    //             isLoading, 
    //             // contents,
    //             categories,
    //             BackToContents,      // Tüm İçeriklere geri dönme komponenti
    //             updateContentFunc:updateWebContent,   // 
    //             indexOfThisContentOnLastParent, // Bu içerin breadcrrumbı (parentsları) arasında, bu içeriğin kaçıncı index'te olduğu. İleri geri butonları buna göre çalışacak...
    //             relatedcontents,
    //             afterContent,
    //             beforeContent,
    //             addContentFunc:webAddContent, // Sağ üstteki ekle butonundan ekleme yapmak için...
    //             addContentButtonState, // Ekleme butonlarının disabled durumlarını kontrol için state...                  
    //             filtered_categoriesFunc,
    //             fetcher_ContentsInTheSameCategory_Backend, // Web > İçerikler > İçerik > Sağ Üst Breadcrumb > "Bu içeriğinde bulunduğu ilgili kategoride kaç kayıt var" ---> Sorusunun cevabını verir bu servis.      
    //             editUrlPrefix, // İleri geri butonlarında kullanılıyor...
    //             listingUrlPrefix, // Sağ üstteki breadcrumta kullanılıyor
    //             tab, // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
    //             subtab, // Sağ üstteki breadcrumta kullanılıyor. Geri dönüşler için
    //             routeChangerFunc, //Breadcrumta kullanıyorum..
    //             navigatonLevelObj,
    //             userdata
    // }


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
    
  return (
    <div>
        {contentData ? <CoreContent_Next15 {...props}/>:                             
                                          isLoading ? <div> Yükleniyor </div> : <div> <Link href={"/p/myaccount"} >Böyle bir içerik yok!</Link> </div>                                                                                          
                                      }
    </div>
  )
}

export default MyAccountContent_Next15
