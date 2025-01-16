import s from "./myaccount_contracts.module.css";
import { useRouter } from "next/router";  
import { DateTime } from "luxon";
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import { datetimeDiffFunc } from "@/modules/functions/datetimedifffunc";
import generateImgUrlFromFullPathObj from "@/modules/functions/generateimgurlfromfullpathobj";
import {tabStatesFunc_WithKey} from "@/modules/functions/tabstatesfunc_withkey"
import { useSnapshot } from "valtio";
import Link from "next/link";
import { RiShareForward2Line,RiHeart3Fill, RiVipCrown2Line, RiAspectRatioFill , RiMedal2Fill, RiEditBoxFill,  RiFileList2Fill, RiLightbulbFlashFill,  RiXboxFill, RiLightbulbFlashLine , RiExternalLinkFill,RiCloseLine , RiAddFill, RiUserShared2Fill, RiUserHeartFill ,  RiUserAddFill, RiPlayMiniFill, RiStopFill, RiCheckboxFill , RiCheckboxBlankFill, RiQuillPenLine, RiCellphoneLine, RiGift2Line, RiBuilding3Line, RiAlignBottom } from "react-icons/ri";
import { _userState} from "@/modules/constants/user";
import React, {  useEffect, useState } from "react";
import { isLoggedV2 } from "@/modules/functions/isloggedv2";
import Region from "@/modules/common/region";
import projectbasedlink from "@/modules/functions/projectbasedlink";
import { useQuery, useQueryClient} from "react-query";
import { Modal } from 'react-responsive-modal';
import { useFormik } from 'formik';
import {MyAccount_Contract} from "./myaccount_contract";

