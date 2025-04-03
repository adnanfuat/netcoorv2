var keygen = require("keygenerator");
import { _userState } from "@/modules/constants/user";
import { ButtonV2 } from "@/modules/common/reuseable/button/buttonv2";
import { Textfield } from "@/modules/common/reuseable/textfield";
import { Button, Textarea } from "@/modules/common/reuseable";
import { arrayMoveImmutable } from "array-move";
import { Layout_Meta_Head } from "./layout_meta_head";
import s from "./layoutmeta_admin_v2.module.css";
import { useQuery } from "@tanstack/react-query";


export default function LayoutMeta_Admin_V2  ({props})  {

  let {project, meta_title, meta_description, meta_keywords, formik, meta_description_fn,rank, rank_fn, rank_masterfn, meta_title_masterfn, meta_title_fn, name,prefix,  locked_fn, active_fn, locked,active,  slug_authority, locked_authority, slug, slug_fn, slug_masterfn , contents_linked_fn, contents_linked,contents_removed_fn, contents_removed, contents_keywords_and_fn, contents_keywords_and, contents_keywords_not_fn, contents_keywords_not, googlerank_fn, googlerank, note_fn, note, searchkeyword_fn, searchkeyword } = props;
  
    const searchArticles = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"search_articles", searchkeyword, project } }) } ); res =  await res?.json();  return res; }; 
    
    let { data:articlesObj, isLoading, isFetching } = useQuery( {queryKey:["searcharticles", searchkeyword ], queryFn:async () => await searchArticles(), enabled:searchkeyword?.length>2});

    articlesObj = {...articlesObj, isLoading, isFetching}
    // return JSON.stringify(props)

    return ( <div>
                  
                  {/* {active ? "Kilitli" :"Pasif"}  */}
                             
                  <div style={{display:"flex", gap:20, flexDirection:"column"}}>

                       <Textfield id={meta_title} formik={formik} name={meta_title_fn} label={"Meta Title"} value={meta_title} disabled={locked}/>
                       <Textfield id={meta_description} formik={formik} name={meta_description_fn} label={"Meta Description"} value={meta_description} disabled={locked}/>
                       <Textfield id={rank} type="number" formik={formik} name={rank_fn} label={"Rank"} value={rank}  forceNumber={true} disabled={locked}/>   
                       <Textfield id={slug} formik={formik} name={slug_fn} label={"Slug"} value={slug}  disabled={locked || (!locked && !slug_authority)}/>   

                       <Textfield id={"googlerank"} type="number" formik={formik} name={googlerank_fn} label={"Google Rank"} value={googlerank} forceNumber={true}  disabled={locked}/>

                       <Textarea id={"note"} formik={formik} name={note_fn} label={"Yönetici notu"} value={note} row={8}  disabled={locked}/>
                                              
                       {/* searchArticles={searchArticles} */}

                       <Contents_Linked formik={formik} contents_linked_fn={contents_linked_fn} contents_linked={contents_linked} locked={locked} articlesObj={articlesObj} searchkeyword_fn={searchkeyword_fn} searchkeyword={searchkeyword}/>

                       <Contents_Removed formik={formik} contents_removed_fn={contents_removed_fn} contents_removed={contents_removed} locked={locked}  articlesObj={articlesObj} searchkeyword_fn={searchkeyword_fn} searchkeyword={searchkeyword} />

                       <Contents_Keywords_And formik={formik} contents_keywords_and_fn={contents_keywords_and_fn} contents_keywords_and={contents_keywords_and} locked={locked} />

                       <Contents_Keywords_Not formik={formik} contents_keywords_not_fn={contents_keywords_not_fn} contents_keywords_not={contents_keywords_not} locked={locked} />



                       {/* <Button props={{text:!locked ? `Açık` : `Kilitli`, title:!locked ? `Açık` : `Kilitli`, width:80, icon:!locked  ? "RiEyeLine" : "RiEyeOffLine", onClick:() => { formik?.setFieldValue( locked_fn, !locked ); }}}/>                                                                                                                 */}
                       <ButtonV2 props={{style:{width:180, height:40, backgroundColor: !locked ? `#d6ffd6` : `#ffcccc`, borderStyle:!locked ? `solid` : `dashed`}, title:!locked ? `Kilitli Değil` : `Kilitli`, text:!locked ? `Kilitli Değil` : `Kilitli`, disabled:!locked_authority, icon:!locked ? `RiLockUnlockLine` : `RiLock2Fill`, onClick:()=>formik?.setFieldValue(locked_fn, locked ? 0 : 1) }}   />
                       <ButtonV2 props={{style:{width:180, height:40, backgroundColor: active ? `#d6ffd6` : `#ffcccc`, borderStyle:active ? `solid` : `dashed`}, title:active ? `Aktif` : `Pasif`, text:active ? `Aktif` : `Pasif`, disabled:!locked_authority, icon:active ? `RiPlayFill` : `RiStopFill`, onClick:()=>formik?.setFieldValue(active_fn, active ? 0 : 1) }}   />

                       
                  </div>
                  
                  
                  { /* Admin Componentine tüm değerler gelmiyor. Fakat "Layout_Meta_Head", hem visitor hem de adminde kullanılıyor... EKsik gelen değerleri, formikten akan verilerle ayağa kaldırıyoruz. */}
                  
                  {/* name, slug, meta_title, prefix,  meta_keywords, meta_description, canonicalLangProblem, locale, pagetype  */}

                   <Layout_Meta_Head props={{                   
                                                 name, 
                                                 slug,
                                                 meta_title, 
                                                 prefix,
                                                 meta_keywords, 
                                                 meta_description
                                            }}/>

              </div>      
          )
  }


  const Contents_Removed = (props) => {

     let { formik, contents_removed, contents_removed_fn, locked,  searchkeyword_fn, searchkeyword, articlesObj } = props ?? {};

     // let contents_removed = formik?.values?.subsector?.contents_removed ?? [];
     // let contents_removed_fn = `subsector.contents_removed`;          
     
     let deleteFunc = ({selecteddatakey}) => {           
          formik?.setFieldValue(contents_removed_fn, contents_removed?.filter(co=>co?.datakey!=selecteddatakey) );               
          // console.log("sdasddassda");                          
     }
     

     let addFunc = () => {           
                           var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                           formik?.setFieldValue(contents_removed_fn, [...contents_removed, {datakey, content_datakey:undefined, fulldata:false  }]);
                           // --- console.log("sdasddassda");
                         }

     // return JSON.stringify(contents_removed)
     
     return (
     
          <div style={{display:"flex", flexDirection:"column", gap:20, marginTop:50}}>

               <div style={{backgroundColor:"#cee3ea", padding:10, borderRadius:8}}> Kaldırılan İçerikler </div>
               
               
                    <div style={{display:"flex", flexDirection:"column", gap:20}}>
                         

                              {contents_removed?.map((content_removed, index)=> {

                              const moveUp = () => { formik?.setFieldValue(contents_removed_fn, arrayMoveImmutable(contents_removed, index, index-1) ) /* Silme... */ }
                              const moveDown = () => { formik?.setFieldValue(contents_removed_fn, arrayMoveImmutable(contents_removed, index, index+1) ) /* Silme... */ }                        
                                                            
                                                            let content_removed_datakey_fn = `${contents_removed_fn}[${index}].datakey`;
                                                            let content_removed_datakey = content_removed?.datakey; // eval(`formik?.values?.subsector?.contents_removed?.[`+index+`]?.datakey`);


                                                            let content_removed_connection_datakey_fn = `${contents_removed_fn}[${index}].connection_datakey`;
                                                            let content_removed_connection_datakey = content_removed?.connection_datakey; // eval(`formik?.values?.subsector?.contents_removed?.[`+index+`]?.datakey`);
                                                            
                                                            let content_removed_note_fn = `${contents_removed_fn}[${index}].note`;
                                                            let content_removed_note_value = content_removed?.note;

                                                            let content_removed_fulldata_fn = `${contents_removed_fn}[${index}].fulldata`;
                                                            let content_removed_fulldata_value = content_removed?.fulldata;
                                                            
                                                            let content_removed_value = content_removed?.datakey;


                                                            return <div style={{display:"flex", gap:10, alignItems:"end"}}>
                                                                                {!locked && <Button props={{disabled:true, text:``, title:`Fulldata`, width:80, icon:"RiStarSFill", color:content_removed_fulldata_value? "green" :"black", onClick:() => {1==2 &&  formik?.setFieldValue(content_removed_fulldata_fn, !content_removed_fulldata_value ) }}}/>}
                                                                                {!locked &&<Button props={{icon:"IoArrowUpCircleOutline", title:"", onClick:moveUp}}/>}
                                                       <Button props={{icon:"IoArrowDownCircleOutline", title:"", onClick:moveDown}}/>
                                                                                <Textfield id={`${content_removed_value}+${index}`} formik={formik} name={content_removed_connection_datakey_fn} label={"İçerik Datakey"} value={content_removed_connection_datakey} style={{width:300}} disabled={locked} />
                                                                                <Textfield id={`${content_removed_value}+${index}`} formik={formik} name={content_removed_note_fn} label={"Not / Açıklama"} value={content_removed_note_value} style={{width:320}} disabled={locked}/>
                                                                                {!locked && <Button props={{text:``, title:`Sil`, width:80, icon:"RiDeleteBin2Line", onClick:() => { deleteFunc( {selecteddatakey:content_removed_datakey } ); }}}/>}

                                                                                <SelectArticle key={`${index}-Contents_Removed`} searchkeyword_fn={searchkeyword_fn} value={searchkeyword} articlesObj={articlesObj} formik={formik} connection_datakey_fn={content_removed_connection_datakey_fn}  connection_datakey={content_removed_connection_datakey} note_fn={content_removed_note_fn}  />
                                                                 </div>

                              })}

                    </div>

               
                    {!locked && <Button props={{text:`Kaldırılanlara ekle`, title:`Kaldırılanlara ekle`, width:180, icon:"IoAddOutline", onClick:() => { addFunc(); }}}/>}

          </div>          
     )

}





  const Contents_Linked = (props) => {

          let { formik, contents_linked, contents_linked_fn, locked, searchkeyword_fn, searchkeyword, articlesObj } = props ?? {};

          // let contents_linked = formik?.values?.subsector?.contents_linked ?? [];
          // let contents_linked_fn = `subsector.contents_linked`;          
          
          let deleteFunc = ({selecteddatakey}) => {           
               formik?.setFieldValue(contents_linked_fn, contents_linked?.filter(co=>co?.datakey!=selecteddatakey) );               
               // console.log("sdasddassda");                          
          }

          let addFunc = () => {           
                                var datakey = keygen._({ forceLowercase: true, specials: false, sticks: false, chars: true, length: 8 });                                                                                          
                                formik?.setFieldValue(contents_linked_fn, [...contents_linked, {datakey, content_datakey:undefined, fulldata:false  }]);
                                // --- console.log("sdasddassda");
                              }

          // return JSON.stringify(contents_linked)
          
          return (
          
               <div style={{display:"flex", flexDirection:"column", gap:20, marginTop:50}}>

                  {/* {JSON.stringify(articlesObj)} */}

                    <div style={{backgroundColor:"#cee3ea", padding:10, borderRadius:8}}> Bağlantılı İçerikler </div>
                                        
                         <div style={{display:"flex", flexDirection:"column", gap:20}}>
                              
                              
                                   {contents_linked?.map((content_linked, index)=> {

                                                                 const moveUp = () => { formik?.setFieldValue(contents_linked_fn, arrayMoveImmutable(contents_linked, index, index-1) ) /* Silme... */ }
                                                                 const moveDown = () => { formik?.setFieldValue(contents_linked_fn, arrayMoveImmutable(contents_linked, index, index+1) ) /* Silme... */ }                        
                                                                 
                                                                 let content_linked_datakey_fn = `${contents_linked_fn}[${index}].datakey`;
                                                                 let content_linked_datakey = content_linked?.datakey; // eval(`formik?.values?.subsector?.contents_linked?.[`+index+`]?.datakey`);


                                                                 let content_linked_connection_datakey_fn = `${contents_linked_fn}[${index}].connection_datakey`;
                                                                 let content_linked_connection_datakey = content_linked?.connection_datakey; // eval(`formik?.values?.subsector?.contents_linked?.[`+index+`]?.datakey`);
                                                                 
                                                                 let content_linked_note_fn = `${contents_linked_fn}[${index}].note`;
                                                                 let content_linked_note_value = content_linked?.note;

                                                                 let content_linked_keyword_fn = `${contents_linked_fn}[${index}].note`;
                                                                 let content_linked_keyword_value = content_linked?.note;

                                                                 let content_linked_fulldata_fn = `${contents_linked_fn}[${index}].fulldata`;
                                                                 let content_linked_fulldata_value = content_linked?.fulldata;

                                                                 let content_linked_fulldata_showimg_fn = `${contents_linked_fn}[${index}].fulldata_showimg`;
                                                                 let content_linked_fulldata_showimg_value = content_linked?.fulldata_showimg;
                                                                 
                                                                 let content_linked_value = content_linked?.datakey;


                                                                 return <div style={{display:"flex", gap:10, alignItems:"end"}}>


                                                                                     {!locked && <Button props={{text:``, title:`Fulldata`, width:80, icon:"RiStarSFill", color:content_linked_fulldata_value? "green" :"black", onClick:() => { formik?.setFieldValue(content_linked_fulldata_fn, !content_linked_fulldata_value ) }}}/>}
                                                                                     {!locked && <Button props={{icon:"IoArrowUpCircleOutline", title:"", onClick:moveUp}}/>}
                                                                                     <Button props={{icon:"IoArrowDownCircleOutline", title:"", onClick:moveDown}}/>
                                                                                     
                                                                                     <Textfield id={`${content_linked_value}+${index}`} formik={formik} name={content_linked_connection_datakey_fn} label={"İçerik Datakey"} value={content_linked_connection_datakey} style={{width:300}}  disabled={locked} />
                                                                                     
                                                                                     <Textfield id={`${content_linked_value}+${index}`} formik={formik} name={content_linked_note_fn} label={"Not / Açıklama"} value={content_linked_note_value} style={{width:320}}  disabled={locked}/>
                                                                                     
                                                                                     {!locked && <Button props={{text:``, title:`Sil`, width:80, icon:"RiDeleteBin2Line", onClick:() => { deleteFunc( {selecteddatakey:content_linked_datakey } ); }}} />}
                                                                                     

                                                                                     <SelectArticle key={`${index}-Contents_Linked`} searchkeyword_fn={searchkeyword_fn} value={searchkeyword} articlesObj={articlesObj} formik={formik} connection_datakey_fn={content_linked_connection_datakey_fn}  connection_datakey={content_linked_connection_datakey} note_fn={content_linked_note_fn}  />
                                                                                     
                                                                                     {(!locked) && <Button props={{text:``, title:`Resimler gözüksün mü?`, width:80, icon:"RiImage2Fill", color:content_linked_fulldata_showimg_value? "green" :"black", onClick:() => { formik?.setFieldValue(content_linked_fulldata_showimg_fn, !content_linked_fulldata_showimg_value ) }}}/>}

                                                                      </div>

                                   })}

                         </div>

                    
                         {!locked && <Button props={{text:`İçerik bağla`, title:`İçerik bağla`, width:180, icon:"IoAddOutline", onClick:() => { addFunc(); }}}/>}

               </div>          
          )

  }

  



  const Contents_Keywords_And = (props) => {

     let { formik,contents_keywords_and, contents_keywords_and_fn, locked  } = props ?? {};

     // let contents_keywords_and = formik?.values?.subsector?.contents_keywords_and ?? [];
     // let contents_keywords_and_fn = `subsector.contents_keywords_and`;          
     
     let deleteFunc = ({selectedkeyword}) => { formik?.setFieldValue(contents_keywords_and_fn, contents_keywords_and?.filter(co=>co!=selectedkeyword) ); }

     let addFunc = () => { formik?.setFieldValue(contents_keywords_and_fn, [...contents_keywords_and, ""]); }
     // return JSON.stringify(contents_keywords_and)
     
     return (
          <div style={{display:"flex", flexDirection:"column", gap:20, marginTop:50}}>

               <div style={{backgroundColor:"#cee3ea", padding:10, borderRadius:8}}> Keyword Genişletme </div>
               
                    <div style={{display:"flex", flexDirection:"column", gap:20}}>

                              {contents_keywords_and?.map((content, index)=> {
                                                                                                                   
                                                            let content_keyword_fn = `${contents_keywords_and_fn}[${index}]`;
                                                            let content_keyword_value = content; // eval(`formik?.values?.subsector?.contents_keywords_and?.[`+index+`]?.datakey`);                                                                                                                        

                                                            return <div style={{display:"flex", gap:10, alignItems:"end"}}>                                                                                                                                                                
                                                                                <Textfield id={`${content_keyword_value}+${index}`} formik={formik} name={content_keyword_fn} label={"Not / Açıklama"} value={content_keyword_value} style={{width:320}}  disabled={locked}/>
                                                                                {!locked && <Button props={{text:``, title:`Sil`, width:80, icon:"RiDeleteBin2Line", onClick:() => { deleteFunc( {selectedkeyword:content_keyword_value } ); }}}/>}
                                                                 </div>

                              })}

                    </div>
                    {!locked && <Button props={{text:`Keyword Genişlet`, title:`Keyword Genişlet`, width:180, icon:"IoAddOutline", onClick:() => { addFunc(); }}}/>}
          </div>          
     )
}




