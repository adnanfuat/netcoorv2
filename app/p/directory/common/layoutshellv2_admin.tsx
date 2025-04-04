import {Button} from "@/modules/common/reuseable/button";
import { useRouter } from "next/navigation";
import { tabStatesFunc_WithKey } from "@/modules/functions/tabstatesfunc_withkey";
import {Textarea} from "@/modules/common/reuseable/textarea";
import {Textfield} from "@/modules/common/reuseable/textfield";
import s from "./layoutshellv2_admin.module.css"
import { SingleSelect } from "@/modules/common/reuseable/select/singleselect";
import { useFormik } from "formik";
import { useState } from "react";
import Region from "@/modules/common/region";
import { RiExchangeFundsFill, RiEye2Line, RiListUnordered } from "react-icons/ri";
import LayoutMeta_Admin_V2 from "./layoutmeta_admin_v2"
import { useSearchParams } from "next/navigation";
import { OperatorButtonV2 } from "@/modules/common/reuseable/button/operatorbuttonv2";
import { cachecountriesv3hook_next15 } from "@/modules/functions/cachecountriesv3hook_next15";
import Link from "next/link";


export const LayoutShellV2_Admin = ({props}) => {

    let {
          formik, 
          locked,
          active,
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
          note_fn, note,
          name, 
          canonicalLangProblem, 
          prefix, 
          locked_fn, 
          active_fn,
          slug_authority, 
          locked_authority, 
          category_authority, 
          adv_authority,           
          slug_fn, 
          slug,          
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
          regional_contents,
          save_regional_contentfunc,
          add_regional_contentfunc,
          project,
          countryStateObj,
          cityStateObj,
          districtStateObj,
          subdistrictStateObj,
          userdata,
          pathObj,
          
       } = props;
      
        // return JSON.stringify(pathObj)

 let router = useRouter();

 const searchParams = useSearchParams(); 

 const country_slug = searchParams.get('country_slug');
 const city_slug = searchParams.get('city_slug');
 const district_slug = searchParams.get('district_slug');
 const subdistrict_slug = searchParams.get('subdistrict_slug');

 const id = searchParams.get('id');

 let locale="tr";

 let isTechnician  =  userdata?.userscopes.isTechnician;
 let patreonAuth  =  userdata?.userscopes.isPatreon;
 locked = !patreonAuth ? true : locked; // Yedek: !category_authority ? true : locked; // Eğer kullanıcının category düzeşeöe yetkisi yoksa komple locked konumuna getir. Sadece reklamlar linkine tıklasın yeter.. // Bir negatifi. Düzenle butonu kilitli gözüküyor. // Sanki gerçekten o kategori kilitli gibi. Bir mantık hatası gibi durum var. Ama çok önemli değil...s


if (!isTechnician) return undefined      
// return (<div>{JSON.stringify(regional_contents)}</div>)



return ( 
<form onSubmit={formik.handleSubmit}>

<div className={s.shell}>
        
        <div className={s.name}>

                {adv_authority && <div className={s.adsbutton}>
                                        
                        {/* <Link href={listingPath} className={s.visit} title="Konsol > Firmalarım"><RiListUnordered/></Link> */}
                        {(active) ? <Link href={`/p/directory/companies?sector=${pathObj?.sector}&subsector=${pathObj?.subsector}&cclass=${pathObj?.cclass}&label=${pathObj?.label}`} className={s.visit} title="Konsol > Görüntüle"> <RiEye2Line /> </Link> : undefined}                                                                                                
                        {(active && project=="sakaryarehberim.com" ) ? <Link href={`${project}/su/${slug}`} className={s.visit} title="Proje > Görüntüle" style={{ fontWeight:"bold", color:"#d43b3b"}}> SR </Link> : undefined}   
                        {(active && project=="yurtarama.com" ) ? <Link href={`${project}/su/${slug}`} className={s.visit} title="Proje > Görüntüle" style={{ fontWeight:"bold", color:"#d43b3b"}}> YA </Link> : undefined}                                                             

                <Button props={{title:"Kategori düzenle", width:150, icon:"IoArrowBackCircleSharp" , onClick:()=>router.back() }}/> 
                        
                <Button props={{onClick:()=>{router.push(eadvlink)}, text:`E. Reklamlar`, icon:`RiMagicFill`, disabled:false, width:180}}/> <Button props={{onClick:()=>{router.push(advlink)}, text:`Y. Reklamlar`, icon:`RiMagicFill`, disabled:false, width:180}}/></div> }
                
                <Textfield  formik={formik} name={selectedlang_name_fn} label={"İsim"} value={selectedlang_name} disabled={locked} style={{backgroundColor:"#ececec", fontWeight:"bold", fontSize:20}}/>

        </div>

        <div className={s.desctop}><Textarea formik={formik} name={pagedetail1_fn} label={"Açıklama 1"} value={pagedetail1} disabled={locked} style={{backgroundColor:"#ececec"}}/></div>

        <div className={s.descbottom}><Textarea formik={formik} name={pagedetail2_fn} label={"Açıklama 2"} value={pagedetail2} disabled={locked} style={{backgroundColor:"#ececec"}}/></div>


        <Regional_Contents regional_contents={regional_contents} locked={locked} locale={locale} save_regional_contentfunc={save_regional_contentfunc} add_regional_contentfunc={add_regional_contentfunc} countryStateObj={countryStateObj} cityStateObj={cityStateObj} districtStateObj={districtStateObj} subdistrictStateObj={subdistrictStateObj}/>
        

        {/* {JSON.stringify(contents_linked)}        */}
        {/* {console.log("!!!!!!!!!!!!!::::::::: ", contents_linked)} */}

        <div className={s.meta}> <LayoutMeta_Admin_V2 props={{project, meta_title, meta_description, meta_keywords, rank, formik,  meta_title_fn, meta_description_fn, rank_fn, name, canonicalLangProblem, prefix, locked_fn, active_fn, locked, active, slug_authority, locked_authority,  slug_fn, slug, googlerank_fn, googlerank, note_fn, note, contents_linked_fn, contents_linked, contents_removed_fn, contents_removed, contents_keywords_and_fn, contents_keywords_and, contents_keywords_not_fn, contents_keywords_not,  searchkeyword_fn, searchkeyword, }}/> </div>


        <div className={s.buttons}>
                                                
                {/* {livelink} */}

                {/* Formu butonu */}
                {(formik?.dirty && !locked  )  && <OperatorButtonV2 props={{ icon:"Clear", backgroundColor:"#ff621d", handleClick:formik?.resetForm,  button_text:{enabled:"Formu temizle", disabled:"Değişiklik yok"}, disable:(formik?.isSubmitting || !formik?.dirty) }} /> }


                {/* Kaydet butonu */}
                {!locked ?<OperatorButtonV2 props={{ icon:"Save", handleClick:formik?.handleSubmit,  button_text:{enabled:"Kaydet", disabled:"Kaydediliyor"}, disable: (formik?.isSubmitting || !formik?.dirty) }} /> : undefined }

                {/* {livelink} */}
                {/* İzle/Düzenle butonu */}
                <OperatorButtonV2 props={{ icon:"Eye", backgroundColor:"#2db6ff", handleClick:()=>router.push(livelink),  button_text:{enabled: "İzle" , disabled:"Kaydet ya da temizle"}, disable:formik?.dirty }} /> 
                           
        </div>

                                
         {/* <div className={s.navigator}><NavigatorCategories props={{getnext, getbefore, up, pagetype, locale}}/></div>  */}

</div>
</form>
)
}


