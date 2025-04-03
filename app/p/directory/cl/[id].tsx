
import { useFormik} from 'formik';
import { useQueryClient} from "react-query";
import { useRouter } from 'next/router';
import { Loading} from  "@/components/commonnew/loading";
import { LayoutShellV2_Admin} from '@/components/layouts/layoutshellv2_admin';
import { titlePrefixer } from '@/components/commonnew/titleprefixer';
import { capitalizeFirstLetter } from '@/components/utilsnew/capitalizefirstletter';
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import { isLogged} from "@/components/hooksnew/islogged";
import { useQuery} from "react-query";
import { LayoutMain } from '@/layouts/console/layoutmain';
import { useState } from 'react';
import { layoutShellV2_Admin_GiveLiveLink } from '@/layouts/layoutshellv2_admin_givelivelink';


export default function  Cclass_Core ({props}) {
  
  const router = useRouter();
  const {locale, defaultLocale, query:{id, country_slug, city_slug, district_slug, subdistrict_slug}}= router;    
  
  const countryStateObj =  useState(country_slug);
  const cityStateObj =  useState(city_slug);
  const districtStateObj =  useState(district_slug);
  const subdistrictStateObj =  useState(subdistrict_slug);

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
  
  const fetcher = async () => { let res= await fetch(`/api/cclass_admin`, { method: "POST", body: JSON.stringify({ data:{ id, locale, defaultLocale } }) } ); res =  await res?.json(); return res; };
                  
  const {  data:cclassclient, isLoading } = useQuery( ["cclassquery"], () => fetcher() , { enabled:(!!id && loginAndAuthorized) } );
                          

          // return (<div>{JSON.stringify(cclassclient)}</div>)

              const updateFunc = async ({values}) => {  let res = await fetch("/api/cclassmutation_update", { method: "POST", body: JSON.stringify({ data:{type:"cclassmutation_update", ...values} }) }); res=await res?.json();queryClient.invalidateQueries(); console.log("resres:1", res); return res;  }; 

                const formik = useFormik({
                                            enableReinitialize: true, initialValues: { cclass:cclassclient },
                                            onSubmit: async (values, {setSubmitting}) => {  setSubmitting(true);  await updateFunc({values}); setSubmitting(false);    },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
                                        });   
      
let cclass=formik?.values?.cclass;

  
/////////--- (s)

let contents_linked = eval(`cclass?.contents_linked`) ?? [];
let contents_linked_fn = `cclass.contents_linked`;

let contents_removed = eval(`cclass?.contents_removed`) ?? [];
let contents_removed_fn = `cclass.contents_removed`;

let contents_keywords_and = eval(`cclass?.contents_keywords_and`) ?? [];
let contents_keywords_and_fn = `cclass.contents_keywords_and`;

let contents_keywords_not = eval(`cclass?.contents_keywords_not`) ?? [];
let contents_keywords_not_fn = `cclass.contents_keywords_not`;


let searchkeyword = eval(`cclass?.searchkeyword`) ?? undefined;
let searchkeyword_fn = `cclass.searchkeyword`;

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
let locked = eval(`cclass?.locked`)
let locked_fn = `cclass.locked`;

let active = eval(`cclass?.active`)
let active_fn = `cclass.active`;

let slug = eval(`cclass?.slug_${locale}`);
let slug_fn=    `cclass.slug_${locale}`;

let googlerank = cclass?.googlerank;
let googlerank_fn=    `cclass.googlerank`;

let note = cclass?.note;
let note_fn=  `cclass.note`;

let { prefix } = titlePrefixer({type:"cclass", countries, slug }); prefix = capitalizeFirstLetter(prefix);

let slug_authority=permissionsControlV3({askList:["category_slug"], type:"some", permissions});  // Slug değiştirme yetkisi...?
let locked_authority=permissionsControlV3({askList:["category_lock"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let adv_authority=permissionsControlV3({askList:["advertisement"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let category_authority=permissionsControlV3({askList:["category"], type:"some", permissions}); 


let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
if (cclass?.project=="sakaryarehberim.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
}
else if (cclass?.project=="yurtarama.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
}


let livelink=`${FRONTEND_DOMAIN}/cl/${cclass?.subsector}/${cclass?.slug_tr}`; // sub
livelink = layoutShellV2_Admin_GiveLiveLink({country_slug, city_slug, district_slug, subdistrict_slug, project:cclass?.project, livelink})

// let livelink=`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/cl/${cclass?.slug_tr}`;
let pagetype="cclass";
let eadvlink=`/promo/edit?pagetype=${pagetype}&parent_slug=${slug}&parent_id=${cclass?.id}`; // Reklamlara yönlendiren link
let advlink=`/categoricalads?project=${cclass?.project}&sector=${cclass?.sector}&subsector=${cclass?.subsector}&cclass=${cclass?.slug_tr}`; // Reklamlara yönlendiren link


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

let pathname = `/cl/${cclass?.id}`;


// return (<div>{JSON.stringify(pathname)}</div>)

if (!cclass || isLoading) return <Loading/>

  return (<LayoutMain layout_title={name} suptitle={`Sınıflandırma ${country_slug ?? ""} ${city_slug ?? ""} ${district_slug ?? ""} ${subdistrict_slug ?? ""}`} pathname={pathname}>
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
                                      countryStateObj, cityStateObj, districtStateObj, subdistrictStateObj,
                                      project:cclass?.project
                                    }}/>
           </LayoutMain>
  );

}




















  
  

