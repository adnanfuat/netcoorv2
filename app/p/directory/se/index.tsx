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

export default function  Sector (props) {

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

 let pathname = `/se/${id}`;

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
  
  const fetcher = async () => { let res= await fetch(`/api/perfectquery_next15`, {method: "POST", body: JSON.stringify({ data:{type:"sector", id } }) } ); res = await res?.json(); return res; };
  const {  data:sectorclient, isLoading } = useQuery( {queryKey:["sectorquery"], queryFn:() => fetcher()});


  // return JSON.stringify(sectorclient)


  const fetcher_rc = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"regional_contents", parent_datakey:sectorclient?.datakey, parent_type:"sector", project:sectorclient?.project, locale, defaultLocale, country_slug:countryStateObj[0], city_slug:cityStateObj[0], district_slug:districtStateObj[0], subdistrict_slug:subdistrictStateObj[0] } }) } ); res = await res?.json(); return res; };
  const {  data:regional_contents, isLoading:isLoading_regional_contents } = useQuery( {queryKey:["isLoading_regional_contents", countryStateObj[0], cityStateObj[0], districtStateObj[0], subdistrictStateObj[0], sectorclient?.project ], queryFn:() => fetcher_rc()});
                    
  let save_regional_contentfunc = async (data) => {
                                                                  let { regional_content } = data ?? {};
                                                                  // var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                                                  // formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
                                                                  // console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
                                                                  let res =await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"save_regional_content", ...data, parent_datakey:sectorclient?.datakey, parent_type:"sector", domain:sectorclient?.project } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 

                                                              }

  let add_regional_contentfunc = async (data) => {
                                                                let { country_slug, city_slug, district_slug, subdistrict_slug } = data ?? {};
                                                                  var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                                                //  formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
                                                                //  console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
                                                                let res =await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{country_slug, city_slug, district_slug, subdistrict_slug, type:"add_regional_content", parent_datakey:sectorclient?.datakey, parent_type:"sector", domain:sectorclient?.project, datakey } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 
                                                                
                                                            }                                                              

              // return (<div>{JSON.stringify(regional_contents)}</div>);
              const updateFunc = async ({values}) => {                                                              
                                                            let res = await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"sectorupdate", ...values} }) }); 
                                                            res=await res?.json();
                                                            queryClient.invalidateQueries(); 
                                                            
                                                            let project = values?.sector?.project;
                                                            console.log("resres:1________", project); 
                                                             revalidateFunc({project:project, submittingObj:undefined, path:`/se/${values?.sector?.slug_tr}`}); // yurtaramanın şehirlerini update etme meselesini henüz yapmadım.
                                                             revalidateFunc({project:project, submittingObj:undefined, path:project=="sakaryarehberim.com" ? `/firmarehberi` : "/yurtlar"});  // yurtarmaada yok. Ona özel birşey yapmak lazım.
                                                             console.log("resres:_________", values?.sector?.project, values?.sector?.slug_tr ); 
                                                            return res;                                                          
                                                     }; 

                const formik = useFormik({
                                            enableReinitialize: true, initialValues: { sector:sectorclient, regional_contents },
                                            onSubmit: async (values, {setSubmitting}) => {  setSubmitting(true);  await updateFunc({values}); setSubmitting(false); },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
                                        });   
      
let sector=formik?.values?.sector;
  
/////////--- (s)

let contents_linked = eval(`sector?.contents_linked`) ?? [];
let contents_linked_fn = `sector.contents_linked`;

let searchkeyword = eval(`sector?.searchkeyword`) ?? undefined;
let searchkeyword_fn = `sector.searchkeyword`;

let contents_removed = eval(`sector?.contents_removed`) ?? [];
let contents_removed_fn = `sector.contents_removed`;

let contents_keywords_and = eval(`sector?.contents_keywords_and`) ?? [];
let contents_keywords_and_fn = `sector.contents_keywords_and`;