let Regional_Contents = (props) => {

        
let { regional_contents, regional_descriptions_fn, locked, locale, save_regional_contentfunc, add_regional_contentfunc, countryStateObj, cityStateObj, districtStateObj, subdistrictStateObj, } = props ?? {};



        const countriesv2_alldataFunc = async () => {
                let res = await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data: { type: "countriesv2_alldata", givedistricts: true } }) }); res = await res?.json();
                //console.log("resssssssssssdddss", res); 
                return res;
        };
let { data:countries } = cachecountriesv3hook_next15({givedistricts:true});

let countries_options = countries?.map(country=>{return country =  {label:country?.title_tr, value:country?.slug_tr}}) ?? [];
    countries_options = [ {label:"Seçiniz", value:""}, ...countries_options ];

    const [processing, setprocessing] = useState(false);



//  return JSON.stringify(contents_linked);

return (<div style={{display:"flex", flexDirection:"column", gap:20, marginTop:50}} className={s.descmulti}> 

          <div style={{backgroundColor:"#cee3ea", padding:10, borderRadius:8, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                
                 <div>
                        <div>Bölgesel Açıklamalar</div>

                        {countryStateObj ? <Region countryStateObj={countryStateObj} cityStateObj={cityStateObj} districtStateObj={districtStateObj} subdistrictStateObj={subdistrictStateObj}  /> : null}

                 </div>       

{/* {country_slug} */}
                 {!locked && <Button props={{text:`Bölgesel içerik bağla`, disabled:processing,  title:`Bölgesel içerik bağla`, width:240, icon:"IoAddOutline", onClick:() => { 
                                
                                add_regional_contentfunc({country_slug:countryStateObj[0], city_slug:cityStateObj[0], district_slug:districtStateObj[0], subdistrict_slug:subdistrictStateObj[0]}); 

                                setprocessing(true)
                                setTimeout(() => {
                                        setprocessing(false); // Bir süreliğine ekleme butonunu disable yapalım
                                }, 5000);

                                }}}/>}

                 
        </div>          
          
          


          <div style={{display:"flex", flexDirection:"column", gap:10}}>
                
                         {/* { JSON.stringify(regional_contents?.[0]) } */}
                    
                         {regional_contents?.map((regional_content, index)=> {
                                                                        return <Regional_Content regional_content={regional_content} locale={locale} countries={countries} countries_options={countries_options} save_regional_contentfunc={save_regional_contentfunc}/>
                         })}

               </div>
          


     </div>          
)


}




const Regional_Content = (props) => {

        let { regional_content, locale, countries, countries_options, save_regional_contentfunc } = props ?? {};


        const formik = useFormik({
                                        enableReinitialize: true, 
                                        initialValues: { regional_content },
                                        onSubmit: async (values, {setSubmitting}) => {  
                                                                                
                                                                                        //  setSubmitting(true);  await updateFunc({values}); setSubmitting(false);
                                                                                
                                                                                },   // .then(()=>{ queryClient.invalidateQueries(); setSubmitting(false) })
                                 }); 

        // console.log("cq2", formik?.values?.regional_content?.description1_tr);

        regional_content = formik?.values?.regional_content;

       let deleted_fn   = `regional_content.deleted`;
       let deleted      = regional_content?.deleted;
                                       
       let locked      = regional_content?.locked;

       let pagedetail1_fn  = `regional_content.description1_${locale}`;
       let pagedetail1     = eval(`regional_content?.description1_${locale}`);

       let pagedetail2_fn  = `regional_content.description2_${locale}`;
       let pagedetail2     = eval(`regional_content?.description2_${locale}`);

       let datakey_fn  = `regional_content.datakey`;
       let datakey     = regional_content?.datakey;

      

       let rank_fn  = `regional_content.rank`;
       let rank     = regional_content?.rank;

       let country_slug_fn      =  `regional_content.country_slug`;
       let country_slug         =  regional_content?.country_slug;

       let city_slug_fn      =  `regional_content.city_slug`;
       let city_slug         =  regional_content?.city_slug;

       let district_slug_fn      =  `regional_content.district_slug`;
       let district_slug         =  regional_content?.district_slug;

       let subdistrict_slug_fn      =  `regional_content.subdistrict_slug`;
       let subdistrict_slug         =  regional_content?.subdistrict_slug;


       let incomingcountry=regional_content?.country_slug; // Country bulduysan onu ata, yoksa Türkiye'yi ata...
                                    
       let country=countries?.find(co=>co?.slug_tr==incomingcountry);                

       let cities_options=country?.cities?.map(a=>({label:a?.title_tr, value:a?.slug_tr})) ?? [];
       cities_options = cities_options?.length>0 ? [ {label:"Seçiniz", value:""}, ...cities_options ] : [];

       let incomingcity=regional_content?.city_slug;

       let city=country?.cities?.find(co=>co?.slug_tr==incomingcity);

       let districts_options=city?.districts?.map(a=>({label:a?.title_tr, value:a?.slug_tr})) ?? [];
       districts_options = districts_options?.length>0 ? [ {label:"Seçiniz", value:""}, ...districts_options ] : [];

       let district=city?.districts.find(di=>di?.slug_tr==regional_content?.district_slug);        
       
       let subdistricts_options=district?.subdistricts?.map(a=>({label:a?.title_tr, value:a?.slug_tr})) ?? [];
       subdistricts_options = subdistricts_options?.length>0 ? [ {label:"Seçiniz", value:""}, ...subdistricts_options ] : [];

       let title_fn  = `regional_content.title_${locale}`;
       let title     = eval(`regional_content?.title_${locale}`);

       let metadescription_fn  = `regional_content.meta_${locale}.description`;
       let metadescription     = eval(`regional_content?.meta_${locale}?.description`);     

       let metatitle_fn  =   `regional_content.meta_${locale}.title`; 
       let metatitle     =   eval(`regional_content?.meta_${locale}?.title`); 


        const moveUp = () =>   { formik?.setFieldValue(rank_fn, rank+10 ); }
        
        const moveDown = () => { formik?.setFieldValue(rank_fn, rank-10 ); }

        const panelStates        =  useState([]); //  panellerin açık kapalı durumu.. Direk hepsi açık gelince çok çirkin bir görüntü oluşuyor

        // sad

        let open = panelStates[0]?.find(t=>t?.key==regional_content?.datakey)?.state;
        console.log("::::.1111 ",regional_content);



       return <div style={{display:"flex", gap:8, flexDirection:"column"}}>
                    <div className={s.titlewr}  onClick={ ()=>{ tabStatesFunc_WithKey({ key:regional_content?.datakey, set_tabstates:panelStates[1] }); }  }> 
                                        
                                                <div>
                                                { regional_content?.id } - { regional_content?.country_slug } 
                                                </div>
                                                
                                                <div>
                                                { regional_content?.city_slug } { (typeof regional_content?.subdistrict_slug =="string" && regional_content?.subdistrict_slug=="") && <RiExchangeFundsFill title="city_slug ~ string hatası" color="darkpurple"/> }
                                                </div>

                                                <div>
                                                { regional_content?.district_slug } {(typeof regional_content?.district_slug =="string" && regional_content?.district_slug=="") && <RiExchangeFundsFill title="district_slug ~ string hatası" color="darkred" />  } 
                                                </div>               

                                                <div>
                                                { regional_content?.subdistrict_slug } {(typeof regional_content?.subdistrict_slug =="string" && regional_content?.subdistrict_slug=="") && <RiExchangeFundsFill title="subdistrict_slug ~ string hatası" color="darkblue" />  } 
                                                </div>
                     
                      </div>

                      {open && <div style={{display:"flex", gap:10,  flexDirection:"column", marginBottom:50}}>
        

                        <div style={{display:"flex", gap:10, alignItems:"end"}}> 
                        
                                {/* { JSON.stringify(regional_content) } */}

                                <Button props={{icon:"IoSave", title:"", onClick:()=>save_regional_contentfunc({regional_content}), disabled:!formik?.dirty, color:formik?.dirty ? "green" : "gray" }}/>

                                {!locked && <Button props={{icon:"IoArrowUpCircleOutline", title:"", onClick:moveUp}}/>}

                                <Button props={{icon:"IoArrowDownCircleOutline", title:"", onClick:moveDown}}/>

                                <Textfield id={`${regional_content?.id}+${regional_content?.datakey}`} formik={formik} name={datakey_fn} label={"İçerik Datakey"} value={datakey} style={{width:90}}  disabled={locked} />

                                <Textfield id={`${regional_content?.id}+${regional_content?.datakey}+rank`} formik={formik} name={rank_fn} label={"Sıralama"} value={rank} style={{width:50}}  disabled={locked}/>
                                
                                {!locked && <Button props={{text:``, title:`Sil`, color: deleted ? "darkred" : "black" , width:80, icon:"RiDeleteBin2Line", onClick:() => { formik?.setFieldValue(deleted_fn, !deleted);  }  }} />}                                                                        

                                {countries_options?.length>1 ? <div style={{display:"flex", gap:10, }}>
                                                                                
                                                                                <SingleSelect
                                                                                        formik={
                                                                                        formik
                                                                                        }
                                                                                        name={country_slug_fn}
                                                                                        label={
                                                                                        "Ülke"
                                                                                        }
                                                                                        value={country_slug}
                                                                                        options={ countries_options }
                                                                                        style={{width:140}}
                                                                                        // Bir şekilde çalışmıyor
                                                                                        // triggerFuncs={
                                                                                        //             [
                                                                                        //                   (e)=>{
                                                                                        //                         formik?.setFieldValue("university.city_slug", "" );
                                                                                        //                         formik?.setFieldValue("university.district_slug", "" );
                                                                                        //                         formik?.setFieldValue("university.subdistrict_slug", "" );
                                                                                        //                   }
                                                                                        //             ]}
                                                                                />

                                                                        {country_slug && cities_options?.length>0 &&  <SingleSelect
                                                                                        formik={
                                                                                        formik
                                                                                        }
                                                                                        name={city_slug_fn}
                                                                                        label={
                                                                                        "Şehir"
                                                                                        }
                                                                                        value={city_slug}
                                                                                        options={
                                                                                        cities_options
                                                                                        }
                                                                                        style={{width:140}}
                                                                                        selecttext={
                                                                                        true
                                                                                        }
                                                                                />}


                                                                               
                                                                        {city_slug && districts_options?.length>0 && <SingleSelect
                                                                                        formik={
                                                                                        formik
                                                                                        }
                                                                                        name={district_slug_fn}
                                                                                        label={
                                                                                        "İlçe"
                                                                                        }
                                                                                        value={ district_slug }
                                                                                        options={ districts_options }
                                                                                        style={{width:140}}
                                                                                />}

                                                                        {district_slug && subdistricts_options?.length>0 && <SingleSelect
                                                                                        formik={ formik }
                                                                                        name={subdistrict_slug_fn}
                                                                                        label={ "Mahalle" }
                                                                                        value={ subdistrict_slug }
                                                                                        options={ subdistricts_options }
                                                                                        fullwidth
                                                                                        selecttext={ true }
                                                                                />}
                                                                                
                                                                              
                                                                        </div>
                                                                        
                                                                :
                                                                <div style={{display:"flex", paddingBottom:9 }}> Ülkeler yüklenirken bekleyiniz. </div>        
                                                                }



                        </div>           


                        <div style={{display:"flex", gap:10, flexDirection:"column"}}>

                                <Textfield id={`${regional_content?.id}+${regional_content?.datakey}-title`} formik={formik} name={title_fn} label={"Sayfa Başlığı"} value={title} style={{width:"100%"}} disabled={locked}/>                                
                                <Textfield id={`${regional_content?.id}+${regional_content?.datakey}-metatitle`} formik={formik} name={metatitle_fn} label={"Meta Title"} value={metatitle} style={{width:"100%"}} disabled={locked}/>                                
                                <Textarea formik={formik} name={metadescription_fn} label={"Meta Description"} value={metadescription} disabled={locked} fullwidth={true} row={3}/>
                                <Textarea formik={formik} name={pagedetail1_fn} label={"Açıklama 1"} value={pagedetail1} disabled={locked} fullwidth={true} row={8}/>
                                <Textarea formik={formik} name={pagedetail2_fn} label={"Açıklama 2"} value={pagedetail2} disabled={locked} fullwidth={true}  row={8}/>
                                {/* <div className={s.descbottom}><Textarea formik={formik} name={pagedetail2_fn} label={"Açıklama 2"} value={pagedetail2} disabled={locked}/></div> */}
                        </div>
                      </div>}

                 
        </div>
       
       

}