export function MyAccount_Contracts  (props)  {

    let {
                  selecteduser, // Sözleşme sisteminin sahibi
                  targetuser, // Sözlemenin muhatabı olan müşteri
                  company_datakey, // Bu geldiyse bir firmanın sözleşmeleri aranıyordur.
                  company_mode,//: 
                  company_text,//:"",
                  company_slug, //:"",
                  mobiweb_domain, // Bu geldiyse bir mobiweb'in sözleşmeleri aranıyordur.
                  myaccount_contract_link_func, // İlgili içeriğin (üyelik, reklam), bu sözleşmeyle bağlantı kurmasını sağlamak için yapıyoruz..
                  contract1_datakey,
                  project,
                  sector,
                  subsector,
                  cclass,
                  label,
                  country_slug,
                  city_slug,
                  district_slug,
                  subdistrict_slug,
        }  =  props ?? {}; // indexi buradan kaldır..

      let _userStateData = useSnapshot(_userState);

      let router = useRouter();

      const editModalStateObj = useState([]); // Edit penceresininin state verisini tutar...
      const addModalStateObj = useState(undefined); // Edit penceresininin state verisini tutar...

      const contractowneremailStateObj = useState(selecteduser);

      useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser])

      const countriesv2_alldataFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"countriesv2_alldata", givedistricts:true } }) } ); res =  await res?.json(); return res; };
      let { data:countries, isLoading:countriesIsLoading } = useQuery( ["countriesv2_alldata", ], async () => await countriesv2_alldataFunc(), {keepPreviousData:true , refetchOnWindowFocus:false});

      let userdata=isLoggedV2();

      const projectsFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"projects" } }) } ); res =  await res?.json();  return res; };
      let { data:projects, isLoading:projectsIsLoading } = useQuery( ["projects", ], async () => await projectsFunc());

      const keywordObj   =  useState();
      const pageState = useState(10);
      const searchParams =  useState({
                                          controlled:undefined,
                                          closed:undefined,
                                          paper_contract:undefined,
                                          sms_contract:undefined,
                                          gift:undefined,
                                          order:0,
                                          type:undefined,
                                          date_start:undefined,
                                          date_finish:undefined,
                                    });
      
      const filestab = useState([]);
      
      const contractstab = useState([]);

      const projectStateObj    =  useState(project);
      const projectAdCategoryStateObj    =  useState();
      const sectorStateObj     =  useState(sector);
      const subsectorStateObj  =  useState(subsector);
      const cclassStateObj  =  useState(cclass);
      const labelStateObj  =  useState(label);

      const countryStateObj =  useState(country_slug);
      const cityStateObj =  useState(city_slug);
      const districtStateObj =  useState(district_slug);
      const subdistrictStateObj =  useState(subdistrict_slug);

      useEffect(() => {
            projectStateObj[1](project)
      }, [project])

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

      useEffect(() => {
            cclassStateObj[1](cclass)
      }, [cclass])

      useEffect(() => {
            labelStateObj[1](label)
      }, [label])

      useEffect(() => {
            sectorStateObj[1](sector)
      }, [sector])

      useEffect(() => {
            subsectorStateObj[1](subsector)
      }, [subsector])

      useEffect(() => {
            cclassStateObj[1](cclass)
      }, [cclass])


      const fetcher_sectors =async ({project})=> {  let res= await fetch("/api/sectors", { method: "POST", body: JSON.stringify({ data:{project, givecclasses:true } }) } ); res=await res.json(); res=res?.fetcheddata; return res };

      let { data:data_sectors } = useQuery( ["sectorsquery", projectStateObj?.[0], ], async () => await fetcher_sectors({ project: projectStateObj?.[0] }) ,  {enabled:!! projectStateObj?.[0]});

      let sectors_options = (!!data_sectors && data_sectors?.length>0) ? data_sectors?.map(s=>{return {value:s?.slug_tr, label:s?.title_tr, }}) : [];
      let subsectors = data_sectors?.find(a=>a?.slug_tr==sectorStateObj?.[0])?.subsectors ?? [];
      let subsectors_options = sectors_options?.length>0 ? subsectors?.map(s=>{return {value:s?.slug_tr, label:s?.title_tr, }}) : [];
      let cclasses = subsectors?.find(a=>a?.slug_tr==subsectorStateObj?.[0])?.cclasses ?? [];
      let cclasses_options = subsectors_options?.length>0 ? cclasses?.map(s=>{return {value:s?.slug_tr, label:s?.title_tr }}): [];

      const queryClient = useQueryClient();

                  const fetcher_contracts =async ()  => {

                        let res = await fetch("/api/swissarmyknifequery", { method: "POST",
                                                                  body: JSON.stringify({data:{
                                                                                                      type:"myaccount_contracts",
                                                                                                      email:contractowneremailStateObj[0],
                                                                                                      targetuser,
                                                                                                      keyword:keywordObj[0],
                                                                                                      searchParams:searchParams[0],
                                                                                                      parents:_userStateData?.myaccount_contracts_filtered_categories,
                                                                                                      take:pageState[0],
                                                                                                      company_datakey:!mobiweb_domain ? company_datakey : undefined , // bu değer gidiyorsa o zaman sadece bir firmaya ait sözleşmeler aranıyor demektir. Yalnız domain varsa, firmayı boşverip domaine göre sözleşmeleri aramalı
                                                                                                      mobiweb_domain,
                                                                                                      project:projectStateObj?.[0],
                                                                                                      projectadcategory:projectAdCategoryStateObj?.[0],
                                                                                                      sector:sectorStateObj?.[0],
                                                                                                      subsector:subsectorStateObj?.[0],
                                                                                                      cclass:cclassStateObj?.[0],
                                                                                                      label:labelStateObj?.[0],
                                                                                                      country_slug:countryStateObj?.[0],
                                                                                                      city_slug:cityStateObj?.[0],
                                                                                                      district_slug:districtStateObj?.[0],
                                                                                                      subdistrict_slug:subdistrictStateObj?.[0],
                                                                                                      contract1_datakey, // Bu sözleşme kesin olmalı diye talep varsa onu değerlendir. // Örneğin, bir reklam söleşmeyle bağlantılı. Ama aşağıdaki filitrelemeden ötürü o sözleşme gözükmezse bu sefer epey sıkıntı olur. O nedenle özel olarak istenen sözleşmeyi mutlaka getireceğiz.
                                                                                           }})} ); res=await res.json(); return res; };

                  let { data:contractsObj, isLoading} = useQuery( ["contracts", company_datakey,mobiweb_domain, selecteduser,pageState[0],targetuser, contractowneremailStateObj[0], _userStateData?.myaccount_contracts_filtered_categories?.length, _userStateData?.myaccount_contracts_filtered_categories?.[0]?.slug_tr, _userStateData?.myaccount_contracts_filtered_categories?.[1]?.slug_tr, _userStateData?.myaccount_contracts_filtered_categories?.[2]?.slug_tr, searchParams[0]?.closed, searchParams[0]?.date_start, searchParams[0]?.date_finish, searchParams[0]?.controlled, searchParams[0]?.controlled, searchParams[0]?.paper_contract, searchParams[0]?.sms_contract, searchParams[0]?.gift, searchParams[0]?.order, searchParams[0]?.type,  projectStateObj?.[0], sectorStateObj?.[0], subsectorStateObj?.[0], cclassStateObj?.[0], labelStateObj?.[0], countryStateObj?.[0], cityStateObj?.[0], districtStateObj?.[0], subdistrictStateObj?.[0]    ], ()=> fetcher_contracts(),
                        { keepPreviousData:false }
               )  // daha sonra false'a çevir...

               let contracts=contractsObj?.contracts;
               let contractsLength=contractsObj?.length;
               let totalprice=contractsObj?.totalprice;

            const insertingObj = useState(false);

            let emptycontract= {

                  company_datakey:!mobiweb_domain ? company_datakey : undefined, // Bir mobiweb_domain durumu varsa, o sözleşme firmaya bağlanamaz.
                  type:"sozlesme",
                  company_mode,
                  company_text,                  
                  company_slug,
                  mobiweb_domain,                  
                  parents:_userStateData?.myaccount_contracts_filtered_categories,
                  project:projectStateObj?.[0],
                  sector:sectorStateObj?.[0],
                  subsector:subsectorStateObj?.[0],
                  cclass:cclassStateObj?.[0],
                  label:labelStateObj?.[0],
                  country_slug:countryStateObj?.[0],
                  city_slug:cityStateObj?.[0],
                  district_slug:districtStateObj?.[0],
                  subdistrict_slug:subdistrictStateObj?.[0],
                  targetuser
            }

            

            const myaccount_contract_insert_func = async ({contract}) => {
                                                                   insertingObj[1](true);
                                                                  //  let specialuser = selecteduser=="yigitruzgaruzun@gmail.com" ? selecteduser : undefined;
                                                                   let res = await fetch("/api/swissarmyknifemutation", { method: "POST", body:
                                                                                                      JSON.stringify({ data:{type:"myaccount_contract_insert",
                                                                                                                                  contract:{...contract, selecteduser},
                                                                                                                                  
                                                                                                                                   // contracttype:"sozlesme"
                                                                                                                              } }) });
                                                                   queryClient.invalidateQueries(); insertingObj[1](false); addModalStateObj[1](false)
                                                                   return res;
                                                                };


            const fetcher_myaccountcontractcategories = async () => { let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_contract_categories", email:selecteduser } }) } ); res =  await res?.json(); return res; };
            let  { data:categories } = useQuery( ["myaccount_contractcategories", selecteduser ], () => fetcher_myaccountcontractcategories() , { enabled:!!selecteduser, } );  // refetchOnWindowFocus:false, refetchOnReconnect: false, retry: false, staleTime: 6000,
            let  filtered_categories = _userStateData?.myaccount_contracts_filtered_categories;


            // Filitre selecti değişince çalışan fonksiyon
            const changeFilterSelect = ({value, deep}) => {
                                                            _userState.myaccount_contracts_filtered_categories=_userStateData?.myaccount_contracts_filtered_categories?.filter((a,i)=> i<deep ) ?? [];
                                                            if (value!="") {
                                                                              _userState.myaccount_contracts_filtered_categories[deep] = categories?.find(c=>c?.datakey==value) ?? {};
                                                                           }
                                                           }
            const filtered_categoriesFunc = ({value}) =>  { _userState.myaccount_contracts_filtered_categories  = value; }

            let technicianAuth  =  userdata?.userscopes.isTechnician;
            let manegerAuth  =  userdata?.userscopes.isManager;
            let patreonAuth  =  userdata?.userscopes.isPatreon;

            const infobarState= useState(false);

            let common_modal_props={categories, filtered_categoriesFunc, insertingObj, countries, countriesIsLoading} // Ekleme ve Düzenle Modallarına Gönderilen Ortak Propslar..

            if (!technicianAuth) return undefined; // Buna çok gerek yok. Zaten üstte kontrol ediyoruz ama yine de kalsın. tedbiren

return (
      <div className={s.aaaaa} style={{display:"flex", flexDirection:"column",  gap:8, position:"relative"}}> 

      {/* {addModalStateObj[0] ? "evet" : "hayır"} */}      
      {/* Yönetici olmayana hiç gösterme */}
      {/* !insertingObj[0] && myaccount_contract_insert_func({specialuser:"yigitruzgaruzun@gmail.com"}) */}
      
                                                { (userdata?.userscopes.isManager ) ?
                                                      (selecteduser ) ? 
                                                                                    <div style={{color:insertingObj[0] ? "gray" : "black", position:"absolute", right:0, top:-4, width:80, display:"flex", gap:10, alignItems:"center"}} >
                                                                                                                                                                                    
                                                                                          {selecteduser=="yigitruzgaruzun@gmail.com" && <button type="button"  style={{color:insertingObj[0] ? "gray" : "black"}} disabled={insertingObj[0]} onClick={()=> {addModalStateObj[1](true);}} className={s.addcontract_button}><RiVipCrown2Line size={20} /> Ekle </button>}
                                                                                          {selecteduser!="yigitruzgaruzun@gmail.com" && <button type="button"  style={{color:insertingObj[0] ? "gray" : "black"}} disabled={insertingObj[0]} onClick={()=> {addModalStateObj[1](true);}} className={s.addcontract_button}><RiAddFill size={20} /> Ekle </button>}

                                                                                    </div>
                                                                                          :
                                                                                    <div style={{fontSize:10}}>Sözleşme ekleyebilmek için seçili kullanıcı gerekli</div>
                                                  : undefined
                                                }

                                    { technicianAuth && <Filter_Categories contractowneremailStateObj={contractowneremailStateObj} categories={categories} projects={projects} keywordObj={keywordObj} searchParams={searchParams} changeFilterSelect={changeFilterSelect } filtered_categories={filtered_categories}   countryStateObj={countryStateObj} cityStateObj={cityStateObj} districtStateObj={districtStateObj} subdistrictStateObj={subdistrictStateObj}  projectStateObj={projectStateObj} projectAdCategoryStateObj={projectAdCategoryStateObj} projectAdCategoryStateObj={projectAdCategoryStateObj} sectors_options={sectors_options}  subsectors_options={subsectors_options} cclasses_options={cclasses_options} sectorStateObj={sectorStateObj} subsectorStateObj={subsectorStateObj} cclassStateObj={cclassStateObj} labelStateObj={labelStateObj}/>}

                                    <div className={s.contractswr}>


                                                            {/* {contracts?.find(a=>!a?.active) && <div className={s.nonactiverecords}>Aktiflenmemiş kayıt var. Aktiflenmeyen kayıt kullanılamaz!</div> } */}

                                                            {contracts?.length>0 && contracts?.map((contract, index_contract)=> {
                                                                                    return <Contract router={router} index_contract={index_contract} editModalStateObj={editModalStateObj} contract1_datakey={contract1_datakey} contractstab={contractstab} filestab={filestab} contract={contract} index_contract={index_contract} countries={countries} countriesIsLoading={countriesIsLoading} selecteduser={selecteduser} insertingObj={insertingObj} categories={categories} filtered_categoriesFunc={filtered_categoriesFunc} />
                                                                                  })}

                                                { contractsLength==0 && <div  className={`flexcentercenter ${s.empty}`}> Sözleşme yok </div> }
                                                {isLoading && <div className={`flexcentercenter ${s.empty}`}> Yükleniyor ~ </div>}


                                                {contractsLength ?  <div className={s.morerecords} onClick={()=>pageState[0]<contractsLength && pageState[1](old=>{


                                                                                                                        if (contractsLength>=(pageState[0]+5)) // Maksimum sayfa sayısına geldiğimizde dur.!!!
                                                                                                                        {
                                                                                                                                    return old+5
                                                                                                                        }
                                                                                                                        else { return contractsLength }

                                                                                                      })}><RiAlignBottom size={20}/>
                                                      {pageState[0]} / {contractsLength}
                                                </div> : undefined}


                                                {contractsLength ? <div className={s.morerecords} onClick={()=>pageState[1](contractsLength)} title="Tümü"><RiAspectRatioFill size={20}/></div> : undefined}

                                                      {(patreonAuth )? <div className={s.infobar}>

                                                            <div className={s.aaaaaa} style={{fontWeight:"bold", fontSize:13, cursor:"pointer", userSelect:"none"}}  onClick={()=>infobarState[1](old=>!old)}> <RiLightbulbFlashLine  /> Sistem çalışma prensibi </div>
                                                            
                                                            {infobarState[0] ? <div className={s.sss___}> Üst yönetici ya da yönetici sözleşme ekleyebilir. </div> : undefined}

                                                            {infobarState[0] && <div className={s.sss___}> Yönetici, en fazla 3 gün içinde kontrol edilmemiş ve sadece kendi eklediği kayıtları düzenleyebilir. </div> }

                                                            {infobarState[0] &&<div style={{borderBottom:"2px solid gray", marginTop:20}}>Yapılması gerekenler</div>}

                                                            {infobarState[0] && <div className={s.sss___}> Standart kullanıcı sadece kendisiyle ve bulunduğu bölüm (üyelik sayfası ya da web sitesi ~) ile ilgili sözleşmeleri görebilmeli. (Yenileyebilmeli) </div>}

                                                            {infobarState[0] && <div className={s.sss___}> Sözleşmeler bölümünde projelere göre filitreleme yapıldığı gibi, mobiweb'e görede listeleme yapılabilir. (Acil değil)  (Bir checkbox koyulur: Mobiweb'ler listelensin gibi..)   </div>}

                                                            {infobarState[0] && <div className={s.sss___}> Sözleşme kontrol edilmeden kapatılmamalı. Ama kişi hile yapıp, önce kontrol edildi işaretleyip, aynı anda kapata basar, sonra sözleşme kontrol işaretini kaldırıabilir.  Bu durumda sözleşme kapatılmadan kaldırılır. Bu nedenle formmik'e initial data olarak gelen "contract" datasına haricen ulaşılmalı.  </div>}


                                                            </div> : undefined}



                                                {/* Yönetici olmayana hiç gösterme */}
                                                { userdata?.userscopes.isManager ?
                                                      (selecteduser ) ?
                                                             <div style={{width:380, display:"flex", gap:10, alignItems:"center"}} >

                                                                  {selecteduser=="yigitruzgaruzun@gmail.com" && <button type="button"  style={{color:insertingObj[0] ? "gray" : "black"}} disabled={insertingObj[0]} onClick={()=> {addModalStateObj[1](true); } } className={s.addcontract_button}><RiVipCrown2Line size={20} /> Sözleşme ekle</button>}
                                                                  {selecteduser!="yigitruzgaruzun@gmail.com" && <button type="button"  style={{color:insertingObj[0] ? "gray" : "black"}} disabled={insertingObj[0]} onClick={()=> {addModalStateObj[1](true); } } className={s.addcontract_button}><RiAddFill size={20} /> Sözleşme ekle</button>}
                                                                  {totalprice ? <div style={{display:"flex", flexGrow:1, fontSize:11, alignItems:"center", gap:3 }}><RiHeart3Fill color="#ff0400"/> {totalprice ? `${totalprice} TL` : undefined}</div> : undefined   }
                                                                  
                                                             </div>
                                                            :
                                                            <div style={{fontSize:10,}}>Sözleşme ekleyebilmek için seçili kullanıcı gerekli</div>
                                                  : undefined
                                                }
                                    </div>


                                    { (editModalStateObj[0]?.length>0) && <MyModal title="Sözleşme Düzenleme" closeFunc={ ()=>editModalStateObj[1]([]) } isModalOpen={editModalStateObj[0]?.length>0} mode="edit" editModalStateObj={editModalStateObj} myaccount_contract_link_func={myaccount_contract_link_func} contract1_datakey={contract1_datakey} {...common_modal_props}/> }

                                    { (addModalStateObj[0])  && <MyModal emptycontract={emptycontract} title="Sözleşme Ekleme"  closeFunc={ ()=>addModalStateObj[1](false) } isModalOpen={ addModalStateObj[0] } mode="add" myaccount_contract_insert_func={myaccount_contract_insert_func} {...common_modal_props}/> }


      </div>
)
}



