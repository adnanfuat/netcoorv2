"use client"
var keygen = require("keygenerator");
import { useFormik} from 'formik';
import {capitalizeFirstLetter} from "@/modules/functions/capitalizefirstletter"
import {titlePrefixer} from "@/modules/functions/titleprefixer"
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { givelivelink } from '../common/givelivelink';
import { Loading } from '@/modules/loadings/loading';
import { LayoutShellV2_Admin } from '../common/layoutshellv2_admin';
import revalidateFunc from '@/modules/functions/revalidatefunc';

export default function  Cclass (props) {

 let { userdata } = props ?? {};

 let locale="tr";
 let defaultLocale="tr";
  
//  const router = useRouter();
 const searchParams = useSearchParams();

 const country_slug = searchParams.get('country_slug');
 const city_slug = searchParams.get('city_slug');
 const district_slug = searchParams.get('district_slug');
 const subdistrict_slug = searchParams.get('subdistrict_slug');

 
 // Eskisinden kalma.. Belki ihtiyaç olmayabilir...

//  useEffect(() => {
//      countryStateObj[1](country_slug)
//  }, [country_slug])
 
//  useEffect(() => {
//      cityStateObj[1](city_slug)
//  }, [city_slug])
 
//  useEffect(() => {
//      districtStateObj[1](district_slug)
//  }, [district_slug])      
 
//  useEffect(() => {
//      subdistrictStateObj[1](subdistrict_slug)
//  }, [subdistrict_slug])   



 const id = searchParams.get('id');

 let pathname = `/cl/${id}`;

  const countryStateObj =  useState(country_slug);
  const cityStateObj =  useState(city_slug);
  const districtStateObj =  useState(district_slug);
  const subdistrictStateObj =  useState(subdistrict_slug);
    
  const queryClient = useQueryClient();  
  let { countries} = props ?? {};
  
  let permissions = userdata?.permissions ?? [];
  let user=userdata ?.email;
  
  let permissionReject=true; // varsayılan olarak reddedilmiş kabul et...
  ["category","advertisement"]?.map(w=>{           
                                let found = permissions?.find(item=>item?.name==w);      // input olarak gelen yetkiyi kullancının yetkileri içinde ara                                                 
                                if (found) { permissionReject=false}                     // demekki her firma için yetkisi var..                                                                            
                            }
  );  // whichPermissions ile gelen yetkilerden biri yoksa o zaman o kaydı find ile bulmuş olacak ve  reject sonucu döndürecek...

  let loginAndAuthorized  = user?.email && !permissionReject;
  
  const fetcher = async () => { let res= await fetch(`/api/perfectquery_next15`, {method: "POST", body: JSON.stringify({ data:{type:"cclass", id,  } }) } ); res = await res?.json(); return res; };
  const {  data:cclassclient, isLoading } = useQuery( {queryKey:["cclass"], queryFn:() => fetcher()});


    


  const fetcher_rc = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"regional_contents", parent_datakey:cclassclient?.datakey, parent_type:"cclass", project:cclassclient?.project, locale, defaultLocale, country_slug:countryStateObj[0], city_slug:cityStateObj[0], district_slug:districtStateObj[0], subdistrict_slug:subdistrictStateObj[0] } }) } ); res = await res?.json(); return res; };
  const {  data:regional_contents, isLoading:isLoading_regional_contents } = useQuery( {queryKey:["isLoading_regional_contents", countryStateObj[0], cityStateObj[0], districtStateObj[0], subdistrictStateObj[0], cclassclient?.project ], queryFn:() => fetcher_rc()});
                    
  let save_regional_contentfunc = async (data) => {
                                                                  let { regional_content } = data ?? {};
                                                                  // var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                                                  // formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
                                                                  // console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
                                                                  let res =await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"save_regional_content", ...data, parent_datakey:cclassclient?.datakey, parent_type:"sector", domain:cclassclient?.project } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 

                                                              }

  let add_regional_contentfunc = async (data) => {
                                                                let { country_slug, city_slug, district_slug, subdistrict_slug } = data ?? {};
                                                                  var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                                                //  formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
                                                                //  console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
                                                                let res =await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{country_slug, city_slug, district_slug, subdistrict_slug, type:"add_regional_content", parent_datakey:cclassclient?.datakey, parent_type:"sector", domain:cclassclient?.project, datakey } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 
                                                                
                                                            }                                                              

              // return (<div>{JSON.stringify(regional_contents)}</div>);
              const updateFunc = async ({values}) => {  
                                      let res = await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"cclassupdate", ...values} }) }); 
                                      res=await res?.json();queryClient.invalidateQueries(); console.log("resres:1", res); 
                                      revalidateFunc({project:values?.cclass?.project, submittingObj:undefined, path:`/cl/${values?.cclass?.subsector}/${values?.cclass?.slug_tr}`}); // yurtaramanın şehirlerini update etme meselesini henüz yapmadım.
                                      revalidateFunc({project:values?.cclass?.project, submittingObj:undefined, path:`/su/${values?.cclass?.subsector}`}); // yurtaramanın şehirlerini update etme meselesini henüz yapmadım.
                                      return res; 
                                     }; 

                const formik = useFormik({
                                            enableReinitialize: true, initialValues: { cclass:cclassclient, regional_contents },
                                            onSubmit: async (values, {setSubmitting}) => {  setSubmitting(true);  await updateFunc({values}); setSubmitting(false); },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
                                        });   
      
