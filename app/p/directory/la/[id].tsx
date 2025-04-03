
import permissionsControl_CategoryV2 from "@/components/hooksnew/permissionscontrol_categoryv2";
import {useFormik} from 'formik';
import {GraphQLClient} from "graphql-request";
import {useQueryClient} from "react-query";
import { useQuery} from "react-query";
import {labelAuthorizedClientModeV2} from '@/components/hooksnew/labelauthorizedclientmodev2';
import {useRouter } from 'next/router';
import { Loading} from  "@/components/commonnew/loading";
import {LayoutShellV2_Admin} from '@/components/layouts/layoutshellv2_admin';
import {titlePrefixer } from '@/components/commonnew/titleprefixer';
import {capitalizeFirstLetter } from '@/components/utilsnew/capitalizefirstletter';
import {cacheCountries} from '@/modules/functions/cachecountries';
import permissionsControlV3 from "@/modules/functions/permissionscontrolv3";
import {isLogged} from "@/components/hooksnew/islogged";
import { LayoutMain } from "@/layouts/console/layoutmain";



export default function  Label_Core ({props}) {


  const router = useRouter();
  const {locale, defaultLocale, query:{id, country_slug, city_slug, district_slug, subdistrict_slug}}= router;    

  let pathname = `/la/${id}`;

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


  // let {labelclient, isLoading} = labelAuthorizedClientModeV2({whichPermissions:["category","advertisement"], user, queryparameters:{id}})
  const fetcher = async () => { let res= await fetch(`/api/label_admin`, { method: "POST", body: JSON.stringify({ data:{ id, locale, defaultLocale } }) } ); res =  await res?.json(); return res; };
                  
  const {  data:labelclient, isLoading } = useQuery( ["labelquery"], () => fetcher() , { enabled:(!!id && loginAndAuthorized) } );
                          

          //  return (<div>{JSON.stringify(labelclient)}</div>)

              const updateFunc = async ({values}) => {  let res = await fetch("/api/labelmutation_update", { method: "POST", body: JSON.stringify({ data:{type:"labelmutation_update", ...values} }) }); res=await res?.json();queryClient.invalidateQueries(); console.log("resres:1", res); return res;  }; 

                const formik = useFormik({
                                enableReinitialize: true, initialValues: { label:labelclient },
                                onSubmit: async (values, {setSubmitting}) => {  setSubmitting(true);  await updateFunc({values}); setSubmitting(false);    },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
                              });   
      
let label=formik?.values?.label;


  
/////////--- (s)

let contents_linked = eval(`label?.contents_linked`) ?? [];
let contents_linked_fn = `label.contents_linked`;

let contents_removed = eval(`label?.contents_removed`) ?? [];
let contents_removed_fn = `label.contents_removed`;

let contents_keywords_and = eval(`label?.contents_keywords_and`) ?? [];
let contents_keywords_and_fn = `label.contents_keywords_and`;

let contents_keywords_not = eval(`label?.contents_keywords_not`) ?? [];
let contents_keywords_not_fn = `label.contents_keywords_not`;

let searchkeyword = eval(`label?.searchkeyword`) ?? undefined;
let searchkeyword_fn = `label.searchkeyword`;



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
let locked = eval(`label?.locked`)
let locked_fn = `label.locked`;



let active = eval(`label?.active`)
let active_fn = `label.active`;

let slug = eval(`label?.slug_${locale}`);
let slug_fn=    `label.slug_${locale}`;

let googlerank = label?.googlerank;
let googlerank_fn= `label.googlerank`;

let note = label?.note;
let note_fn=  `label.note`;


let { prefix } = titlePrefixer({type:"label", countries, slug }); prefix = capitalizeFirstLetter(prefix);

let slug_authority=permissionsControlV3({askList:["category_slug"], type:"some", permissions});  // Slug değiştirme yetkisi...?
let locked_authority=permissionsControlV3({askList:["category_lock"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?
let adv_authority=permissionsControlV3({askList:["advertisement"], type:"some", permissions});  // Categoryleri kiteleme yetkisi?



let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
if (label?.project=="sakaryarehberim.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
}
else if (label?.project=="yurtarama.com") 
{
      FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
}



let category_authority=permissionsControlV3({askList:["category"], type:"some", permissions}); 

let livelink=`${FRONTEND_DOMAIN}/la/${label?.slug_tr}`;



let pagetype="label";
let eadvlink=`/promo/edit?pagetype=${pagetype}&parent_slug=${slug}&parent_id=${label?.id}`; // Reklamlara yönlendiren link
let advlink=`/categoricalads?project=${label?.project}&label=${label?.slug_tr}`; // Reklamlara yönlendiren link

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


  //  return (<div>{JSON.stringify(pagedetail1)}</div>)

if (!label || isLoading) return <Loading/>

  return (<LayoutMain layout_title={name} suptitle={`Etiket ${label?.project ?? ""} ${country_slug ?? ""} ${city_slug ?? ""} ${district_slug ?? ""} ${subdistrict_slug ?? ""} `} pathname={pathname}>
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

                                        project:label?.project
                                      }}/>
                </LayoutMain>
  );

}







  
// let { gql } = require("graphql-request");

// export const LabelMutation_Update = gql
// `
//  mutation LabelMutation_Update( $data: JSON ) {
//    labelmutation_update( data: $data ) {
//      id 
//      title_tr
//    }
//  }
// `;