const Contents_Keywords_Not = (props) => {

     let { formik,contents_keywords_not, contents_keywords_not_fn, locked } = props ?? {};

     // let contents_keywords_not = formik?.values?.subsector?.contents_keywords_not ?? [];
     // let contents_keywords_not_fn = `subsector.contents_keywords_not`;          
     
     let deleteFunc = ({selectedkeyword}) => { formik?.setFieldValue(contents_keywords_not_fn, contents_keywords_not?.filter(co=>co!=selectedkeyword) ); }

     let addFunc = () => { formik?.setFieldValue(contents_keywords_not_fn, [...contents_keywords_not, ""]); }
     // return JSON.stringify(contents_keywords_not)
     
     return (
          <div style={{display:"flex", flexDirection:"column", gap:20, marginTop:50}}>

               <div style={{backgroundColor:"#cee3ea", padding:10, borderRadius:8}}> Keyword Daraltma </div>
               
                    <div style={{display:"flex", flexDirection:"column", gap:20}}>

                              {contents_keywords_not?.map((content, index)=> {
                                                                                                                   
                                                            let content_keyword_fn = `${contents_keywords_not_fn}[${index}]`;
                                                            let content_keyword_value = content; // eval(`formik?.values?.subsector?.contents_keywords_not?.[`+index+`]?.datakey`);                                                                                                                        

                                                            return <div style={{display:"flex", gap:10, alignItems:"end"}}>                                                                                                                                                                
                                                                                <Textfield id={`${content_keyword_value}+${index}`} formik={formik} name={content_keyword_fn} label={"Not / Açıklama"} value={content_keyword_value} style={{width:320}}  disabled={locked}/>
                                                                                {!locked && <Button props={{text:``, title:`Sil`, width:80, icon:"RiDeleteBin2Line", onClick:() => { deleteFunc( {selectedkeyword:content_keyword_value } ); }}}/>}
                                                                 </div>

                              })}

                    </div>
                    {!locked && <Button props={{text:`Keyword Daralt`, title:`Keyword Daralt`, width:180, icon:"IoAddOutline", onClick:() => { addFunc(); }}}/>}
          </div>          
     )
}