const Contract = (props) => {


    let { router, contract, editModalStateObj, contract1_datakey, index_contract, insertingObj, countries, countriesIsLoading, categories, filtered_categoriesFunc, filestab, contractstab, myaccount_contract_link_func, } = props;


    let filetabopen   =  filestab[0]?.find(t=>t?.key==contract?.datakey)?.state;
    let contractopen  =  contractstab[0]?.find(t=>t?.key==contract?.datakey)?.state;

    let date_start = datetimeFunc({datetime:contract?.date_start });
    let date_finish = datetimeFunc({datetime:contract?.date_finish });

    let {diffYears, diffDays} =  datetimeDiffFunc({datetime1:contract?.date_start ?? DateTime.now(), datetime2:(contract?.date_finish ?? DateTime.now() )}) ;  // Boş değer gelirse NaN problemi oluyuyor. O Nedenle "?? Now" şeklinde yolladım                        }

    const queryClient = useQueryClient();

    const formik = useFormik({
            enableReinitialize: true,
            initialValues: contract,
                        onSubmit: values =>   {
                                                //console.log("revalidate start", values);
                                                //fetcher(values)//.then(()=>{ queryClient.invalidateQueries() }) ;
                                              },
            });
                      contract=formik?.values;

            let fn_contract_active =`active`;
            let contract_active =contract?.active ?? 0;

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
    let fn_experince_company_date_start =`date_start`;

    let contract_company_date_start=contract?.date_start?.substring(0,10);

    let fn_experince_company_date_finish =`date_finish`;
    let contract_company_date_finish= contract?.date_finish?.substring(0,10);

    let fn_experince_contract_continuous =`continuous`;
    let contract_continuous= contract?.continuous;

    let fn_experince_country =`country_slug`;
    let contract_country= contract?.country_slug; // ?? "turkiye";

    let fn_contract_city =`city_slug`;
    let contract_city= contract?.city_slug;// ?? "sakarya";

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

    let canBeActivated = ( (contract_company_slug || contract_company_text ) && contract_company_date_start && (contract_company_date_finish || contract_continuous) && contract_country && contract_city && contract_sector && contract_subsector && contract_position )

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

      // useEffect(() => {      // Bu use effect tam çalışmıyor ama olasun. sorun yok
      //                         !contract_country && formik?.setFieldValue(fn_experince_country, "turkiye");
      //                         !contract_city && formik?.setFieldValue(fn_contract_city, "sakarya");
      //                   }, [countries?.length])


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

      let manegerAuth  =  userdata?.userscopes.isManager;
      let patreonAuth  =  userdata?.userscopes.isPatreon;

      let loggedemail = userdata?.email;
      let addedbyuserAuth = contract?.defactouser==loggedemail && !!loggedemail; // Sözleşmeyi ekleyen ile login olan kullanıcı aynı mı?

      // Ya yönetici olacak, sadece kontrol edilmeyen kayıtlara ve eklenme süresini 4 gün geçmemiş ve kendine ait olanlara müdahale edebilecek... Ya da patron olacak.
      let editAuth = (manegerAuth && !contract_controlled && howmanydays<4 && addedbyuserAuth ) || patreonAuth;

      props = { ...props, formik, contract, sectors_options, subsectors_options, cclasses_options, changeSector, changeSubsector, changeCclass }

return (
  <div className={s.contractwr} key={index_contract+`${contract?.datakey}`} style={{backgroundColor:contract_controlled? "#f2fff2":"#f1f1f1"}}>

                  {<div className={s.dates}>
                                    {/* <div className={s.datakey}> {contract?.datakey}  </div> */}
                                    <div className={s.datediv}> <div style={{color:"black", display:"flex"}}> { date_start?.localeString ?? "?" } - { date_finish?.localeString ?? "?" }</div> <div style={{color:"#0085ff"}}> {diffDays ? " / " +diffDays + " gün" : undefined }</div>  </div>                                    
                  </div>}
                  {/* {JSON.stringify(contract)} */}

            <div className={s.contracttitle} style={{borderColor:contractopen ? "#e6e6e6" : "transparent"}} >

      <div className={s.ctl}>

                  <Link href={`/contracts/c/${contract?.datakey}`} style={{display:"flex",alignItems:"center"}}><RiEditBoxFill  color={"darkgray"} title="Düzenle" size={21} /></Link>

                  { contract_type=="sozlesme" ? <RiFileList2Fill color={"darkgreen"} title="Sözleşme" size={24} /> : <RiLightbulbFlashFill  color={"purple"} title="Bilgi notu" size={24} /> }

                  { contract_closed ? <RiStopFill color={"darkred"} title="Sözleşme kapatıldı" size={24} /> : <RiPlayMiniFill color={"darkgreen"} title="Sözleşme devam ediyor" size={24} /> }

                  { contract_controlled ? <RiCheckboxFill  color={"darkgreen"} title="Kontrol edildi" size={24} /> : <RiCheckboxBlankFill  color={"gray"} title="Kontrol edilmeyi bekliyor" size={24} /> }

                  {/* onClick={()=>router?.push(`/contracts/c/${contract?.id}`)} style={{cursor:"pointer"}} */}
                  
                  

                  {contract_files?.[0] ? <div style={{backgroundImage:new_img, backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center", width:40, height:40}}></div> : <div style={{backgroundImage:"/images/placeholder-image.png", backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center", width:40, height:40}}></div>}

                              <div style={{position:"relative", display:"flex",  width:"100%", flexDirection:"column", gap:0 }}>
                                     <div onClick={()=>{ tabStatesFunc_WithKey({ key:contract?.datakey, set_tabstates:editModalStateObj[1] });}} style={{cursor:"pointer"}}> { showcasetitle } </div>

                                     <div style={{ fontSize:10, fontWeight:"normal", color:"gray"}}> {categories_text} </div>

                                          <div>
                                                {contract?.country_slug && <div style={{ fontSize:10, fontWeight:"normal", color:"gray"}} title="Sektör, Alt Sektör, Sınıflandırma">
                                                      {contract?.country_slug} {contract?.city_slug} {contract?.district_slug}  {contract?.subdistrict_slug}
                                                </div>}

                                                <div style={{ fontSize:10, fontWeight:"normal", color:"gray"}} title="Sektör, Alt Sektör, Sınıflandırma">
                                                      {contract_sector} {contract_subsector} {contract_cclass}
                                                </div>

                                                <div style={{ fontSize:10, fontWeight:"normal", color:"#0085ff"}} title="Etiket">
                                                      {contract_label}
                                                </div>
                                          </div>

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

                 <div className={s.contractcounter}> [{index_contract+1}] Sözleşme </div>




  </div>
)
}

