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

export default function  Label(props) {

 let { userdata } = props ?? {};

 let locale="tr";
 let defaultLocale="tr";
  
//  const router = useRouter();
 const searchParams = useSearchParams();

 const country_slug = searchParams.get('country_slug');
 const city_slug = searchParams.get('city_slug');
 const district_slug = searchParams.get('district_slug');
 const subdistrict_slug = searchParams.get('subdistrict_slug');

 const id = searchParams.get('id');

 let pathname = `/label/${id}`;

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
  
  const fetcher = async () => { let res= await fetch(`/api/perfectquery_next15`, {method: "POST", body: JSON.stringify({ data:{type:"label", id } }) } ); res = await res?.json(); return res; };
  const {  data:labelclient, isLoading } = useQuery( {queryKey:["labelquery"], queryFn:() => fetcher()});


  // return JSON.stringify(labelclient)


  const fetcher_rc = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"regional_contents", parent_datakey:labelclient?.datakey, parent_type:"label", project:labelclient?.project, locale, defaultLocale, country_slug:countryStateObj[0], city_slug:cityStateObj[0], district_slug:districtStateObj[0], subdistrict_slug:subdistrictStateObj[0] } }) } ); res = await res?.json(); return res; };
  const {  data:regional_contents, isLoading:isLoading_regional_contents } = useQuery( {queryKey:["isLoading_regional_contents", countryStateObj[0], cityStateObj[0], districtStateObj[0], subdistrictStateObj[0], labelclient?.project ], queryFn:() => fetcher_rc()});
                    
  let save_regional_contentfunc = async (data) => {
                                                                  let { regional_content } = data ?? {};
                                                                  // var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                                                  // formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
                                                                  // console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
                                                                  let res =await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"save_regional_content", ...data, parent_datakey:labelclient?.datakey, parent_type:"label", domain:labelclient?.project } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 

                                                              }

  let add_regional_contentfunc = async (data) => {
                                                                let { country_slug, city_slug, district_slug, subdistrict_slug } = data ?? {};
                                                                  var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                                                //  formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
                                                                //  console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
                                                                let res =await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{country_slug, city_slug, district_slug, subdistrict_slug, type:"add_regional_content", parent_datakey:labelclient?.datakey, parent_type:"label", domain:labelclient?.project, datakey } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 
                                                                
                                                            }                                                              

              // return (<div>{JSON.stringify(regional_contents)}</div>);
              const updateFunc = async ({values}) => {  let res = await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"labelupdate", ...values} }) }); res=await res?.json();queryClient.invalidateQueries(); console.log("resres:1", res); return res;  }; 

                const formik = useFormik({
                                            enableReinitialize: true, initialValues: { label:labelclient, regional_contents },
                                            onSubmit: async (values, {setSubmitting}) => {  setSubmitting(true);  await updateFunc({values}); setSubmitting(false); },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
                                        });   
      
let label=formik?.values?.label;
  
/////////--- (s)

let contents_linked = eval(`label?.contents_linked`) ?? [];
let contents_linked_fn = `label.contents_linked`;

let searchkeyword = eval(`label?.searchkeyword`) ?? undefined;
let searchkeyword_fn = `label.searchkeyword`;

let contents_removed = eval(`label?.contents_removed`) ?? [];
let contents_removed_fn = `label.contents_removed`;

let contents_keywords_and = eval(`label?.contents_keywords_and`) ?? [];
let contents_keywords_and_fn = `label.contents_keywords_and`;

let contents_keywords_not = eval(`label?.contents_keywords_not`) ?? [];
let contents_keywords_not_fn = `label.contents_keywords_not`;

let pagedetail1 = eval(`label?.detail1_${locale}`)
let pagedetail2 = eval(`label?.detail2_${locale}`)

let pagedetail1_fn= `label.detail1_${locale}`;
let pagedetail2_fn= `label.detail2_${locale}`;

let selectedlang_name_fn = `label.title_${locale}`;
let selectedlang_name = eval(`label?.title_${locale}`);
let defaultlang_name = eval(`label?.title_${defaultLocale}`);

let name = selectedlang_name ??  defaultlang_name;

/* eğer seçilen dilde veri yoksa  veya  seçilen dilde veri olmasına rağmen,
seçilen dildeki en temel veri olan isim ile default dildeki isim  aynı ise o zaman o dile hiç veri girilmemiştir. bu durumda canonical olarak default dili göstermeliyiz. */
let canonicalLangProblem= (!selectedlang_name   || (selectedlang_name && (selectedlang_name==defaultlang_name) && locale!=defaultLocale)) ? true: false 
/////////--- (f)


///////xxxx --- (s)
let meta_title = eval(`label?.meta_${locale}?.title`) ?? ""  
let meta_title_fn = `label.meta_${locale}.title`

let meta_description = eval(`label?.meta_${locale}?.description`)
let meta_description_fn = `label.meta_${locale}.description`; 
let meta_keywords = eval(`label?.meta_${locale}?.keywords`)

let rank = eval(`label?.rank`) ?? 0 ;
let rank_fn = `label.rank`;
let locked = eval(`label?.locked`);
let locked_fn = `label.locked`;

let active = eval(`label?.active`);
let active_fn = `label.active`;

let slug = eval(`label?.slug_${locale}`);
let slug_fn=    `label.slug_${locale}`;

let googlerank = label?.googlerank;
let googlerank_fn=    `label.googlerank`;

let note = label?.note;
let note_fn=    `label.note`;

let pathObj={label:label?.slug_tr, sector:undefined};

let { prefix } = titlePrefixer({type:"label", countries, slug }); prefix = capitalizeFirstLetter(prefix);

let slug_authority=permissionsControlV3({askList:["category_slug"], type:"some", permissions});  // Slug değiştirme yetkisi...?
let locked_authority=permissionsControlV3({askList:["category_lock"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let adv_authority=permissionsControlV3({askList:["advertisement"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let category_authority=permissionsControlV3({askList:["category"], type:"some", permissions}); 


let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
let livelink=undefined;
if (label?.project=="sakaryarehberim.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/su/${label?.slug_tr}`;

}
else if (label?.project=="yurtarama.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/${label?.slug_tr}`;
}

let project=label?.project;

//let livelink=project=="yurtarama.com" ? `${FRONTEND_DOMAIN}/${label?.slug_tr}` : `${FRONTEND_DOMAIN}/su/${label?.slug_tr}`;//yurtarama.com için link yapısı farklı
livelink = givelivelink({country_slug, city_slug, district_slug, subdistrict_slug, project:label?.project, livelink})

let pagetype="label";
let eadvlink=`/p/promo/edit?pagetype=${pagetype}&parent_slug=${slug}&parent_id=${label?.id}`; // Reklamlara yönlendiren link
let advlink=`/p/categoricalads?project=${label?.project}&label=${label?.slug_tr}`; // Reklamlara yönlendiren link


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


  // return (<div>{JSON.stringify(sectorclient?.project)}</div>)

if (!label) return "~"
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
                                              project:label?.project,

                                              userdata,
                                              pathObj,
                                              pagetype:"label"

                                            }}/>
                                            

          //  </LayoutMain>

  );

}







  
  