const SelectArticle = (props) => {


     let {key, articlesObj, searchkeyword_fn, searchkeyword, formik, connection_datakey_fn, connection_datakey, note_fn } = props ?? {};
     let {list, total, isFetching, isLoading} = articlesObj ?? {};

     let selectedarticle=list?.find(a=>a?.key==connection_datakey);
     
 return (
   <div  className={s.selectcompanywr}> 
   
               {/*  {experince_project}  */}  
               {/*  {experince_company_slug}     */}
               {/* {JSON.stringify(selectedarticle)}   */}
               {/* {JSON.stringify({title_tr:experince_company_text, slug_tr:experince_company_slug})} */}
     
   <input type="text" key={key+"keyword"} value={searchkeyword} onChange={(e)=>formik?.setFieldValue(searchkeyword_fn, e?.target?.value) } placeholder="Anahtar kelime yazın"  style={{width:190}}/>  
   
                 {/* && */}

                 {(list?.length>0 && !isFetching && !isLoading  ) && 
                 
                 <div className={s.selectwr}> 
                             <select 
                                  className={s.select}
                                   value={JSON.stringify(selectedarticle)}
                                   onChange={(e)=>                              
                                                     {                                                             
                                                           if (e?.target?.value!="") {                                                      
                                                                   let valueObj=JSON.parse(e?.target?.value);                                                      
                                                                   formik?.setFieldValue(connection_datakey_fn, valueObj?.key);
                                                                   formik?.setFieldValue(note_fn, valueObj?.title_tr); 
                                                                   // console.log("valueObj?.slug_tr1:: ", valueObj?.slug_tr, valueObj?.title_tr); 
                                                           }                                                   
                                                           else 
                                                                 {
                                                                      formik?.setFieldValue(connection_datakey_fn, "");
                                                                      formik?.setFieldValue(note_fn, "");
                                                                 }
                                                     }                                        
                                         }                                  
                                   >
 
                                   <option value={""}>Seçiniz</option>
                                     {list?.map(article=>{
                                     return <option value={JSON.stringify(article)}>   {article?.title_tr}  </option>
                                     }
                                     )}
                             </select>
                             
                             { (list?.length>0 ) &&  <div className={s.selectlength}>  {total} kayıt var </div> }
                 </div>
                 }
 
                 {(!isLoading && list?.length==0 && searchkeyword?.length>0) ?  
                   "Aranan firma bulunamadı"    
                   :
                   (isLoading) && "Arama yapılıyor"
 
                 }
                 
                                                                                   
   </div>
 )
 }