let cclass=formik?.values?.cclass;

// return JSON.stringify(cclass)
  
/////////--- (s)

let contents_linked = eval(`cclass?.contents_linked`) ?? [];
let contents_linked_fn = `cclass.contents_linked`;

let searchkeyword = eval(`cclass?.searchkeyword`) ?? undefined;
let searchkeyword_fn = `cclass.searchkeyword`;

let contents_removed = eval(`cclass?.contents_removed`) ?? [];
let contents_removed_fn = `cclass.contents_removed`;

let contents_keywords_and = eval(`cclass?.contents_keywords_and`) ?? [];
let contents_keywords_and_fn = `cclass.contents_keywords_and`;

let contents_keywords_not = eval(`cclass?.contents_keywords_not`) ?? [];
let contents_keywords_not_fn = `cclass.contents_keywords_not`;

let pagedetail1 = eval(`cclass?.detail1_${locale}`)
let pagedetail2 = eval(`cclass?.detail2_${locale}`)

let pagedetail1_fn= `cclass.detail1_${locale}`;
let pagedetail2_fn= `cclass.detail2_${locale}`;

let selectedlang_name_fn = `cclass.title_${locale}`;
let selectedlang_name = eval(`cclass?.title_${locale}`);
let defaultlang_name = eval(`cclass?.title_${defaultLocale}`);

let name = selectedlang_name ??  defaultlang_name;

/* eğer seçilen dilde veri yoksa  veya  seçilen dilde veri olmasına rağmen,
seçilen dildeki en temel veri olan isim ile default dildeki isim  aynı ise o zaman o dile hiç veri girilmemiştir. bu durumda canonical olarak default dili göstermeliyiz. */
let canonicalLangProblem= (!selectedlang_name   || (selectedlang_name && (selectedlang_name==defaultlang_name) && locale!=defaultLocale)) ? true: false 
/////////--- (f)


///////xxxx --- (s)
let meta_title = eval(`cclass?.meta_${locale}?.title`) ?? ""  
let meta_title_fn = `cclass.meta_${locale}.title`

let meta_description = eval(`cclass?.meta_${locale}?.description`)
let meta_description_fn = `cclass.meta_${locale}.description`; 
let meta_keywords = eval(`cclass?.meta_${locale}?.keywords`)

let rank = eval(`cclass?.rank`) ?? 0 ;
let rank_fn = `cclass.rank`;
let locked = eval(`cclass?.locked`);
let locked_fn = `cclass.locked`;

let active = eval(`cclass?.active`);
let active_fn = `cclass.active`;

let slug = eval(`cclass?.slug_${locale}`);
let slug_fn=    `cclass.slug_${locale}`;

let googlerank = cclass?.googlerank;
let googlerank_fn=    `cclass.googlerank`;

let note = cclass?.note;
let note_fn=    `cclass.note`;

