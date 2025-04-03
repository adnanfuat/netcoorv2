import Head from "next/head";



// INFO: Bu komponent hem Layout_Meta_Admnin hem de Layout_Meta_Visitor için hizmet veriyor...

export const Layout_Meta_Head = ({props}) => {
    
    let { canonicalUrl, meta_title,  name,  meta_keywords, meta_description  } = props ?? {};

    // console.log("propsas:::", props)

    // pagedetail1      =      (pagedetail1 && pagedetail1!="" && pagedetail1!=null) ? pagedetail1 : undefined
    // pagedetail2      =      (pagedetail2 && pagedetail2!="" && pagedetail2!=null) ? pagedetail2 : undefined
    // meta_description =      (meta_description && meta_description!="" && meta_description!=null) ? meta_description : undefined    

    // meta_description= meta_description ?? pagedetail1 ?? pagedetail2 ?? name


    // // console.log("sasasasa", props,  meta_description, pagedetail1,pagedetail2, name )

    // let canonical_url_category=""
    // let opened_slug=""; //Su,se,la "evden-eve-nakliyat" gibi gelirken,"Visitor Mode'da" CL : "[arac-kiralama,filo-kiralama]" şeklinde geliyor. Cl için özel muamele gerekli.. Admin Modeda ise virgülle geliyor . Burada bir karmaşa var... İkisi de aynı olmalı. 

    // switch (pagetype) {
    //     case "subsector":   canonical_url_category="su"; opened_slug=slug;
    //         break;
    //     case "sector":      canonical_url_category="se"; opened_slug=slug;            
    //         break;            
    //     case "label":       canonical_url_category="la"; opened_slug=slug;            
    //             break;                                    
    //     case "cclass":      canonical_url_category="cl"; ; opened_slug=  slug?.[0] + "/" + slug?.[1]; //console.log("slug::::", slug)  
    //         break;                        

    
    //     default:
    //         break;
    // }

    
    

    // let name_title=`${prefix ? prefix :""} ${name ?? ""}`  // "" koymazsam title'da bir an undefined yazıyor...
    // name_title=name_title?.trim();
    // name_title = name_title?.charAt(0)?.toUpperCase() + name_title?.slice(1); ////1.karateri bul, uppercase yap,  1. karakterden itibaren kalanı bul ve ekle
        
    // let title = (meta_title && name_title!="") ? meta_title : name_title; // Eğer meta title girilmemişse o zaman title'ı alacağız. Bu durumda başına prefix (sakarya) filan eklmeye gerek yok. çünkü zaten manul olarak girildiği için bu düşünülmüştür.

    // //  console.log("sadsadsadsadsad", props)

    //  let canonicalUrl_default = `${process.env.NEXT_PUBLIC_URL}/${canonical_url_category}/${opened_slug}`  
    //  let canonicalUrl_lang = locale==localeStatic ?  canonicalUrl_default : `${process.env.NEXT_PUBLIC_URL}/${locale}/${canonical_url_category}/${opened_slug}`  // (locale==localeStatic) http://localhost:3000/tr/evden-eve-nakliyat // böyle bir canonical oluşması işimize gelmez. Çünkü bizin tr sayfalarımız Google'da http://localhost:3000/tr/evden-eve-nakliyat şeklinde kayıtlı

    // let canonicalUrl = canonicalLangProblem ? canonicalUrl_default : canonicalUrl_lang //Eğer o dile hiç veri girilmemişse (=canonicalLangProblem) o zaman google'a bu sayfada özel veri yok anlamında canonical etiketi yolllamamız gerekiyor. // asıl sayfa burası manasında...


    return (    
                <div style={{display:"none"}}> {/* Displaye Dikkat */}
                
                    
                {/* {meta_title} - asassas - {name_title} asdsad {name} asdsa {prefix} */}
                {/* title: {title}    
                <br/><br/>
                description:  
                {meta_description}                
                <br/><br/>
                canonicalUrl: 
                {canonicalUrl} */}

                {/* ::::: ferrrr  {JSON.stringify(canonicalUrl)} */}

                        {/* {meta_description}  */}

                        <Head>
                                            <title>{meta_title}</title>
                                            {/* <meta name="keywords" content={meta_keywords} /> */}
                                            <meta name="description" content={meta_description?.substring(0,250) ?? name} />
                                            <link rel="canonical" href={canonicalUrl} />
                                            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: `
                                                                            {
                                                                            "@context": "https://schema.org/",
                                                                            "@id": "https://google.com/article",
                                                                            "@type": "LocalBusiness",
                                                                            "name": "${meta_title}",
                                                                            "address": "Adapazarı / Sakarya",
                                                                            "image": "https://srcdn.sakaryarehberim.net/pictures/firmalar/resim25488.jpg",                                            
                                                                            "geo": {
                                                                            "@type": "GeoCoordinates",
                                                                            "latitude": "41.40338",
                                                                            "longitude": "2.17403"
                                                                            },
                                                                            "openingHoursSpecification": {
                                                                            "@type": "OpeningHoursSpecification",
                                                                            "validFrom": "2022-08-14T21:00:00.000Z",
                                                                            "validThrough": "2022-08-15T21:00:00.000Z",
                                                                            "opens": "08:00:00",
                                                                            "closes": "18:00:00",
                                                                            "dayOfWeek": [
                                                                                "Sunday",
                                                                                "Saturday",
                                                                                "Friday",
                                                                                "Thursday",
                                                                                "Wednesday",
                                                                                "Tuesday",
                                                                                "Monday"
                                                                            ]
                                                                            },
                                                                            "telephone": "05320000000",
                                                                            "priceRange": "1000-2000"
                                                                            }
                                                                `}}>
                                            
                                                                </script>                               
                        </Head>
                        </div>      
          )
          
  }


