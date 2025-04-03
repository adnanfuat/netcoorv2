var keygen = require("keygenerator");
import {useFormik} from 'formik';
import {useQueryClient} from "react-query";
import { useQuery} from "react-query";
import {useRouter } from 'next/router';
import { Loading} from  "@/components/commonnew/loading";
import {LayoutShellV2_Admin} from '@/components/layouts/layoutshellv2_admin';
import {titlePrefixer } from '@/components/commonnew/titleprefixer';
import {capitalizeFirstLetter } from '@/components/utilsnew/capitalizefirstletter';
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import {isLogged} from "@/components/hooksnew/islogged";
import { LayoutMain } from "@/layouts/console/layoutmain";
import { layoutShellV2_Admin_GiveLiveLink } from '@/layouts/layoutshellv2_admin_givelivelink';
import { useEffect, useState } from 'react';



export default function  Sector_Core ({props}) {


  const router = useRouter();
  const {locale, defaultLocale, query:{id, country_slug, city_slug, district_slug, subdistrict_slug}}= router;    


  const countryStateObj =  useState(country_slug);
  const cityStateObj =  useState(city_slug);
  const districtStateObj =  useState(district_slug);
  const subdistrictStateObj =  useState(subdistrict_slug);



useEffect(() => {
    countryStateObj[1](country_slug)
}, [country_slug])

useEffect(() => {
    cityStateObj[1](city_slug)
}, [city_slug])

useEffect(() => {
    districtStateObj[1](district_slug)
}, [district_slug])      

useEffect(() => {
    subdistrictStateObj[1](subdistrict_slug)
}, [subdistrict_slug])   



  let pathname = `/se/${id}`;
  // console.log("routerrouter: ", router);

  //return <div onClick={()=>router?.replace({pathname:`/se/${id}` ,query:undefined})}>asdasd</div>
  // return country_slug
  
  const queryClient = useQueryClient();  
  let { countries} = props ?? {};
  
  const { user, permissions} = isLogged();
  
  let permissionReject=true; // varsayılan olarak reddedilmiş kabul et...
  ["category","advertisement"]?.map(w=>{           
                                let found = permissions?.find(item=>item?.name==w);      // input olarak gelen yetkiyi kullancının yetkileri içinde ara                                                 
                                if (found) { permissionReject=false}                     // demekki her firma için yetkisi var..                                                                            
                            }
  );  // whichPermissions ile gelen yetkilerden biri yoksa o zaman o kaydı find ile ulmuş olacak ve  reject sonucu döndürecek...            

  let loginAndAuthorized  = user?.email && !permissionReject ; // permissions?.includes(10);
  
      
  const fetcher = async () => { let res= await fetch(`/api/sector_admin`, { method: "POST", body: JSON.stringify({ data:{ id, locale, defaultLocale } }) } ); res =  await res?.json(); return res; };                  
  const { data:sectorclient, isLoading } = useQuery( ["sectorquery"], () => fetcher() , { enabled:(!!id && loginAndAuthorized)});

  const fetcher_rc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"regional_contents", parent_datakey:sectorclient?.datakey, parent_type:"sector", project:sectorclient?.project, locale, defaultLocale, country_slug:countryStateObj[0], city_slug:cityStateObj[0], district_slug:districtStateObj[0], subdistrict_slug:subdistrictStateObj[0] } }) } ); res = await res?.json(); return res; };
  const { data:regional_contents, isLoading:isLoading_regional_contents } = useQuery( ["isLoading_regional_contents", countryStateObj[0], cityStateObj[0], districtStateObj[0], subdistrictStateObj[0], ], () => fetcher_rc() , { enabled:!!sectorclient, keepPreviousData:true  } );
                          
  // console.log("regional_contentsregional_contents: ", sectorclient);

            //  return (<div>{JSON.stringify(regional_contents)}</div>)

              const updateFunc = async ({values}) => {  let res = await fetch("/api/sectormutation_update", { method: "POST", body: JSON.stringify({ data:{type:"sectormutation_update", ...values} }) }); res=await res?.json();queryClient.invalidateQueries(); console.log("resres:1", res); return res;  }; 

                const formik = useFormik({
                                enableReinitialize: true, initialValues: { sector:sectorclient },
                                onSubmit: async (values, {setSubmitting}) => {  setSubmitting(true);  await updateFunc({values}); setSubmitting(false);    },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
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
let locked = eval(`sector?.locked`)
let locked_fn = `sector.locked`;

let active = eval(`sector?.active`)
let active_fn = `sector.active`;

let slug = eval(`sector?.slug_${locale}`);
let slug_fn=    `sector.slug_${locale}`;

let googlerank = sector?.googlerank;
let googlerank_fn=  `sector.googlerank`;

let note = sector?.note;
let note_fn=    `sector.note`;

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
      livelink=`${FRONTEND_DOMAIN}/se/${sector?.slug_tr}`;
}
else if (sector?.project=="yurtarama.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
      livelink=`${FRONTEND_DOMAIN}/${sector?.slug_tr}`;
}



livelink = layoutShellV2_Admin_GiveLiveLink({country_slug, city_slug, district_slug, subdistrict_slug, project:sector?.project, livelink})

let pagetype="sector";
let eadvlink=`/promo/edit?pagetype=${pagetype}&parent_slug=${slug}&parent_id=${sector?.id}`; // Reklamlara yönlendiren link
let advlink=`/categoricalads?project=${sector?.project}&sector=${sector?.slug_tr}`; // Reklamlara yönlendiren link

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


let save_regional_contentfunc = async (data) => {
  let { regional_content } = data ?? {};
  // var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
  // formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
  // console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
  let res =await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{type:"save_regional_content", ...data, parent_datakey:sectorclient?.datakey, parent_type:"sector", domain:sectorclient?.project,  } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 
}

let add_regional_contentfunc = async (data) => {
let {country_slug, city_slug, district_slug, subdistrict_slug} = data ?? {};

var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
  // formik?.setFieldValue(regional_descriptions_fn, [...regional_contents, {datakey, tr:{description:""}  }]);
  // console.log("sdasddassda", id, type, domain, parent_datakey, parent_type);
  let res =await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{type:"add_regional_content", country_slug, city_slug, district_slug, subdistrict_slug, parent_datakey:sectorclient?.datakey, parent_type:"sector", domain:sectorclient?.project, datakey } }) });  res = await res.json(); setTimeout(() => { queryClient.invalidateQueries(); }, 2000); return res; 
}   

     //return (<div>{JSON.stringify(sector?.project)}</div>)

if (!sector || isLoading) return <Loading/>

  return (<LayoutMain layout_title={name} suptitle={`Sektör ${country_slug ?? ""} ${city_slug ?? ""} ${district_slug ?? ""} ${subdistrict_slug ?? ""}`} pathname={pathname}>
                        <LayoutShellV2_Admin props=
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
                                        eadvlink,
                                        searchkeyword_fn,
                                        searchkeyword,
                                        contents_linked_fn,
                                        contents_linked,
                                        contents_removed_fn, 
                                        contents_removed, 
                                        contents_keywords_and_fn, 
                                        contents_keywords_and, 
                                        contents_keywords_not_fn, 
                                        contents_keywords_not,
                                        regional_contents,
                                        countryStateObj, cityStateObj, districtStateObj, subdistrictStateObj,

                                        save_regional_contentfunc,
                                        add_regional_contentfunc,
                                        project:sector?.project
                                      }}/>
                </LayoutMain>
  );

}







  