const MyModal = (props) => {

      let {myaccount_contract_insert_func, emptycontract,  mode, title, isModalOpen, editModalStateObj, closeFunc, index_contract, contract1_datakey, insertingObj, categories, filtered_categoriesFunc, countriesIsLoading, countries, myaccount_contract_link_func} = props ?? {};

      let stateObj = editModalStateObj?.[0];
      let contractdatakey = stateObj?.[0]?.key;

  return (
                  <Modal
                        open={isModalOpen}
                        onClose={()=>closeFunc()}
                        center
                        aria-labelledby="my-modal-title"
                        aria-describedby="my-modal-description"
                        classNames={{ overlay: "rrm_customOverlay", modal: "rrm_customModal2", }}
                  >
                                    <MyAccount_Contract {...props} contractdatakey={contractdatakey}/>
                  </Modal>
          )


}




const Filter_Categories = (props) => {

      const {contractowneremailStateObj, categories,projects, keywordObj, searchParams, changeFilterSelect, filtered_categories } = props ?? {};

      let { countryStateObj, cityStateObj, districtStateObj, subdistrictStateObj, projectStateObj, projectAdCategoryStateObj,  sectorStateObj, subsectorStateObj, cclassStateObj, labelStateObj, sectors_options, subsectors_options, cclasses_options,  } = props ?? {};
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Backendde subcategorileri çekerken, paraleldeki kategori çekmiyor.. bir taneyi çekip ekrana basıyor.. örneğin emlak ekpertiz hizmetini çekiyor diğerini çekmiyor..

      let controlled = searchParams[0]?.controlled;
      let closed = searchParams[0]?.closed;
      let paper_contract      = searchParams[0]?.paper_contract;
      let sms_contract        = searchParams[0]?.sms_contract;
      let gift                = searchParams[0]?.gift;
      let order               = searchParams[0]?.order;
      let type                = searchParams[0]?.type;
      let date_start          = searchParams[0]?.date_start;
      let date_finish        = searchParams[0]?.date_finish;


      let link = projectbasedlink({project:projectStateObj?.[0], sector:sectorStateObj?.[0], subsector:subsectorStateObj?.[0], cclass:cclassStateObj?.[0], label:labelStateObj?.[0], country_slug:countryStateObj?.[0], city_slug:cityStateObj?.[0], district_slug:districtStateObj?.[0], subdistrict_slug:subsectorStateObj?.[0]});


      let selectedproject = projects?.find(a=>a?.datakey==projectStateObj[0]);
      let adscategories = selectedproject?.adscategories ?? [];
      let adcategoriesoptions = (!!adscategories && adscategories?.length>0) ? adscategories?.map(s=>{return {value:s?.datakey, label:s?.title, }}) : [];


      return (
              <div style={{display:"flex", gap:10, flexDirection:"column"}}>


                  {/* {JSON.stringify(sectorStateObj?.[0])} */}

                                                            <div style={{display:"flex", gap:10}}>

                                                                                    { countryStateObj ? <Region countryStateObj={countryStateObj} cityStateObj={cityStateObj} districtStateObj={districtStateObj} subdistrictStateObj={subdistrictStateObj}  /> : null }

                                                                                    { <div className={s.item_inputwr}>
                                                                                                    <select value={projectStateObj?.[0]} onChange={(e)=>{
                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                projectStateObj[1](value);
                                                                                                                                                sectorStateObj[1](undefined);
                                                                                                                                                subsectorStateObj[1](undefined);
                                                                                                                                                cclassStateObj[1](undefined);
                                                                                                                                                labelStateObj[1](undefined);
                                                                                                                                        }} style={selectstyle}>
                                                                                                            <option value={""}>Proje seçiniz</option>
                                                                                                            <option value={"sakaryarehberim.com"}>Sakaryarehberim.com</option>
                                                                                                            <option value={"yurtarama.com"}>Yurtarama.com</option>
                                                                                                            <option value={"supereleman.com"}>Süpereleman.com</option>
                                                                                                    </select>
                                                                                    </div>}


                                                                                    { (projectStateObj?.[0]) && <div className={s.item_inputwr}>

                                                                                                <select onChange={(e)=>{
                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                sectorStateObj[1](value);
                                                                                                subsectorStateObj[1](undefined);
                                                                                                cclassStateObj[1](undefined);
                                                                                                labelStateObj[1](undefined);

                                                                                                }} value={projectAdCategoryStateObj?.[0]}  style={selectstyle}>

                                                                                                <option value="">Reklam kategorileri</option>
                                                                                                { adcategoriesoptions?.map(s=>{ return <option value={s?.value}>{ s?.label }</option> }) }
                                                                                                                                          </select>
                                                                                                </div>}


                                                                                     {(projectStateObj?.[0] && !labelStateObj?.[0] && sectors_options?.length>0) && <div className={s.item_inputwr}>

                                                                                                <select onChange={(e)=>{

                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                sectorStateObj[1](value);
                                                                                                                                                subsectorStateObj[1](undefined);
                                                                                                                                                cclassStateObj[1](undefined);
                                                                                                                                                labelStateObj[1](undefined);

                                                                                                }} value={sectorStateObj?.[0]}  style={selectstyle}>

                                                                                                <option value="">Sektör seçiniz</option>
                                                                                                        { sectors_options?.map(s=>{ return <option value={s?.value}>{ s?.label }</option> }) }
                                                                                                </select>
                                                                                     </div>}


                                                                                        { subsectors_options?.length>0 && <div className={s.item_inputwr}>


                                                                                            <select  onChange={(e)=>{

                                                                                                                        let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                        subsectorStateObj[1](value);
                                                                                                                        cclassStateObj[1](undefined);
                                                                                                                        labelStateObj[1](undefined);
                                                                                                }}
                                                                                            value={subsectorStateObj?.[0]}
                                                                                            style={selectstyle}
                                                                                            >
                                                                                                    <option value="">Alt sektör seçiniz [{subsectors_options?.length}]</option>
                                                                                                    {subsectors_options?.map(s=>{

                                                                                                                                    return <option value={s?.value}>{ s?.label }</option>

                                                                                                                            })}
                                                                                            </select>

                                                                                        </div> }


                                                                                        { cclasses_options?.length>0 && <div className={s.item_inputwr}>


                                                                                                        <select  onChange={(e)=>{
                                                                                                                        let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                        cclassStateObj[1](value);
                                                                                                                        labelStateObj[1](undefined);
                                                                                                                }}
                                                                                                        value={cclassStateObj?.[0]}
                                                                                                        style={selectstyle}
                                                                                                        >
                                                                                                                <option value={""}>Sınıflandırma seçiniz- [{cclasses_options?.length}]</option>
                                                                                                                {cclasses_options?.map(s=>{
                                                                                                                                                return <option value={s?.value}>{ s?.label }</option>
                                                                                                                                        })}
                                                                                                        </select>

                                                                                                    </div> }


                                                                                       { !sectorStateObj?.[0] &&  <div className={s.item_inputwr}>

                                                                                                                <input onChange={(e)=>{

                                                                                                                                        let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                        labelStateObj[1](value);
                                                                                                                                        sectorStateObj[1](undefined);
                                                                                                                                        subsectorStateObj[1](undefined);
                                                                                                                                        cclassStateObj[1](undefined);

                                                                                                                                      }} style={selectstyle} value={labelStateObj?.[0]} placeholder="Etiket için slug girin"/>

                                                                                                    </div> }


                                                                                                    { <div className={s.item_inputwr}>
                                                                                                                                                                        <input type="date" onChange={(e)=>{
                                                                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                                                                searchParams[1](old=>old = {...old, date_start:value })
                                                                                                                                                                                              }} style={selectstyle} value={date_start} placeholder="Başlangıç Tarih"/>
                                                                                                      </div> }

                                                                                                    { <div className={s.item_inputwr}>
                                                                                                                                                                        <input type="date" onChange={(e)=>{
                                                                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                                                                searchParams[1](old=>old = {...old, date_finish:value })
                                                                                                                                                                                              }} style={selectstyle} value={date_finish} placeholder="Bitiş Tarih"/>
                                                                                                      </div> }


                                                                                                    <div className={s.item_inputwr}>
                                                                                                                              <input onChange={(e)=>{
                                                                                                                                                            let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                            contractowneremailStateObj[1](value);
                                                                                                                                                     }}
                                                                                                                                                     style={selectstyle} value={contractowneremailStateObj?.[0]} placeholder="Sözleşme sahibi email"/>


                                                                                                    {/* {contractowneremailStateObj?.[0]} */}
                                                                                                    </div>


                                                                                                    { link ? <a href={link} target={"_blank"} title="Proje içindeki konum"><RiExternalLinkFill/></a> : undefined }



                                                            </div>


               <div style={{display:"flex", gap:10}}>



               <select value={type}  onChange={ (e)=>{
                                                            let value = e?.target?.value ? e?.target?.value : undefined;
                                                            searchParams[1](old=>old = {...old, type:value })
                                                      }} key={`000-${"deep"}-${"tipler"}`} style={selectstyle}>

                              <option value={""}>         Tüm tipler         </option>
                              <option value={"sozlesme"}>   Sözleşmeler          </option>
                              <option value={"bilgi"}>    Bilgi notları      </option>
              </select>


              <select value={order}  onChange={ (e)=>{searchParams[1](old=>old = {...old, order:Number(e?.target?.value) }) }} key={`000-${"deep"}-${"siralama"}`} style={selectstyle}>
                        <option value={0}>    Sondan başa doğru sırala        </option>
                        <option value={1}>    Sözleşme bitişine göre sıralama      </option>

              </select>

                  <select value={closed}  onChange={ (e)=>{searchParams[1](old=>old = {...old, closed:Number(e?.target?.value) }) }} key={`bbc-${"deep"}-${"devam"}`} style={selectstyle}>
                                    <option value={undefined}>  Devam durumu   </option>
                                    <option value={0}>          Devam edenler  </option>
                                    <option value={1}>        Kapatılanlar   </option>
                  </select>


                  <select value={controlled}  onChange={ (e)=>{searchParams[1](old=>old = {...old, controlled:Number(e?.target?.value) }) }} key={`aaa-${"deep"}-${"kontrol"}`} style={selectstyle}>

                                    <option value={undefined}>   Kontrol durumu          </option>
                                    <option value={1}>          Kontrol edilenler       </option>
                                    <option value={0}>       Kontrol edilmeyenler    </option>
                  </select>

{/* {searchParams[0]?.closed} */}


                  <select value={paper_contract} onChange={ (e)=>{searchParams[1](old=>old = {...old, paper_contract:Number(e?.target?.value) }) }} key={`ccc-${"deep"}-${"durum"}`} style={selectstyle}>
                                          <option value={undefined}> Kağıt sözleşme durumu   </option>
                                          <option value={1}>        Sözleşme imzalatıldı  </option>
                                          <option value={0}>        Kağıt sözleşme yok   </option>
                  </select>

                  <select value={sms_contract} onChange={ (e)=>{searchParams[1](old=>old = {...old, sms_contract:Number(e?.target?.value) }) }} key={`ddd-${"deep"}-${"sms"}`} style={selectstyle}>
                                          <option value={undefined}> SMS sözleşme durumu   </option>
                                          <option value={1}>        SMS gönderildi  </option>
                                          <option value={0}>        SMS gönderilmedi   </option>
                  </select>

                  <select value={gift}  onChange={ (e)=>{searchParams[1](old=>old = {...old, gift:Number(e?.target?.value) }) }} key={`eee-${"deep"}-${"hediye"}`} style={selectstyle}>

                                          <option value={undefined}>   Hediye durumu            </option>
                                          <option value={1}>           Hediye edilenler         </option>
                                          <option value={0}>           Hediye edilmeyenler      </option>

                  </select>

                  {categories?.length>0 && !keywordObj[0] && <Filter_Categoies_Recursive parent_key="root" deep={0} {...props}/>}
                  <input value={keywordObj[0]} onChange={(e)=>{keywordObj[1](e?.target?.value);  _userState.myaccount_contracts_filtered_categories=[]  }} placeholder="Bir şeyler ara"/>


                  </div>
              </div>
              )
    }


    const Filter_Categoies_Recursive = (props) => {  //

      const {categories, parent_key, deep, setpage,  changeFilterSelect, filtered_categories } =props ?? {} ;

      // let select_categories=categories?.filter( cat => eval(`cat?.parent0_datakey`) == parent_key );
      let select_categories=categories?.filter( cat =>cat?.father_datakey == parent_key );

      let selected_value = filtered_categories?.[deep]?.datakey ; //?? breadcrumbObj?.[0]


      return (
        <div key={`div-${deep}`} style={{display:"flex", gap:10}}>

                    {/* {JSON.stringify(parent_key)} */}
                    {/* { JSON.stringify(filtered_categories?.map(a=>a?.datakey)) } */}
                    {/* {breadcrumbObj?.[0]} */}
                    {select_categories?.length>0 && <select value={selected_value }  onChange={ (e)=>changeFilterSelect({value:e?.target?.value, deep}) } key={`se-${deep}-${selected_value}`} style={selectstyle}>

                                                                  {  <option value={""}> Kategoriye göre filitreleyiniz </option>    }
                                                                  {  select_categories?.map(c=>{ return <option value={c?.datakey}  key={`op-${deep}-${c?.datakey}`}>{c?.title_tr}</option> })   }
                                                  </select>  }


                     { (!!selected_value && select_categories?.length>0)  && <Filter_Categoies_Recursive   {...props} deep={deep+1} parent_key={selected_value} />}


        </div>
      )
    }




let selectstyle={fontSize:11, padding:"4px 2px", width:140}









