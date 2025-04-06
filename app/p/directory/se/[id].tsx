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
import { LayoutMain } from "@/layouts/console/layoutmain";
import { layoutShellV2_Admin_GiveLiveLink } from '@/layouts/layoutshellv2_admin_givelivelink';
import { useEffect, useState } from 'react';



export default function  Sector_Core ({props}) {

  const router = useRouter();
  const {locale, defaultLocale, query:{id, country_slug, city_slug, district_slug, subdistrict_slug}}= router;    
  
  
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







  