let pathObj={sector:cclass?.sector, subsector:cclass?.subsector, cclass:cclass?.slug_tr};

let { prefix } = titlePrefixer({type:"sector", countries, slug }); prefix = capitalizeFirstLetter(prefix);

let slug_authority=permissionsControlV3({askList:["category_slug"], type:"some", permissions});  // Slug değiştirme yetkisi...?
let locked_authority=permissionsControlV3({askList:["category_lock"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let adv_authority=permissionsControlV3({askList:["advertisement"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let category_authority=permissionsControlV3({askList:["category"], type:"some", permissions}); 


let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
let livelink=undefined;
if (cclass?.project=="sakaryarehberim.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/su/${cclass?.slug_tr}`;

}
else if (cclass?.project=="yurtarama.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/${cclass?.slug_tr}`;
}

let project=cclass?.project;

//let livelink=project=="yurtarama.com" ? `${FRONTEND_DOMAIN}/${cclass?.slug_tr}` : `${FRONTEND_DOMAIN}/su/${cclass?.slug_tr}`;//yurtarama.com için link yapısı farklı
livelink = givelivelink({country_slug, city_slug, district_slug, subdistrict_slug, project:cclass?.project, livelink})

let pagetype="cclass";
let eadvlink=`/p/promo/edit?pagetype=${pagetype}&parent_slug=${slug}&parent_id=${cclass?.id}`; // Reklamlara yönlendiren link
let advlink=`/p/categoricalads?project=${cclass?.project}&sector=${cclass?.sector}&sector=${cclass?.slug_tr}`; // Reklamlara yönlendiren link


if (country_slug) // Yurtarama illere göre listelendiği için bu önemli..
{
  advlink=advlink+`&country_slug=${country_slug}` 
}
if (city_slug)
{
  advlink=advlink+`&city_slug=${city_slug}` 
}
if (district_slug)
{
  advlink=advlink+`&district_slug=${district_slug}` 
}
if (subdistrict_slug)
{
  advlink=advlink+`&subdistrict_slug=${subdistrict_slug}` 
}

//  return (<div>{JSON.stringify(prefix)}</div>)

if (!cclass) return "~"
if (isLoading) return <Loading/>

// <LayoutMain layout_title={name} suptitle={`Alt Sektör ${country_slug ?? ""} ${city_slug ?? ""} ${district_slug ?? ""} ${subdistrict_slug ?? ""}`}>
  return (  <LayoutShellV2_Admin props=
                                            {{
                                              formik,                                               
                                              selectedlang_name_fn, 
                                              selectedlang_name,
                                              pagedetail1_fn,
                                              pagedetail1,
                                              pagedetail2_fn,
                                              pagedetail2,
                                              meta_title, 
                                              meta_description, 
                                              meta_keywords,                   
                                              meta_title_fn, 
                                              meta_description_fn,                   
                                              rank, 
                                              rank_fn, 
                                              name, 
                                              canonicalLangProblem, 
                                              prefix, 
                                              locked,
                                              locked_fn, 
                                              active_fn,
                                              active,
                                              slug_authority, 
                                              locked_authority, 
                                              adv_authority,
                                              category_authority,                  
                                              slug_fn, 
                                              slug,
                                              note_fn,
                                              note,
                                              googlerank_fn, 
                                              googlerank,                                              
                                              livelink,
                                              advlink,
                                              eadvlink, // Eski!!!
                                              contents_linked_fn,
                                              contents_linked,
                                              contents_removed_fn, 
                                              contents_removed, 

                                              contents_keywords_and_fn, 
                                              contents_keywords_and, 
                                              
                                              contents_keywords_not_fn,
                                              contents_keywords_not,

                                              searchkeyword_fn,
                                              searchkeyword,
                                              
                                              regional_contents,

                                              save_regional_contentfunc,
                                              add_regional_contentfunc,

                                              // regional_descriptions,
                                              // regional_descriptions_fn,

                                              pathname,
                                              countryStateObj, cityStateObj, districtStateObj, subdistrictStateObj,
                                              project:cclass?.project,

                                              userdata,
                                              pathObj,
                                              pagetype:"cclass"

                                            }}/>
                                            
          //  </LayoutMain>
  );

}
  

