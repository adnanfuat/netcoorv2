import s from "./myaccount_contracts.module.css";
import { DateTime } from "luxon";
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import { datetimeDiffFunc } from "@/modules/functions/datetimedifffunc";
import generateImgUrlFromFullPathObj from '@/modules/functions/generateimgurlfromfullpathobj';
import Link from "next/link";
import { Button } from "@/modules/common/reuseable";
import { RiShareForward2Line,RiHeart3Fill, RiVipCrown2Line, RiAspectRatioFill , RiMedal2Fill , RiFileList2Fill,RiAlertFill ,  RiLightbulbFlashFill,  RiXboxFill, RiLightbulbFlashLine , RiExternalLinkFill,RiCloseLine , RiAddFill, RiUserShared2Fill, RiUserHeartFill ,  RiUserAddFill, RiPlayMiniFill, RiStopFill, RiCheckboxFill , RiCheckboxBlankFill, RiQuillPenLine, RiCellphoneLine, RiGift2Line, RiBuilding3Line, RiAlignBottom } from "react-icons/ri";
import { _userState} from "@/modules/constants/user";
import React, { useState } from "react";
import { MyAccount_Common_Select_Categories } from "@/modules/myaccount/myaccount_common_select_categories";
import { isLoggedV2 } from "@/modules/functions/isloggedv2";
import { SelectImg_V4_FullInfo } from "@/modules/selectimg/selectimg_v4_fullinfo";
import { useQuery, useQueryClient} from "react-query";
import { useFormik } from 'formik';