let contents_keywords_not = eval(`sector?.contents_keywords_not`) ?? [];
let contents_keywords_not_fn = `sector.contents_keywords_not`;

let pagedetail1 = eval(`sector?.detail1_${locale}`)
let pagedetail2 = eval(`sector?.detail2_${locale}`)

let pagedetail1_fn= `sector.detail1_${locale}`;
let pagedetail2_fn= `sector.detail2_${locale}`;

let selectedlang_name_fn = `sector.title_${locale}`;
let selectedlang_name = eval(`sector?.title_${locale}`);
let defaultlang_name = eval(`sector?.title_${defaultLocale}`);

let name = selectedlang_name ??  defaultlang_name;

/* eğer seçilen dilde veri yoksa  veya  seçilen dilde veri olmasına rağmen,
seçilen dildeki en temel veri olan isim ile default dildeki isim  aynı ise o zaman o dile hiç veri girilmemiştir. bu durumda canonical olarak default dili göstermeliyiz. */
let canonicalLangProblem= (!selectedlang_name   || (selectedlang_name && (selectedlang_name==defaultlang_name) && locale!=defaultLocale)) ? true: false 
/////////--- (f)


///////xxxx --- (s)
let meta_title = eval(`sector?.meta_${locale}?.title`) ?? ""  
let meta_title_fn = `sector.meta_${locale}.title`

let meta_description = eval(`sector?.meta_${locale}?.description`)
let meta_description_fn = `sector.meta_${locale}.description`; 
let meta_keywords = eval(`sector?.meta_${locale}?.keywords`)

let rank = eval(`sector?.rank`) ?? 0 ;
let rank_fn = `sector.rank`;
let locked = eval(`sector?.locked`);
let locked_fn = `sector.locked`;

let active = eval(`sector?.active`);
let active_fn = `sector.active`;

let slug = eval(`sector?.slug_${locale}`);
let slug_fn=    `sector.slug_${locale}`;

let googlerank = sector?.googlerank;
let googlerank_fn=    `sector.googlerank`;

let note = sector?.note;
let note_fn=    `sector.note`;

let pathObj={sector:sector?.sector, sector:sector?.slug_tr};

let { prefix } = titlePrefixer({type:"sector", countries, slug }); prefix = capitalizeFirstLetter(prefix);

let slug_authority=permissionsControlV3({askList:["category_slug"], type:"some", permissions});  // Slug değiştirme yetkisi...?
let locked_authority=permissionsControlV3({askList:["category_lock"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let adv_authority=permissionsControlV3({askList:["advertisement"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let category_authority=permissionsControlV3({askList:["category"], type:"some", permissions}); 


let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
let livelink=undefined;
if (sector?.project=="sakaryarehberim.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/su/${sector?.slug_tr}`;

}
else if (sector?.project=="yurtarama.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/${sector?.slug_tr}`;
}

let project=sector?.project;

//let livelink=project=="yurtarama.com" ? `${FRONTEND_DOMAIN}/${sector?.slug_tr}` : `${FRONTEND_DOMAIN}/su/${sector?.slug_tr}`;//yurtarama.com için link yapısı farklı
livelink = givelivelink({country_slug, city_slug, district_slug, subdistrict_slug, project:sector?.project, livelink})

let pagetype="sector";
let eadvlink=`/p/promo/edit?pagetype=${pagetype}&parent_slug=${slug}&parent_id=${sector?.id}`; // Reklamlara yönlendiren link
let advlink=`/p/categoricalads?project=${sector?.project}&sector=${sector?.sector}&sector=${sector?.slug_tr}`; // Reklamlara yönlendiren link


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


  //  return (<div>{JSON.stringify(sectorclient?.project)}</div>)

if (!sector) return "~"
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
                                              project:sector?.project,

                                              userdata,
                                              pathObj,
                                              pagetype:"sector"

                                            }}/>
                                            

          //  </LayoutMain>

  );

}







  
  