export const MyAccount_Contract = (props) => {

      let {myaccount_contract_insert_func, emptycontract,  mode, title, contractdatakey, closeFunc, index_contract, contract1_datakey, insertingObj, categories, filtered_categoriesFunc, countriesIsLoading, countries, myaccount_contract_link_func} = props ?? {};
      // console.log("zzzzzzzzzzzzz1", props);      

      const contractFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_contract", datakey:contractdatakey } }) } ); res =  await res?.json();  return res; };
      let { data:contract, isLoading:contractIsLoading } = useQuery( ["contract", contractdatakey ], async () => await contractFunc(), {enabled: mode=="edit" ? true: false});

      const filetabStateObj = useState(false);
      let contractopen  =  true; // contractstab[0]?.find(t=>t?.key==contract?.datakey)?.state;

      let {diffYears, diffDays} =  datetimeDiffFunc({datetime1:contract?.date_start ?? DateTime.now(), datetime2:(contract?.date_finish ?? DateTime.now() )}) ;  // Boş değer gelirse NaN problemi oluyuyor. O Nedenle "?? Now" şeklinde yolladım                        }

      const queryClient = useQueryClient();

      const formik = useFormik({
              enableReinitialize: true,
              initialValues: mode=="edit" ? contract : emptycontract ,
                          onSubmit: values =>   {
                                                  //console.log("revalidate start", values);
                                                  //fetcher(values)//.then(()=>{ queryClient.invalidateQueries() }) ;
                                                },
              });
                        contract=formik?.values;

                        let date_start = datetimeFunc({datetime:contract?.date_start });
                        let date_finish = datetimeFunc({datetime:contract?.date_finish });

                        let datediffObj = datetimeDiffFunc({datetime1:contract?.date_start, datetime2:contract?.date_finish });

      let fn_experince =`company_text`;
      let fn_company_mode =`company_mode`;
      let company_mode =contract?.company_mode;

      let special=`${index_contract}_${contract?.datakey}`;

      let fn_experince_company_text =`company_text`;
      let contract_company_text= contract?.company_text;

      let fn_experince_project =`project`;
      let contract_project= contract?.project;

      let fn_experince_company_slug =`company_slug`;
      let contract_company_slug= contract?.company_slug;

      let fn_experince_company_datakey =`company_datakey`;
      let experince_company_datakey =contract?.company_datakey;
      let fn_experince_company_date_start =`date_start`;

      let contract_company_date_start=contract?.date_start?.substring(0,10);

      let fn_experince_company_date_finish =`date_finish`;
      let contract_company_date_finish= contract?.date_finish?.substring(0,10);

      let fn_experince_contract_continuous =`continuous`;
      let contract_continuous= contract?.continuous;

      let fn_contract_rank =`rank`;
      let contract_rank= contract?.rank ?? 0;

      let fn_contract_title =`title`;
      let contract_title= contract?.title;


      let fn_contract_sector =`sector`;
      let contract_sector= contract?.sector;

      let fn_contract_subsector =`subsector`;
      let contract_subsector= contract?.subsector;

      let fn_contract_cclass =`cclass`;
      let contract_cclass= contract?.cclass;

      let fn_contract_label =`label`;
      let contract_label= contract?.label;

      let fn_contract_position =`position`;
      let contract_position= contract?.position;

      let fn_contract_link1 = `link1`;
      let contract_link1 = contract?.link1;

      let fn_contract_link2 = `link2`;
      let contract_link2 = contract?.link2;

      let fn_contract_link3 = `link3`;
      let contract_link3 = contract?.link3;

      let fn_contract_paper_contract = `paper_contract`;
      let contract_paper_contract = contract?.paper_contract;


      let fn_contract_sms_contract = `sms_contract`;
      let contract_sms_contract = contract?.sms_contract;

      let fn_contract_controlled = `controlled`;
      let contract_controlled = contract?.controlled;

      let fn_contract_gift = `gift`;
      let contract_gift = contract?.gift;

      let fn_contract_price = `price`;
      let contract_price = contract?.price;

      let fn_contract_files = `files`;
      let contract_files = contract?.files;

      let fn_contract_events = `events`;
      let contract_events = contract?.events;

      let fn_contract_closed = `closed`;
      let contract_closed = contract?.closed;

      let fn_contract_type = `type`;
      let contract_type = contract?.type;

      let fn_contract_targetuser = `targetuser`;
      let contract_targetuser = contract?.targetuser;

      let fn_contract_mobiweb_domain = `mobiweb_domain`;
      let contract_mobiweb_domain = contract?.mobiweb_domain;

      let fn_contract_domain = `project`;
      let contract_domain = contract?.project;

      const myaccount_contract_update_func = async ( ) => { insertingObj[1](true); let res = await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{contract, type:"myaccount_contract_update"} }) });queryClient.invalidateQueries(); insertingObj[1](false);return res; };      

      const myaccount_contract_delete_func = async ( ) => { insertingObj[1](true); let res = await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{contract, type:"myaccount_contract_delete"} }) }); queryClient.invalidateQueries(); insertingObj[1](false); closeFunc(); return res; };

      const myaccount_contract_copy_func = async ( ) => { insertingObj[1](true); let res = await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{contract, type:"myaccount_contract_copy"} }) }); queryClient.invalidateQueries(); insertingObj[1](false); closeFunc(); return res; };

      const moveUp = () => { formik?.setFieldValue(fn_contract_rank, contract_rank+1 )    }
      const moveDown = () => { contract_rank>0 && formik?.setFieldValue(fn_contract_rank, contract_rank-1 )  }

      const changeSector     =     (value)     =>   {  formik?.setFieldValue(fn_contract_sector, value ); formik?.setFieldValue(fn_contract_subsector, "");   }

      const changeSubsector  =     (value)     =>   { formik?.setFieldValue(fn_contract_subsector, value ) }

      const changeCclass  =     (value)     =>   { formik?.setFieldValue(fn_contract_cclass, value) }

      const fetcher_sectors =async ()=> {  let res= await fetch("/api/sectors", { method: "POST", body: JSON.stringify({ data:{project:contract_domain, givecclasses:true } }) } ); res=await res.json();   res=res?.fetcheddata;   return res };
      let { data:data_sectors } = useQuery( ["sectorsquery", contract_domain], async () => await fetcher_sectors() ,  {enabled:!!contract_domain});

        let sectors_options = (!!data_sectors && data_sectors?.length>0) ? data_sectors?.map(s=>{return {value:s?.slug_tr, label:s?.title_tr, }}) : [];
        let subsectors = data_sectors?.find(a=>a?.slug_tr==contract_sector)?.subsectors ?? [];
        let subsectors_options = sectors_options?.length>0 ? subsectors?.map(s=>{return {value:s?.slug_tr, label:s?.title_tr, }}) : [];
        let cclasses = subsectors?.find(a=>a?.slug_tr==contract_subsector)?.cclasses ?? [];
        let cclasses_options = subsectors_options?.length>0 ? cclasses?.map(s=>{return {value:s?.slug_tr, label:s?.title_tr }}): [];

        let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

        if (contract_project=="sakaryarehberim.com")
        {
              FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
        }
        else if (contract_project=="yurtarama.com")
        {
              FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
        }


        let PROJECTURL = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

        if (contract_domain=="sakaryarehberim.com")
        {
                    PROJECTURL = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
                    if (contract_subsector)
                          {
                                PROJECTURL=PROJECTURL+"/su/"+contract_subsector
                          }
                          else if (contract_sector)
                          {
                                PROJECTURL=PROJECTURL+"/se/"+contract_sector
                          }
        }
        else if (contract_domain=="yurtarama.com")
        {
              PROJECTURL = process.env.NEXT_PUBLIC_YA_DOMAIN;
              // Aslında linkleri yurtarama.com ve kiz-yurlari, erkek-yurtları ve şehir kombinasyonlarını da ekleyerek oluşturmak gerekiyor. ama gereksiz uğraş.. boş ver gitsin..
        }


        let new_img =  contract_files ? generateImgUrlFromFullPathObj({imgSource:contract_files?.[0], defaultUrl:"/images/placeholder-image.png", isBackgroundImg:true})  : undefined;

        let showcasetitle =  contract_title ?? "Sözleşme";
        let frontendcompanylink = `${FRONTEND_DOMAIN}/co/${contract_company_slug}`;
        let netcoorcompanylink = `/membership/datakey=${experince_company_datakey}`;

        let stringified_categories = contract?.parents ?? [];
        stringified_categories=stringified_categories?.map(a=>a?.title_tr);
        let categories_text="";
        stringified_categories?.map(c=>{
              if (c)
              {
                    return categories_text= categories_text + " | " + c
              }
        })

        let linked_contract = !!contract1_datakey && contract1_datakey==contract?.datakey ;

        let userdata=isLoggedV2();

        let diff = datetimeDiffFunc({datetime2:contract?.createdat, datetime1:undefined });
        let howmanydays = diff?.diffDays   // How many days has it been added.. Ekleneli kaç gün oldu

        let technicianAuth  =  userdata?.userscopes.isTechnician;
        let manegerAuth  =  userdata?.userscopes.isManager;
        let patreonAuth  =  userdata?.userscopes.isPatreon;

        let loggedemail = userdata?.email;
        let addedbyuserAuth = contract?.defactouser==loggedemail && !!loggedemail; // Sözleşmeyi ekleyen ile login olan kullanıcı aynı mı?
        

        // Ya yönetici olacak, sadece kontrol edilmeyen kayıtlara ve eklenme süresini 4 gün geçmemiş ve kendine ait olanlara müdahale edebilecek... Ya da patron olacak.
        
        let editAuth = (manegerAuth && !contract_controlled && howmanydays<4 && addedbyuserAuth ) || patreonAuth;

      //   En azından teknisyen yetkisi olmalı burayı görebilmesi için
        if (!technicianAuth) return undefined


        props = { ...props, formik, contract, sectors_options, subsectors_options, cclasses_options, changeSector, changeSubsector, changeCclass }

        
               if(!contractIsLoading) 
               {
                  return (<div className={`${s.shell_modal}`}>
                  
                  {/* {contract1_datakey} - {contract?.datakey} */}
                  {/* {!!contract1_datakey && contract1_datakey==contract?.datakey  ? "eee ": "hhhh"} */}
                                                        
                            <div className={s.modal_title}> <div><h1> {title} </h1> </div> </div>

                            <div className={s.contractwr} key={index_contract+`${contract?.datakey}`} style={{backgroundColor:contract_controlled? "#f2fff2":"#f1f1f1"}}>

                             {/* {contractdatakey} */}

    {contractopen &&<div className={s.dates}>
                      
                      <div className={s.datakey}> {contract?.datakey ?? "Henüz oluşmadı"}  </div>
                      
                      <div className={s.datediv}> <div style={{color:"black", display:"flex"}}> { date_start?.localeString ?? "?" } - { date_finish?.localeString ?? "?" }</div> <div style={{color:"#0085ff"}}> {diffDays ? " / " +diffDays + " gün" : undefined }</div>  </div>

    </div>}
    {/* {JSON.stringify(contract)} */}

    <div className={s.contracttitle} style={{borderColor:contractopen ? "#e6e6e6" : "transparent"}} >
      {/* {JSON.stringify(datediffObj)} */}

    <div className={s.ctl}>
       

    { contract_type=="sozlesme" ? <RiFileList2Fill color={"darkgreen"} title="Sözleşme" size={24} /> : <RiLightbulbFlashFill  color={"purple"} title="Bilgi notu" size={24} /> }

    { contract_closed ? <RiStopFill color={"darkred"} title="Sözleşme kapatıldı" size={24} /> : <RiPlayMiniFill color={"darkgreen"} title="Sözleşme devam ediyor" size={24} /> }

    { contract_controlled ? <RiCheckboxFill  color={"darkgreen"} title="Kontrol edildi" size={24} /> : <RiCheckboxBlankFill  color={"gray"} title="Kontrol edilmeyi bekliyor" size={24} /> }

    {contract_files?.[0] ? <div style={{backgroundImage:new_img, backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center", width:40, height:40}}></div> : <div style={{backgroundImage:"/images/placeholder-image.png", backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center", width:40, height:40}}></div>}

                <div style={{position:"relative", display:"flex",  width:"100%", flexDirection:"column", gap:0 }}>
                  {/* {console.log("zzzzzz!!!!", closeFunc)} */}
                      <div style={{borderColor:contractopen ? "#017bec" :"transparent" }}> { showcasetitle ? showcasetitle :  "Başlık giriniz!" } </div>

                      <div style={{ fontSize:10, fontWeight:"normal", color:"gray"}}> {categories_text}  </div>

                            {contractopen && <div>

                                  {contract?.country_slug && <div style={{ fontSize:10, fontWeight:"normal", color:"gray"}} title="Sektör, Alt Sektör, Sınıflandırma">
                                        {contract?.country_slug} {contract?.city_slug} {contract?.district_slug}  {contract?.subdistrict_slug}
                                  </div>}

                                  <div style={{ fontSize:10, fontWeight:"normal", color:"gray"}} title="Sektör, Alt Sektör, Sınıflandırma">
                                        {contract_sector} {contract_subsector} {contract_cclass}
                                  </div>

                                  <div style={{ fontSize:10, fontWeight:"normal", color:"#0085ff"}} title="Etiket">
                                        {contract_label}
                                  </div>


                                  {mode=="edit" &&<div style={{ fontSize:10, fontWeight:"normal", color:"#1192ff", display:"flex", gap:20}} title="Sözleşme kullanıcıları">

                                              <div style={{ fontSize:11, fontWeight:"normal", color:"#959595", alignItems:"center", display:"flex", gap:4}} title="Sözleşmeyi ekleyen">
                                                                      <RiUserAddFill size={15}/>
                                                                      <div>{contract?.defactouser ?? "?"}</div>
                                              </div>

                                              <div> -> </div>

                                              <div style={{ fontSize:11, fontWeight:"normal", color:"#959595", alignItems:"center", display:"flex", gap:4}} title="Sözleşmenin sahibi">
                                                                      <RiUserHeartFill  size={15}/>
                                                                      <div>{contract?.user ?? "?"}</div>
                                              </div>

                                              <div style={{ fontSize:11, fontWeight:"normal", color:"#959595", alignItems:"center", display:"flex", gap:4}} title="Sözleşme yapılan müşteri">
                                                                      <RiUserShared2Fill size={15}/>
                                                                      <div>{contract?.targetuser ?? "?"}</div>
                                              </div>
                                  </div>}

                      </div>}
                </div>
    </div>

    <div className={s.ctr}>

    {linked_contract ? <div><RiHeart3Fill color="red" size={18} title="Bağlantılı sözleşme"/></div> : undefined}

    { contract_price ? <div style={{color:"darkblue", fontSize:10}}>{`${contract_price} TL`}</div>  :  undefined  }
    
    { contract_link1 ? <Link href={contract_link1} target={"_blank"}><RiExternalLinkFill   color={"#04535b"} title={contract_link1}/></Link> : undefined }
    { contract_link2 ? <Link href={contract_link2} target={"_blank"}><RiExternalLinkFill   color={"#04535b"} title={contract_link2}/></Link> : undefined }
    { contract_link3 ? <Link href={contract_link3} target={"_blank"}><RiExternalLinkFill   color={"#04535b"} title={contract_link3}/></Link> : undefined }
    { contract_company_slug ? <Link href={frontendcompanylink} target={"_blank"}><RiBuilding3Line   color={"#750000"} title={contract_company_text}/></Link> : undefined }
    { contract_domain ? <Link href={PROJECTURL} target={"_blank"}><RiShareForward2Line       color={"#750000"} title={PROJECTURL}/></Link> : undefined }
    { contract_mobiweb_domain ? <Link href={`https://www.${contract_mobiweb_domain}`} target={"_blank"}><RiXboxFill   color={"#750000"} title={contract_company_text}/></Link> : undefined }



    { contract_paper_contract ? <RiQuillPenLine  color={"darkblue"} title="Kağıt üzerinde sözleşme imzalatıldı "/> : undefined }
    { contract_sms_contract ? <RiCellphoneLine  color={"darkblue"} title="SMS ile sözleşme yapıldı"/> : undefined }
    { contract_gift ? <RiGift2Line color={"darkblue"} title="Hediye edildi"/> : undefined }
    </div>

    </div>



    {/* {JSON.stringify(new_img)} */}

    {contractopen && <div className={s.buttons}>
      
                            {/* {formik?.dirty ? "Kirli" : "Temiz"} */}

                            {/* {console.log("myaccount_contract_link_func", myaccount_contract_link_func)} */}

                            {mode=="edit" && myaccount_contract_link_func && <Button props={{onClick:()=>{editAuth && insertingObj[1](true); editAuth && myaccount_contract_link_func({contract}); setTimeout(() => { insertingObj[1](false); }, 3000); }, title:linked_contract ? "Bağlantılı sözleşme" : "İçerikle bağla", icon:"RiHeart3Fill",  disabled:(insertingObj?.[0] || !editAuth), width:60, color:linked_contract ? "red":"black"}} />}

                            {editAuth && <Button props={{onClick:mode=="edit" ? myaccount_contract_update_func : ()=>myaccount_contract_insert_func({contract}) , title:mode=="edit" ? "Kaydet" : "Ekle", icon:"IoSave",  disabled:(insertingObj?.[0] || !formik?.dirty ), width:60, color:formik?.dirty ? "darkgreen":"gray"}}/>} 

                            {/* <Button props={{onClick:activate_myaccount_education_func, title:contract_active ? "Aktif" : canBeActivated ? "Pasif" : "Pasif - Öncelikle tüm bilgileri doldurunuz!", color:contract_active ? "darkgreen" :"darkred", icon:contract_active ? "RiPlayFill" :"RiStopFill", width:60, disabled:!canBeActivated}}/> */}

                            {editAuth && mode=="edit" && <Button props={{onClick:moveUp, title:"Yukarı taşı", icon:"IoArrowUpCircleOutline", width:60}}/>}  {/* Yukarı */}

                            {editAuth &&  mode=="edit" && <input type="number" value={contract_rank} className={s.rankinput} onChange={(e)=>{editAuth && formik?.setFieldValue(fn_contract_rank, Number(e?.target?.value))} } />}

                            {editAuth &&  mode=="edit" &&  <Button props={{onClick:moveDown, title:"Aşağı taşı", icon:"IoArrowDownCircleOutline", disabled:contract_rank==0, width:60}}/>}  {/* Aşağı */}

                            {editAuth && mode=="edit" && <Button props={{onClick:myaccount_contract_copy_func, title:"Kopyala", icon:"RiFileCopyFill", marginTop:20,  disabled:insertingObj?.[0], width:60}} />}

                            {editAuth && mode=="edit" && <Button props={{onClick:myaccount_contract_delete_func, title:"Sil", icon:"RiDeleteBin2Fill", marginTop:20,  disabled:insertingObj?.[0], width:60}} />}

    </div> }

    {contractopen && <div className={s.company_textwr}>

    <div style={{display:"flex", flexDirection:"column", gap:10}}>

    {contract_type=="sozlesme" ? <div  className={s.input_sections}>
                                        <div className={s.inputwr} style={{width:190}}>
                                              <input type="radio" id={`manualcompany_${special}`} name={`company_mode_${special}`} value="manualcompany"
                                                          onClick={(e)=>{
                                                                                  // Biz de manual company seçeneği olmayacak. Şimdilik kapattım..
                                                                                  formik?.setFieldValue(fn_company_mode, e?.target?.value);
                                                                                  formik?.setFieldValue(fn_experince, ""); // Kayıtlı slug ve firma isimlerini temizleyelim..
                                                                                  formik?.setFieldValue(fn_experince_company_text, "");
                                                                                  formik?.setFieldValue(fn_experince_project, "");
                                                                                  formik?.setFieldValue(fn_experince_company_slug, "");
                                                                                  formik?.setFieldValue(fn_experince_company_datakey, "");
                                                                      }   }  checked={company_mode=="manualcompany"}

                                                                            disabled={true}
                                                                      />
                                              <label htmlFor={`manualcompany_${special}`} style={{color:"gray", cursor:"not-allowed"}}>Kayıtlı olmayan firma</label>
                                        </div>

                                        <div className={s.inputwr}>
                                                    <input type="radio" id={`selectcompany_${special}`} name={`company_mode_${special}`} value="selectcompany" onClick={(e)=>{formik?.setFieldValue(fn_company_mode, e?.target?.value); formik?.setFieldValue(fn_experince_company_text, "");  }} checked={company_mode=="selectcompany"}/>
                                                    <label htmlFor={`selectcompany_${special}`}> Sistemdeki firmalardan seç </label>
                                        </div>
                            </div> : undefined  }

                            {contract_type=="sozlesme" ? <div className={s.input_sections}>

                                        {company_mode=="selectcompany" && <SelectCompany {...props}/> }

                                        <div className={s.item_inputwr}>
                                                    <input type="text"  key={index_contract+"text"} value={contract_company_text} onChange={(e)=>formik?.setFieldValue(fn_experince_company_text, e?.target?.value )} placeholder={company_mode=="selectcompany"  ? "Yandan arama/seçim yapınız":  "Firma ismini yazın" } disabled={company_mode=="selectcompany" ? true : false} style={{width:190}}/>
                                                    {contract_company_slug && <div className={s.item_inputtitle} style={{cursor:"pointer", display:"flex",  justifyContent:"right", gap:4}}>
                                                                      <Link target={"_blank"} href={netcoorcompanylink} title="Netcoor Görüntüle"><RiExternalLinkFill size={19} color="blue"/> </Link>
                                                                      <Link target={"_blank"} href={frontendcompanylink} title="Frontend Görüntüle"><RiExternalLinkFill size={19}/> </Link>
                                                                      <div onClick={()=>{
                                                                                        formik?.setFieldValue(fn_experince_company_text, "");
                                                                                        // formik?.setFieldValue(fn_experince_project, undefined);
                                                                                        formik?.setFieldValue(fn_experince_company_slug, "");
                                                                                        formik?.setFieldValue(fn_experince_company_datakey, "");
                                                                      }}
                                                                      title="Firma seçimini temizle"
                                                                      > <RiCloseLine  size={19}/> </div>

                                                    </div>}

                                        </div>
                                  </div> : undefined}

                </div>




          <div className={s.items}>

                <div className={s.item_inputwr}>
                                  <div className={s.item_inputtitle}>Sözleşme Başlık:</div>
                                  <input type="text" key={index_contract+"text"} value={contract_title} onChange={(e)=>formik?.setFieldValue(fn_contract_title, e?.target?.value )} placeholder={"Bir başlık yazın"} disabled={false} style={{width:190, fontWeight:"bold"}}/>
                </div>

                            <MyAccount_Common_Select_Categories props={{formik, parents:contract?.parents ?? [], categories, filtered_categoriesFunc}}/>

                            { <div className={s.item_inputwr}>
                                  <div className={s.item_inputtitle}>Başlangıç:</div>
                                  <input key={index_contract+"start"} type="date" value={contract_company_date_start} onChange={(e)=> { formik?.setFieldValue(fn_experince_company_date_start, e?.target?.value ) }} placeholder={"Başlangıç tarihi giriniz"} style={{width:190}}/>
                      </div>}

                            { <div className={s.item_inputwr}>
                                              <div className={s.item_inputtitle}>Bitiş:</div>
                                              <input key={index_contract+"finish"} type="date" value={contract_company_date_finish} onChange={(e)=>formik?.setFieldValue(fn_experince_company_date_finish, e?.target?.value )} placeholder={"Sonlanma tarihi giriniz"} disabled={!!contract_continuous} style={{width:190}}/>
                                  </div>}

                                  { <div className={s.item_inputwr}>
                                              <input  className={s.item_check} key={index_contract+"continue"} id={index_contract+"continue"} type="checkbox" checked={contract_continuous ? true : false }

                                                                onChange={(e)=>{

                                                                                              formik?.setFieldValue(fn_experince_contract_continuous, !contract_continuous);

                                                                                        !contract_continuous && formik?.setFieldValue(fn_experince_company_date_finish, "");  // bitiş tarihini resetleyelim girildiyse, tabi bunu sadece boştan  doluya (halen devam ediyora) dönerken yapalım..
                                                                                  }}
                                                                                  placeholder={"Halen devam ediyorsa seçili hale getirin"}
                                              />

                                              <label htmlFor={index_contract+"continue"}  className={s.item_label}>Devamlı</label>
                                  </div>}

                                  
                                  {datediffObj?.diffDays<0 ? <div style={{backgroundColor:"white", display:"flex", alignItems:"center", gap:2, color:"darkred", padding:"6px 15px",  borderRadius:4,fontSize:12, borderColor:"black", borderWidth:1, borderStyle:"dashed" }}><RiAlertFill /> Tarih Hatalı!</div> : undefined}

                </div>

                <div className={s.items}>

                            {/* {JSON.stringify(contract)} */}
                            {/* <br/> */}
                            {/* {contract?.project} - {contract?.label} */}

                            { !contract?.project && !contract?.label && <SelectMobiweb {...props}/> }

                            {!contract_mobiweb_domain && <SelectProject {...props}/>}

                </div>

                <div className={s.items}>
                <SelectRegion formik={formik} contract={contract} countries={countries} countriesIsLoading={countriesIsLoading}/>
          </div>







                <div className={s.items}>
                <input type="number" key={index_contract+"price"} value={contract_price} onChange={(e)=>formik?.setFieldValue(fn_contract_price, Number(e?.target?.value) )} placeholder={"Fiyat"} disabled={false} style={{width:190}}/>

                <div className={s.item_inputwr}>
                      <div className={s.item_inputtitle}>Tip</div>
                                                                      <div>
                                                                                        <select value={contract?.type} onChange={(e)=>{
                                                                                                                                              formik.setFieldValue(`type`, e?.target?.value);
                                                                                                                                  }} style={{fontSize:14, padding:"5px 8px", backgroundColor:"#a6dfff"}} className={s.select} disabled={!manegerAuth}>

                                                                                                          <option value={"sozlesme"} >  Sözleşme      </option>
                                                                                                          <option value={"bilgi"}  >    Bilgi         </option>
                                                                                        </select>
                                                                            </div>

                </div>


                <div className={s.item_inputwr}>
                      <input type="text"  key={index_contract+"targetuser"} value={contract_targetuser} onChange={(e)=>formik?.setFieldValue(fn_contract_targetuser, e?.target?.value )} placeholder={"Müşteri mail adresi"} disabled={false} style={{width:190}}/>
                </div>

                      <input type="text" key={index_contract+"text"} value={contract_link1} onChange={(e)=>formik?.setFieldValue(fn_contract_link1, e?.target?.value )} placeholder={"Link 1"} disabled={false} style={{width:190}}/>
                      <input type="text" key={index_contract+"text"} value={contract_link2} onChange={(e)=>formik?.setFieldValue(fn_contract_link2, e?.target?.value )} placeholder={"Link 2"} disabled={false} style={{width:190}}/>
                      <input type="text" key={index_contract+"text"} value={contract_link3} onChange={(e)=>formik?.setFieldValue(fn_contract_link3, e?.target?.value )} placeholder={"Link 3"} disabled={false} style={{width:190}}/>
          </div>


          {contract_type=="sozlesme" ? <div className={s.items}>

    <div className={s.item_inputwr}>
    <input  className={s.item_check} key={index_contract+"controlled"} id={index_contract+"controlled"} type="checkbox" checked={contract_controlled ? true : false }

          onChange={(e)=>{
                                  formik?.setFieldValue(fn_contract_controlled, !contract_controlled);
                      }}
                            placeholder={"Yönetici tarafından kontrol edildi mi?"}
    />

    <label htmlFor={index_contract+"controlled"}  className={s.item_label}> Kontrol edildi mi? </label>
    </div>

    <div className={s.item_inputwr}>
    <input className={s.item_check} key={index_contract+"closed"} id={index_contract+"closed"} type="checkbox" checked={contract_closed ? true : false }
    disabled={!contract_controlled}
    onChange={(e)=>{ contract_controlled && formik?.setFieldValue(fn_contract_closed, !contract_closed); }}
    placeholder={"Sözleşme bitti ve son kontrol yapıldıysa kapatabilirsiniz"}
    />
    <label htmlFor={index_contract+"closed"} className={s.item_label}> Sözleşme kapatıldı mı? </label>
    </div>



    <div className={s.item_inputwr}>
    <input  className={s.item_check} key={index_contract+"paper"} id={index_contract+"paper"} type="checkbox" checked={contract_paper_contract ? true : false }

          onChange={(e)=>{
                                  formik?.setFieldValue(fn_contract_paper_contract, !contract_paper_contract);
                      }}
                            placeholder={"Sözleşme kağıda dökülmüşse işaretleyiniz. Bu durumda imzalı sözleşmenin ekran görüntüsünü dosya olarak ekleyiniz."}
    />

    <label htmlFor={index_contract+"paper"}  className={s.item_label}> Kağıda döküldü mü? </label>
    </div>


    <div className={s.item_inputwr}>
    <input  className={s.item_check} key={index_contract+"sms"} id={index_contract+"sms"} type="checkbox" checked={contract_sms_contract ? true : false }

          onChange={(e)=>{
                                  formik?.setFieldValue(fn_contract_sms_contract, !contract_sms_contract);
                      }}
                            placeholder={"Sözleşme sms olarak gönderilmişse işaretleyiniz. Bu durumda sms'in tarih ve saatini ekran görüntüsü şeklinde dosya olarak ekleyiniz."}
    />

    <label htmlFor={index_contract+"sms"}  className={s.item_label}> SMS atıldı mı? </label>
    </div>


    <div className={s.item_inputwr}>
    <input className={s.item_check} key={index_contract+"gift"} id={index_contract+"gift"} type="checkbox" checked={contract_gift ? true : false }
    onChange={(e)=>{ formik?.setFieldValue(fn_contract_gift, !contract_gift); }}
    placeholder={"Bu bir hediye mi?. Eğer hediye ise not bölümüne sebep yazınız!"}
    />
    <label htmlFor={index_contract+"gift"} className={s.item_label}> Hediye mi? </label>
    </div>
    </div>: undefined }


                <div className={s.item_inputwr}>
                                  {/* <Textarea style={{fontSize:8}} formik={formik} name={`note`} label={"Sözleşmeyle ilgili bilgi notu"} value={contract?.note} fullwidth disabled={!manegerAuth}/> */}

                                  <textarea rows={6} id={"note"}  key={"note"} name={"note"} value={contract?.note} style={{width:"100%", padding:10, backgroundColor:"#eaffe9"}} disabled={!manegerAuth}  onChange={(e)=>{
                                        formik.setFieldValue("note", e?.target?.value);
                                  }} placeholder="Not"/>
                </div>

                <div className={s.filewr}>

                <div className={s.filetitle} onClick={()=>{ filetabStateObj[1](old=>!old) }}>

                                        {new_img && <div style={{backgroundImage:new_img, backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center", width:80, height:80}}>
                                                          {/* <img src={`${new_img}`}  className={s.imgwr}/> */}
                                        </div>} Resim Seç

                </div>

                {filetabStateObj[0] &&  <SelectImg_V4_FullInfo  props={{
                                                                                  imgs_fieldname:fn_contract_files,
                                                                                  imgs_fieldvalue:contract_files ?? [],
                                                                                  setFieldValue:formik?.setFieldValue,
                                                                                  s_imageswr_style:{gap:5, gridTemplateColumns:"repeat(auto-fit, 154px)",  overflow:"hidden",backgroundColor:"transparent", overflowY:"scroll", maxHeight:480, padding:0, padding:"10px 0px"}, // eğer bulunduğun komponente göre özel stil tanımlamak isityorsan buradan değer yolla
                                                                                  imageswr_style:{gap:5, gridTemplateColumns:"repeat(auto-fit, minmax(94px,1fr))",  overflow:"hidden",backgroundColor:"transparent", overflowY:"scroll", padding:"10px 0px"}, // eğer bulunduğun komponente göre özel stil tanımlamak isityorsan buradan değer yolla
                                                                                  imageswr_maxheight:500,
                                                                                  fileinfo_standartview:false,   // file_info galeri, manşet gibi alanların altında çok sıkışık gözüküyor. Bu gibi yerlerde FileInfo componenti gizleyip, örnek olarak modalda gösterebiliriz..
                                                                                  fileinfo_modalview:true,
                                                                                  checkedwr:{fontSize:25, right:-1, top:-8}
                                                                                  }} />}
                </div>




    </div>}


                            </div>




                  </div>)
               }
               else
               {
                  return <div className={`${s.loading}`}> <RiMedal2Fill size="80" color="#333333" /> </div>
               }
                  
                         
               
            



        



}







const SelectCompany = (props) => {


    // NOTLAR:
    // *) FİRMA SEÇİLİ OLABİLİR. BU DURUMDA SELECT'E TEKİL OLARAK O FİRANON VERİLERİNİ GETİRMEK LAZIM
    // *) TÜM FİRMALARI ÇEKMEK DOĞRU OLMADIĞI İÇİN ARAMA YAPTIKÇA FİRMALAR SELECTE DOLMALI.
    // *) SELECTEN SEÇİLEN FİRMALARIN SLUGLARI DA KAYDEDİLECEK VE BU ŞEKİLDE İLİŞKİLENDİRLECEK
    // *) MANUEL YAZILANLARDA DOĞAL OLARAK SLUG OLMAYACAK...

    let {contract , counter,  index_contract, formik} = props;
    let fn_experince_company_text =`company_text`;
    let experince_company_text =contract?.company_text;
    let fn_experince_project =`project`;
    let experince_project =contract?.project;
    let fn_experince_company_slug =`company_slug`;
    let fn_experince_company_datakey =`company_datakey`;
    let experince_company_datakey = contract?.company_datakey;
    let experince_company_slug = contract?.company_slug;
    let fn_experince_targetuser =`targetuser`;



    const [keyword, set_keyword] = useState();


    const fetcher_search_companies =async ()=> {
                            let res= await fetch("/api/search_companies",  { method: "POST", body: JSON.stringify({ variables: { data:{keyword} } }) }  );
                            res=await res.json();
                            res=res?.list
                            return res;
                      };

    let { data:dataCompanies, isLoading, isFetching, error} = useQuery(["search_companies", keyword, index_contract ], () => fetcher_search_companies(), { enabled:(keyword?.length>2), retryDelay:2000, keepPreviousData:true, refetchOnWindowFocus:false });   //initialData:[ {title_tr:experince_company_text, slug_tr:experince_company_slug}]

    let companies =dataCompanies?.companies ?? [];

return (
  <div  className={s.selectcompanywr}>

  {/*  {experince_project}  */}
  {/*  {experince_company_slug}     */}
  {/*  {JSON.stringify(contract)}   */}
  {/* {JSON.stringify({title_tr:experince_company_text, slug_tr:experince_company_slug})} */}

  <input type="text" key={index_contract+"keyword"} value={keyword} onChange={(e)=>set_keyword(e?.target?.value)} placeholder="Aranacak firma ismini yazın"  style={{width:190}}/>

                {(companies?.length>0 && !isFetching && !isLoading) &&

                <div className={s.selectwr}>
                            <select
                                 className={s.select}
                                  value={JSON.stringify({title_tr:experince_company_text, slug_tr:experince_company_slug, datakey:experince_company_datakey})}
                                  onChange={(e)=>
                                                    {
                                                          if (e?.target?.value!="") {
                                                                  let valueObj=JSON.parse(e?.target?.value);
                                                                  formik?.setFieldValue(fn_experince_company_text, valueObj?.title_tr);
                                                                  formik?.setFieldValue(fn_experince_project, valueObj?.project);
                                                                  formik?.setFieldValue(fn_experince_company_slug, valueObj?.slug_tr);
                                                                  formik?.setFieldValue(fn_experince_company_datakey, valueObj?.datakey);
                                                                  formik?.setFieldValue(fn_experince_targetuser, valueObj?.user);
                                                            //      console.log("valueObj?.slug_tr1:: ", valueObj?.slug_tr, valueObj?.title_tr);
                                                          }
                                                          else
                                                                {
                                                                  formik?.setFieldValue(fn_experince_company_text, "");
                                                                  formik?.setFieldValue(fn_experince_company_slug, "");
                                                                  formik?.setFieldValue(fn_experince_company_datakey, "");
                                                                  formik?.setFieldValue(fn_experince_targetuser, "");
                                                                }
                                                    }
                                        }
                                  >

                                  <option value={""}>Seçiniz</option>
                                    {companies?.map(company=>{
                                    return <option value={JSON.stringify(company)}>   {company?.title_tr}  </option>
                                    }
                                    )}
                            </select>

                            { (companies?.length>0 ) &&  <div className={s.selectlength}>  {companies?.length} kayıt var </div> }
                </div>
                }

                {(!isLoading && companies?.length==0 && keyword?.length>0) ?
                  "Aranan firma bulunamadı"
                  :
                  (isLoading) && "Arama yapılıyor"

                }


  </div>
)
}






   




    const SelectMobiweb = (props) => {  //

      const { formik, contract } =props ?? {} ;

      let fn_contract_mobiweb_domain = `mobiweb_domain`;
      let contract_mobiweb_domain = contract?.mobiweb_domain;



      let fetcher = async () => { let res= await fetch(process.env.NEXT_PUBLIC_API_URL, { method: "POST", headers: { "Content-Type": "application/json",  "authorization": `Bearer ${"user?.accessToken"}` }, body: JSON.stringify({ query: SwissArmyKnifeQuery, variables: {data:{ type:"webs_basic", user:"yigitruzgaruzun@gmail.com"}}}) , } ) ;
                                    let datajson =  await res.json();
                                    return datajson?.data;
                                }
      const { isLoading, isError, isSuccess, error, data } = useQuery( ["webs"], () => fetcher() , { enabled:true, refetchOnWindowFocus:false, } );
      let webs = data?.swissarmyknifequery?.o_key_1;



      return (
        <div key={`mobiweb`} style={{display:"flex", gap:10}}>

                   {/* {JSON.stringify(formik)} */}

                   <div className={s.item_inputwr}>
                                              <div className={s.item_inputtitle}>Mobiweb bağlantısı</div>
                        <select value={contract_mobiweb_domain} onChange={(e)=>
                                                                  {
                                                                        formik?.setFieldValue(fn_contract_mobiweb_domain, e?.target?.value);
                                                                        // buraya domaini koy..
                                                                  }
                                                          } className={s.select}  style={{backgroundColor:"#ffe7ed"}}>
                        <option value={""}> {webs?.length>0 ? `Seçim yapınız [${webs?.length} sonuç]` : "Sonuç yok"} </option>
                        {webs?.map((web)=> { return <option value={web?.domain} key={`web-${web?.domain}`}> {web?.name} - {web?.domain} </option> })}
                        </select>

                  </div>
        </div>
      )
    }




    const SelectProject = (props) => {

      const { formik, contract, changeSector, changeSubsector, changeCclass, sectors_options, subsectors_options, cclasses_options } = props ?? {};

      let fn_contract_project = `project`;
      let contract_project = contract?.project;

      let fn_contract_sector = `sector`;
      let contract_sector = contract?.sector;

      let fn_contract_subsector = `subsector`;
      let contract_subsector = contract?.subsector;

      let fn_contract_cclass = `cclass`;
      let contract_cclass = contract?.cclass;

      let fn_contract_label = `label`;
      let contract_label = contract?.label;

      return (
        <div key={`project`} style={{display:"flex", gap:20}}>


                   {<div className={s.item_inputwr}>
                         <div className={s.item_inputtitle}>Proje bağlantısı</div>
                        <select value={contract_project} onChange={(e)=> { if (e?.target?.value ) { formik?.setFieldValue(fn_contract_project, e?.target?.value); } else { formik?.setFieldValue(fn_contract_project, undefined); } }
                                                          } className={s.select}  style={{backgroundColor:"#fff7ed"}}>
                                                                  <option value={""}> {"Proje seçiniz"} </option>
                                                                  <option value={"sakaryarehberim.com"}> SakaryaRehberim.com </option>
                                                                  <option value={"supereleman.com"}> SuperEleman.com </option>
                                                                  <option value={"yurtarama.com"}> Yurtarama.com </option>
                        </select>

                        </div>}


                        {(contract_project && !contract_label) && <div className={s.item_inputwr}>
                                                                  <div className={s.item_inputtitle}>Sektör seçimi</div>

                                                            <select className={s.select} onChange={(a)=>{changeSector(a?.target?.value)}} value={contract_sector} style={{backgroundColor:"#fff7ed"}}>
                                                                 <option value="">Sektör seçiniz</option>
                                                                 {sectors_options?.map(s=>{ return <option value={s?.value}>{ s?.label }</option> })}
                                                            </select>


                                                      </div> }


                                                { subsectors_options?.length>0 && <div className={s.item_inputwr}>
                                                                  <div className={s.item_inputtitle}>Alt sektör seçimi</div>

                                                      <select className={s.select} onChange={(a)=>{changeSubsector(a?.target?.value)}} value={contract_subsector}  style={{backgroundColor:"#fff7ed"}} >
                                                             <option value="">Alt sektör seçiniz [{subsectors_options?.length}]</option>
                                                             {subsectors_options?.map(s=>{

                                                                                               return <option value={s?.value}>{ s?.label }</option>

                                                                                       })}
                                                     </select>

                                                </div> }

                                                { cclasses_options?.length>0 && <div className={s.item_inputwr}>
                                                                  <div className={s.item_inputtitle}>Sınıflandırma seçimi</div>

                                                      <select className={s.select} onChange={(a)=>{changeCclass(a?.target?.value)}} value={contract_cclass}  style={{backgroundColor:"#fff7ed"}} >
                                                             <option value="">Sınıflandırma seçiniz [{cclasses_options?.length}]</option>

                                                             {cclasses_options?.map(s=>{

                                                                                               return <option value={s?.value}>{ s?.label }</option>

                                                                                       })
                                                              }

                                                     </select>

                                                </div> }

                                                     { !contract_sector  &&  <div className={s.item_inputwr}>


                                                                                    <div className={s.item_inputtitle}> Etiket bağlantısı </div>
                                                                                    <input
                                                                                          type="text"
                                                                                          name={"label"}
                                                                                          value={contract?.label}
                                                                                          // style={{backgroundColor:"#baeea9"}}
                                                                                          // className={s.select}
                                                                                          style={{backgroundColor:"#fff7ed"}}
                                                                                          width="%100"
                                                                                          onChange={(e) => {
                                                                                                                  let input = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                  formik?.setFieldValue("label",     input );
                                                                                                                  formik?.setFieldValue("sector",    undefined );
                                                                                                                  formik?.setFieldValue("subsector", undefined );
                                                                                                                  formik?.setFieldValue("cclass",    undefined );
                                                                                                            }}
                                                                                    />

                                                            </div> }

        </div>
      )
    }
















    export const SwissArmyKnifeQuery =
`  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {
      o_key_1
    }
  }`
;


let selectstyle={fontSize:11, padding:"4px 2px", width:140}


const SelectRegion = (props) => {

      const { formik, contract, changeSector, changeSubsector, countries, countriesIsLoading} = props ?? {};

      let fn_contract_project_domain = `project`;
      let contract_project_domain = contract?.project;

      let fn_contract_sector =  `sector`;
      let contract_sector    =  contract?.sector;

      let fn_contract_subsector =  `subsector`;
      let contract_subsector    =  contract?.subsector;

      let fn_country_slug =  `country_slug`;
      let country_slug    =  contract?.country_slug;

      let fn_city_slug =  `city_slug`;
      let city_slug    =  contract?.city_slug;

      let fn_district_slug =  `district_slug`;
      let district_slug    =  contract?.district_slug;

      let fn_subdistrict_slug =  `subdistrict_slug`;
      let subdistrict_slug    =  contract?.subdistrict_slug;


      let countries_options=countries?.map(country=>{return country = {label:country?.title_tr, value:country?.slug_tr}});

      let country=countries?.find(co=>co?.slug_tr == country_slug );

      let cities_options=country?.cities?.map(a=>({label:a?.title_tr, value:a?.slug_tr}))

      let city=country?.cities?.find(co=>co?.slug_tr==city_slug);

      let districts_options=city?.districts?.map(a=>({label:a?.title_tr, value:a?.slug_tr}))

      let district=city?.districts.find(di=>di?.slug_tr==district_slug);

      let subdistricts_options=district?.subdistricts?.map(a=>({label:a?.title_tr, value:a?.slug_tr}))

      if (countriesIsLoading)
      {
          return <div>Ülkeler yüklenirken lütfen bekleyin</div>
      }

      return (
        <div key={`project`} style={{display:"flex", gap:20}}>

                   {/* {JSON.stringify(countries)} */}

                                          <div className={s.selectshell} style={{width: 1 ? "100%" : "auto"}}>
                                                            {/* <div className={s.item_inputtitle}> {"Ülke"} </div>   */}
                                                            {/* SASA  {JSON.stringify(triggerFuncs)} */}
                                                            {/* <div> Hata mesajları </div> */}
                                                            <select className={s.select}  name={"ulke"} value={country_slug}
                                                            style={{backgroundColor:"#fff7ed"}}
                                                            onChange={(e)=>{
                                                                                          let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                          formik?.setFieldValue("country_slug", value);
                                                                                          city_slug && formik?.setFieldValue("city_slug", undefined);
                                                                                          district_slug && formik?.setFieldValue("district_slug", undefined);
                                                                                          subdistrict_slug && formik?.setFieldValue("subdistrict_slug", undefined);
                                                                        }}
                                                            >
                                                                  {1 && <option value="">Ülke seçiniz</option>}
                                                                  {countries_options?.map(option=>{
                                                                        return <option value={option?.value} key={option?.value}> {option?.label} </option>
                                                                  })}
                                                            </select>
                                          </div>


                                          {country && <div className={s.selectshell} style={{width: 1 ? "100%" : "auto"}}>
                                                            {/* <div className={s.item_inputtitle}> {"Şehir"} </div>   */}
                                                            {/* SASA  {JSON.stringify(triggerFuncs)} */}
                                                            {/* <div> Hata mesajları </div> */}
                                                            <select className={s.select}  name={"sehir"} value={city_slug}
                                                            style={{backgroundColor:"#fff7ed"}}
                                                            onChange={(e)=>{
                                                                                          let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                          formik?.setFieldValue("city_slug", value);

                                                                                          formik?.setFieldValue("district_slug", undefined);
                                                                                          formik?.setFieldValue("subdistrict_slug", undefined);
                                                                        }}
                                                            >
                                                                  {1 && <option value="">Şehir seçiniz</option>}
                                                                  {cities_options?.map(option=>{
                                                                        return <option value={option?.value} key={option?.value}> {option?.label} </option>
                                                                  })}
                                                            </select>
                                          </div>  }


                                          {city && <div className={s.selectshell} style={{width: 1 ? "100%" : "auto"}}>
                                                            {/* <div className={s.item_inputtitle}> {"İlçe"} </div>   */}
                                                            {/* SASA  {JSON.stringify(triggerFuncs)} */}
                                                            {/* <div> Hata mesajları </div> */}
                                                            <select className={s.select}  name={"ilce"} value={district_slug}
                                                            style={{backgroundColor:"#fff7ed"}}
                                                            onChange={(e)=>{
                                                                                    let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                    formik?.setFieldValue("district_slug", value);
                                                                                    formik?.setFieldValue("subdistrict_slug", undefined);
                                                                        }}
                                                            >
                                                                  {1 && <option value="">İlçe seçiniz</option>}
                                                                  {districts_options?.map(option=>{
                                                                        return <option value={option?.value} key={option?.value}> {option?.label} </option> //selected={value==option.value}
                                                                  })}
                                                            </select>
                                          </div>}


                                          {district && <div className={s.selectshell} style={{width: 1 ? "100%" : "auto"}}>
                                                            {/* <div className={s.item_inputtitle}> {"Mahalle"} </div> */}
                                                            {/* SASA  {JSON.stringify(triggerFuncs)} */}
                                                            {/* <div> Hata mesajları </div> */}
                                                            <select className={s.select}  name={"mahalle"} value={subdistrict_slug}
                                                            style={{backgroundColor:"#fff7ed"}}
                                                            onChange={(e)=>{
                                                                                    let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                    formik?.setFieldValue("subdistrict_slug", value);

                                                                        }}
                                                            >
                                                                  {1 && <option value="">Mahalle seçiniz</option>}
                                                                  {subdistricts_options?.map(option=>{
                                                                        return <option value={option?.value} key={option?.value}> {option?.label} </option> //selected={value==option.value}
                                                                  })}
                                                            </select>
                                          </div>}

        </div>
      )
    }







