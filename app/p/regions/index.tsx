"use client"

import Modal from 'react-modal';
import { useFormik } from 'formik';
import React, { useState } from "react";
import { useSnapshot } from 'valtio';
import { _userState} from "@/modules/constants/user";
import { RiFolderReduceFill , RiFileCopy2Fill,  RiBrushFill, RiDeleteBin2Fill, RiPaintBrushLine, RiSave2Fill,  RiFolderAddFill,  RiMenuAddLine } from "react-icons/ri";
import s from "./index.module.css"
import { slugifyFunc } from "@/modules/functions/slugifyfunc";
import { tabStatesFunc_WithKey } from "@/modules/functions/tabstatesfunc_withkey";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cachecountriesv3hook_next15 } from '@/modules/functions/cachecountriesv3hook_next15';
import { countrycitieshook_next15 } from '@/modules/functions/countrycitieshook_next15';
import { citydisrictshook_next15 } from '@/modules/functions/citydistrictshook_next15';
import { districtsubdistrictshook_next15 } from '@/modules/functions/districtsubdistrictshook_next15';



export default function Regions(props){

      let { domain } = props ?? {}; // Yukarıdan categories alınabilir ama almadım..            

      let _userStateData = useSnapshot(_userState);
      const queryClient = useQueryClient();
      
      
      const open_addmodal_district_StateObj   =  useState(false); 
      const open_deletemodal_subdistrict_StateObj   =  useState(false); 

      
      const open_copymodal_subdistrict_StateObj   =  useState(false); 
      const open_copymodal_district_StateObj       =  useState(false); 
      const open_deletemodal_district_StateObj       =  useState(false); 
      const open_addmodal_subdistrict_StateObj       =  useState(false); 

      const open_addmodal_city_StateObj       =  useState(false); 

      const open_addmodal_country_StateObj    =  useState(false); // Country ekleme
      const open_copymodal_country_StateObj   =  useState(false); // Categori kopyalama
      const open_deletemodal_country_StateObj =  useState(false); // Categori silme      
      const modal_StateObj =  useState(false); // TÜm modalların açık kapalı durumu
            
      const panelStates        =  useState([]); //  panellerin açık kapalı durumu.. Direk hepsi açık gelince çok çirkin bir görüntü oluşuyor
      const citiesStates       =  useState([]); //  Alt kategorilerin açık kapalı durumu.. Direk hepsi açık gelince çok çirkin bir görüntü oluşuyor
      const districtsStates    =  useState([]);
      const subdistrictsStates =  useState([]);
      
      let { data:countries } = cachecountriesv3hook_next15({givedistricts:false});
                                                       
        // return  <div>{JSON.stringify(countries)}</div>             
      return (            
                    <CountriesComp open_deletemodal_subdistrict_StateObj={open_deletemodal_subdistrict_StateObj} open_copymodal_subdistrict_StateObj={open_copymodal_subdistrict_StateObj} open_addmodal_subdistrict_StateObj={open_addmodal_subdistrict_StateObj} districtsStates={districtsStates} subdistrictsStates={subdistrictsStates} open_copymodal_district_StateObj={open_copymodal_district_StateObj} open_deletemodal_district_StateObj={open_deletemodal_district_StateObj} open_addmodal_district_StateObj={open_addmodal_district_StateObj} queryClient={queryClient} countries={countries} modal_StateObj={modal_StateObj} open_addmodal_country_StateObj={open_addmodal_country_StateObj} citiesStates={citiesStates} open_addmodal_city_StateObj={open_addmodal_city_StateObj} open_copymodal_country_StateObj={open_copymodal_country_StateObj} panelStates={panelStates}  open_deletemodal_country_StateObj={open_deletemodal_country_StateObj} />            
              )
    }
    

    function CountriesComp(props){
      
      let {countries,queryClient,  open_addmodal_city_StateObj, open_deletemodal_country_StateObj, open_copymodal_country_StateObj, panelStates, citiesStates, open_addmodal_country_StateObj, modalTitle, modalText} = props ?? {};

      let closeModal = () => open_addmodal_country_StateObj[1](false);
      let mutateFunc_AddCountry = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"countrymutation_addcountry" } }) });  closeModal(); setTimeout(() => { queryClient.invalidateQueries();}, 100) }
      let isOpened=open_addmodal_country_StateObj[0];
      
      let modalTitleAdd = `Ülke ekleme`;
      let modalTextAdd = `Yeni bir ülke eklemek istiyor musunuz?`;
      
      return (
        <div className={s.countriesshell}>

                        {countries?.map(country=> { return <Country country={country} {...props}/> })}

                        <div className={s.addwr} onClick={()=>{ open_addmodal_country_StateObj[1](old=>!old) }}> <RiMenuAddLine size={30} /> Ülke Ekle </div>

                        <MyModal props={{ mutateFunc:mutateFunc_AddCountry, closeModal, isOpened, modalTitle:modalTitleAdd, modalText:modalTextAdd }}/>

        </div>
      )
    }
    
    



        
    const Country = (props) => {
      
      let {queryClient, country, citiesStates, open_addmodal_city_StateObj, open_deletemodal_country_StateObj, open_copymodal_country_StateObj,  panelStates} = props;                  
      // let mutateFunc_AddCity = async ({values}) => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"countrymutation_addcity",country:values?.country} }) });  setTimeout(() => { queryClient.invalidateQueries(); }, 100) }
      
      const formik = useFormik({
        initialValues: {country}, // DBden gelen deger forma yükleniyor...
        enableReinitialize:true,  
        onSubmit: values => {                              
                                  //  console.log("countriesssss::::", values);                                                                                           
                                  mutateFunc_Update({values})
                            },    //alert(JSON.stringify(values?.category?.parent_slug, null, 2)); 
      });
      
      country = formik?.values?.country;


      let closeCopyModal = () => open_copymodal_country_StateObj[1](false);
      let closeDeleteModal = () => open_deletemodal_country_StateObj[1](false);
      let closeAddCityModal = () => open_addmodal_city_StateObj[1](false);
      let mutateFunc_Update = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"countrymutation_update", country } }) });  queryClient.invalidateQueries();  }
      let mutateFunc_Copy = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"countrymutation_copy",country} }) });  queryClient.invalidateQueries(); closeCopyModal; } 
      let mutateFunc_Delete = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"countrymutation_delete", country } }) });  queryClient.invalidateQueries(); closeCopyModal; }
      let mutateFunc_AddCity = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"citymutation_addcity", country } }) });  queryClient.invalidateQueries(); closeCopyModal; }
      let isOpenedCopyModal = open_copymodal_country_StateObj[0];
      let isOpenedDeleteModal = open_deletemodal_country_StateObj[0];
      let isOpenedAddCityModal = open_addmodal_city_StateObj[0];
                  
      let modalTitleCopy = `Ülke kopyalama [${country?.slug_tr}]`;
      let modalTextCopy = `"${country?.title_tr}" için kopyalama yapmak istiyor musunuz?`;

      let modalTitleAddCity = `Şehir ekleme`;
      let modalTextAddCity = `"${country?.title_tr}" ülkesi için şehir eklemesi yapmak istiyor musunuz?`;

      let modalTitleDelete = `Ülke silme [${country?.slug_tr}]`
      let modalTextDelete = `"${country?.title_tr}" için silme işlemi yapmak istiyor musunuz?`;

      let countryOpen = panelStates[0]?.find(t=>t?.key==`${country?.datakey}-country`)?.state;
      let citiesOpen = citiesStates[0]?.find(t=>t?.key==`${country?.datakey}-cities`)?.state;
      
      
      let { data:cities } = countrycitieshook_next15({country, enabled:countryOpen});
           
      
      return (
        <div className={s.countryshell} key={country?.datakey}>
          
             {/* {JSON.stringify(cities)} */}
             <div className={s.titlewr}  onClick={()=>{ tabStatesFunc_WithKey({ key:`${country?.datakey}-country`, set_tabstates:panelStates[1] });}}>
                      { country?.title_tr }
             </div>

             {countryOpen && <div className={s.body}>   

                            <div className={s.iconsleftwr}>                          
                                    <div onClick={()=>{ if(cities?.length>0) { tabStatesFunc_WithKey({ key:`${country?.datakey}-cities`, set_tabstates:citiesStates[1] }); }  }}  style={{color: `${cities?.length>0 ? "green" : "gray"}`}} title={`Şehirler [${cities?.length}]`}  className={s.scicon}> {!citiesOpen ? <RiFolderAddFill /> : <RiFolderReduceFill/>} </div>                                    
                            </div>

                            <div className={s.inputrowgroup}>
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Başlık "TR"`} mainFieldName={`country.title_tr`} mainFieldValue={country?.title_tr ?? ""} triggerFieldName={`country.slug_tr`} formik={formik}/>
                                                <InputComp subject={`Başlık "EN"`} mainFieldName={`country.title_en`} mainFieldValue={country?.title_en ?? ""} triggerFieldName={`country.slug_en`} formik={formik} />
                                      </div>   
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Slug "TR"`}  mainFieldName={`country.slug_tr`}  mainFieldValue={country?.slug_tr ?? ""} triggerFieldName={`country.datakey`} formik={formik}/>
                                                <InputComp subject={`Slug "EN"`}  mainFieldName={`country.slug_en`}  mainFieldValue={country?.slug_en ?? ""} formik={formik}/>
                                      </div>  
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Datakey`} mainFieldDatakey={country?.datakey} mainFieldName={`country.datakey`} mainFieldValue={country?.datakey ?? ""} formik={formik} disabled={cities?.length>0}/>                                              
                                      </div>                                                                                       
                            </div>


                            <div className={s.iconsrightwr} >                 
                                    <div onClick={()=>{formik.dirty && formik.handleSubmit()}}  title='Kaydet' style={{color: `${formik.dirty ? "#0e550e" : "gray"}`}} className={s.button}> { <RiSave2Fill/> } </div>                                                                
                                    <div onClick={()=>{!formik.dirty && open_addmodal_city_StateObj[1](true)}}  title={!formik.dirty ? `Şehir ekle` : `Şehir eklemek için önce yarım kalan kaydetme işlemini tamamlayın!`}  className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}> { <RiMenuAddLine/> } </div>
                                    <div onClick={()=>{!formik.dirty && open_copymodal_country_StateObj[1](true);  }}  title={!formik.dirty ? `Ülkeyi kopyala` : `Kategori kopyalamak için önce yarım kalan kaydetme işlemini tamamlayın!`}  className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}>  { <RiFileCopy2Fill/> } </div>
                                    <div onClick={()=>{formik.dirty && formik.handleReset()}}  title='Temizle' style={{color: `${formik.dirty ? "#910000" : "gray"}`}}  className={s.button}> { <RiPaintBrushLine/> } </div>
                                    <div onClick={()=>{!(cities?.length>0) && open_deletemodal_country_StateObj[1](true)}} title={` ${cities?.length>0 ? "Önce mevcut alt kategorileri siliniz!": "Kategori sil"}`}  className={s.button} style={{color: `${!(cities?.length>0) ? "#910000" : "gray"}`}}  > { <RiDeleteBin2Fill/>} </div>                                    
                            </div> 

                            {<MyModal props={{ mutateFunc:mutateFunc_Copy, closeModal:closeCopyModal, isOpened:isOpenedCopyModal, modalTitle:modalTitleCopy, modalText:modalTextCopy}}/> }
                            {<MyModal props={{ mutateFunc:mutateFunc_Delete, closeModal:closeDeleteModal, isOpened:isOpenedDeleteModal, modalTitle:modalTitleDelete, modalText:modalTextDelete }}/> }
                            {<MyModal props={{ mutateFunc:mutateFunc_AddCity, closeModal:closeAddCityModal, isOpened:isOpenedAddCityModal, modalTitle:modalTitleAddCity, modalText:modalTextAddCity }}/> }

             </div>}

             {countryOpen && citiesOpen && <CitiesComp cities={cities} countryOpen={countryOpen} citiesOpen={citiesOpen} {...props}/>}

        </div>
        ) 
    }
    
    
        
    function CitiesComp(props){
      
      let {cities, citiesOpen} = props ?? {};      
      return (
        <div className={s.citieswr}>
                {cities?.map(city=> {
                    return <City city={city} {...props}/>
                })}
        </div>
      )
    }



    const City = (props) => {
      
      let {city, countryOpen, citiesOpen, country, districtsStates, open_addmodal_district_StateObj, queryClient, open_addmodal_city_StateObj, open_deletemodal_country_StateObj,  open_copymodal_country_StateObj, panelStates} = props;      
      
      const [copycount, setcopycount] = useState(1);

      let mutateFunc_Update = async ({values}) => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"citymutation_update",city:values?.city} }) });  setTimeout(() => { queryClient.invalidateQueries(); }, 200) }
      
      const formik = useFormik({
        initialValues: {city}, // DBden gelen deger forma yükleniyor...
        enableReinitialize:true,  
        onSubmit: values => {                              
                                  mutateFunc_Update({values})
                            },    //alert(JSON.stringify(values?.category?.parent_slug, null, 2)); 
      });
      
      city = formik?.values?.city;

      let cityOpen = panelStates?.[0]?.find(t=>t?.key==`${city?.id}-city`)?.state;
      let districtsOpen = panelStates?.[0]?.find(t=>t?.key==`${city?.id}-districts`)?.state;

      let closeCopyModal = () => open_copymodal_country_StateObj[1](false);
      let closeDeleteModal = () => open_deletemodal_country_StateObj[1](false);      
      let closeAddDistrictModal = () => open_addmodal_district_StateObj[1](false);      
      let mutateFunc_AddDistrict = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"districtmutation_adddistrict", city, copycount} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeAddDistrictModal() }, 100) }
      let mutateFunc_Copy = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"citymutation_copy", city} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeCopyModal() }, 100) }
      let mutateFunc_Delete = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"citymutation_delete", city} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeDeleteModal() }, 100) }
      let isOpenedCopyModal = open_copymodal_country_StateObj[0];
      let isOpenedDeleteModal = open_deletemodal_country_StateObj[0];      
      let isOpenedAddDistrictModal = open_addmodal_district_StateObj[0];
                        
      let modalTitleAddDistrict = `İlçe ekleme`;
      let modalTextAddDistrict = `"${city?.title_tr}" şehri için ilçe eklemesi yapmak istiyor musunuz? - ${copycount} kayıt eklenecek`;

      let modalTitleCopy = `Şehir kopyalama`;
      let modalTextCopy = `"${city?.title_tr}" kopyalama yapmak istiyor musunuz?`;

      let modalTitleDelete = `Şehir silme`;
      let modalTextDelete = `"${city?.title_tr}" silmek istiyor musunuz?`;  
      
      let { data:districts } = citydisrictshook_next15({city, enabled:cityOpen});

      return (
        <div className={s.cityshell} key={city?.id}>
          
             {/* {JSON.stringify(country)} */}
             <div className={s.citytitlewr}  onClick={()=>{   tabStatesFunc_WithKey({ key:`${city?.id}-city`, set_tabstates:panelStates[1] });  }}>
                 <div>{city?.title_tr} </div>
                 <div>{city?.country_datakey} </div>                                  
            </div>

             {cityOpen && <div className={s.body}>

             <div className={s.iconsleftwr}>                          
                  <div onClick={()=>{ if(districts?.length>0) { tabStatesFunc_WithKey({ key:`${city?.id}-districts`, set_tabstates:panelStates[1] }); }  }}  style={{color: `${districts?.length>0 ? "green" : "gray"}`}} title={`İlçeler [${districts?.length}]`} > {!districtsOpen ? <RiFolderAddFill /> : <RiFolderReduceFill/>} </div>
            </div>

                            <div className={s.inputrowgroup}>                      
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Başlık "TR"`} mainFieldName={`city.title_tr`} mainFieldValue={city?.title_tr ?? ""} formik={formik}  triggerFieldName={`city.slug_tr`}  mainFieldDatakey={city?.datakey}/>
                                                <InputComp subject={`Başlık "EN"`} mainFieldName={`city.title_en`} mainFieldValue={city?.title_en ?? ""} formik={formik}  triggerFieldName={`city.slug_en`}  mainFieldDatakey={undefined}/>
                                      </div>   
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Slug "TR"`} mainFieldDatakey={city?.datakey} mainFieldName={`city.slug_tr`} mainFieldValue={city?.slug_tr ?? ""}  triggerFieldName={`city.datakey`} formik={formik}/>
                                                <InputComp subject={`Slug "EN"`} mainFieldDatakey={city?.datakey} mainFieldName={`city.slug_en`} mainFieldValue={city?.slug_en ?? ""} formik={formik}/>
                                      </div>         
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Datakey`} mainFieldDatakey={city?.datakey} mainFieldName={`city.datakey`} mainFieldValue={city?.datakey ?? ""} formik={formik} disabled={districts?.length>0}/>
                                      </div>                                                 
                            </div>

                            <div className={s.iconsrightwr} >                 
                                      <div onClick={()=>{formik.dirty && formik.handleSubmit()}}  title='Kaydet' style={{color: `${formik.dirty ? "#0e550e" : "gray"}`}}> { <RiSave2Fill/> } </div>                            
                                      {/* {console.log('formik__________', formik?.values?.category?.title_en)} */}
                                      <div className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}> { <RiMenuAddLine onClick={()=>{!formik.dirty && open_addmodal_district_StateObj[1](true)}}  title={!formik.dirty ? `İlçe ekle` : `İlçe eklemek için önce yarım kalan kaydetme işlemini tamamlayın!`}/> }  <input title="Kaç kopya olacak" value={copycount} className={s.copyinput}  onChange={(e)=>{let count=Number(e?.target?.value); count>10 ? setcopycount(10) : setcopycount(count)  }}/> </div>
                                      <div onClick={()=>{!formik.dirty && open_copymodal_country_StateObj[1](true);  }}  title={!formik.dirty ? `Şehri kopyala` : `Şehri kopyalamak için önce yarım kalan kaydetme işlemini tamamlayın!`}  className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}>  { <RiFileCopy2Fill/> } </div>
                                      <div onClick={()=>{formik.dirty && formik.handleReset()}}  title='Temizle' style={{color: `${formik.dirty ? "#910000" : "gray"}`}}> { <RiPaintBrushLine/> } </div>
                                      <div onClick={()=>{![]?.length>0 && open_deletemodal_country_StateObj[1](true)}} title={` ${[]?.length>0 ? "Önce mevcut alt kategorileri siliniz!": "Kategori sil"}`} className={s.deleteCategoryButton}  style={{color: `${![]?.length>0 ? "#910000" : "gray"}`}}  > { <RiDeleteBin2Fill/>} </div>                                    
                            </div> 
                            {isOpenedDeleteModal && <MyModal props={{ mutateFunc:mutateFunc_Delete, closeModal:closeDeleteModal, isOpened:isOpenedDeleteModal, modalTitle:modalTitleDelete, modalText:modalTextDelete}}/>}
                            {isOpenedCopyModal && <MyModal props={{ mutateFunc:mutateFunc_Copy, closeModal:closeCopyModal, isOpened:isOpenedCopyModal, modalTitle:modalTitleCopy, modalText:modalTextCopy}}/>}
                            {isOpenedAddDistrictModal && <MyModal props={{ mutateFunc:mutateFunc_AddDistrict, closeModal:closeAddDistrictModal, isOpened:isOpenedAddDistrictModal, modalTitle:modalTitleAddDistrict, modalText:modalTextAddDistrict}}/>} 
             </div>}



             {countryOpen && citiesOpen && cityOpen &&  districtsOpen &&  <DistrictsComp districts={districts} countryOpen={countryOpen} cityOpen={cityOpen} districtsOpen={districtsOpen}  {...props}/>}

        </div>
        ) 
    }
    
    
    


    
        
    function DistrictsComp(props){
      
      let {districts} = props ?? {};      
      return (
        <div className={s.citieswr}>
          
                {districts?.map(district=> {
                    return <District district={district} {...props}/>
                })}

        </div>
      )
    }



    const District = (props) => {
      
      let {district, city, country, queryClient, open_addmodal_city_StateObj, countryOpen, cityOpen, districtsOpen,  open_copymodal_district_StateObj, open_deletemodal_district_StateObj, open_addmodal_district_StateObj, open_deletemodal_country_StateObj,  open_copymodal_country_StateObj, panelStates} = props;
      
      const [copycount, setcopycount] = useState(1);

      // const queryClient = useQueryClient();
      let mutateFunc_Update = async ({values}) => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"districtmutation_update",district:values?.district} }) });  setTimeout(() => { queryClient.invalidateQueries(); }, 200) }
      
      const formik = useFormik({
        initialValues: {district}, // DBden gelen deger forma yükleniyor...
        enableReinitialize:true,  
        onSubmit: values => {                              
                                  mutateFunc_Update({values})
                            },    //alert(JSON.stringify(values?.category?.parent_slug, null, 2)); 
      });
      
      district = formik?.values?.district;

      let districtOpen= panelStates?.[0]?.find(t=>t?.key==`${district?.id}-district`)?.state;
      let subdistrictsOpen = panelStates?.[0]?.find(t=>t?.key==`${district?.id}-subdistricts`)?.state;

      let closeCopyModal = () => open_copymodal_district_StateObj[1](false);
      let closeDeleteModal = () => open_deletemodal_district_StateObj[1](false);
      let closeAddCityModal = () => open_addmodal_district_StateObj[1](false);
      let mutateFunc_AddSubdistrict = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"subdistrictmutation_addsubdistrict", district, copycount} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeAddCityModal() }, 100) }
      let mutateFunc_Copy = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"districtmutation_copy", district} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeCopyModal() }, 100) }
      let mutateFunc_Delete = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"districtmutation_delete", district} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeDeleteModal() }, 100) }
      let isOpenedCopyModal = open_copymodal_district_StateObj[0];
      let isOpenedDeleteModal = open_deletemodal_district_StateObj[0];
      let isOpenedDistrictModal = open_addmodal_district_StateObj[0];
                        
      let modalTitleAddCity = `Mahalle ekleme`;
      let modalTextAddCity = `"${district?.title_tr}" için mahalle eklemesi yapmak istiyor musunuz? - ${copycount} kayıt eklenecek`;

      let modalTitleCopy = `İlçe kopyalama`;
      let modalTextCopy = `"${district?.title_tr}" kopyalama yapmak istiyor musunuz?`;

      let modalTitleDelete = `İlçe silme`;
      let modalTextDelete = `"${district?.title_tr}" silmek istiyor musunuz?`;      
      
      

      let { data:subdistricts } = districtsubdistrictshook_next15({district, enabled:true});

      return (
        <div className={s.cityshell} key={city?.id}>
          
             {/* { JSON.stringify(subdistricts) } */}
             <div className={s.districttitlewr}  onClick={()=>{   tabStatesFunc_WithKey({ key:`${district?.id}-district`, set_tabstates:panelStates[1] });  }}>                           
                    <div>{district?.title_tr} </div>
                    <div>{district?.country_datakey} / {district?.city_datakey} </div>     
             </div>

             {districtOpen && <div className={s.body}>

             {/* <div onClick={()=>{ if(districts?.length>0) { tabStatesFunc_WithKey({ key:`${city?.id}-districts`, set_tabstates:panelStates[1] }); }  }}  style={{color: `${districts?.length>0 ? "green" : "gray"}`}} title={`İlçeler [${districts?.length}]`} > {!open_addmodal_city_StateObj[0] ? <RiFolderAddFill /> : <RiFolderReduceFill/>} </div> */}


             <div className={s.iconsleftwr}>                          
                 <div onClick={()=>{ if(subdistricts?.length>0) {  tabStatesFunc_WithKey({ key:`${district?.id}-subdistricts`, set_tabstates:panelStates[1] }); }  }}  style={{color: `${subdistricts?.length>0 ? "green" : "gray"}`}} title={`Mahalleler [${subdistricts?.length}]`} > {!subdistrictsOpen ? <RiFolderAddFill /> : <RiFolderReduceFill/>} </div>                                      
            </div>

                            <div className={s.inputrowgroup}>                      
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Başlık "TR"`} mainFieldName={`district.title_tr`} mainFieldValue={district?.title_tr ?? ""} formik={formik}  triggerFieldName={`district.slug_tr`}  mainFieldDatakey={district?.datakey}/>
                                                <InputComp subject={`Başlık "EN"`} mainFieldName={`district.title_en`} mainFieldValue={district?.title_en ?? ""} formik={formik}  triggerFieldName={`district.slug_en`}  mainFieldDatakey={undefined}/>
                                      </div>   
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Slug "TR"`} mainFieldDatakey={district?.datakey} mainFieldName={`district.slug_tr`} mainFieldValue={district?.slug_tr ?? ""}  triggerFieldName={`district.datakey`} formik={formik}/>
                                                <InputComp subject={`Slug "EN"`} mainFieldDatakey={district?.datakey} mainFieldName={`district.slug_en`} mainFieldValue={district?.slug_en ?? ""} formik={formik}/>
                                      </div>         
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Datakey`} mainFieldDatakey={district?.datakey} mainFieldName={`district.datakey`} mainFieldValue={district?.datakey ?? ""} formik={formik} disabled={subdistricts?.length>0}/>
                                      </div>                                                 
                            </div>

                            <div className={s.iconsrightwr}>
                                      <div onClick={()=>{formik.dirty && formik.handleSubmit()}}  title='Kaydet' style={{color: `${formik.dirty ? "#0e550e" : "gray"}`}}> { <RiSave2Fill/> } </div>                            
                                      {/* {console.log('formik__________', formik?.values?.category?.title_en)} */}
                                      <div className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}> { <RiMenuAddLine onClick={()=>{!formik.dirty && open_addmodal_district_StateObj[1](true)}}  title={!formik.dirty ? `Mahalle ekle` : `Mahalle eklemek için önce yarım kalan kaydetme işlemini tamamlayın!`}/> } <input title="Kaç kopya olacak" value={copycount} className={s.copyinput}  onChange={(e)=>{let count=Number(e?.target?.value); count>10 ? setcopycount(10) : setcopycount(count)  }}/> </div>
                                      <div onClick={()=>{!formik.dirty && open_copymodal_district_StateObj[1](true);  }}  title={!formik.dirty ? `İlçe kopyala` : `İlçe kopyalamak için önce yarım kalan kaydetme işlemini tamamlayın!`}  className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}>  { <RiFileCopy2Fill/> } </div>
                                      <div onClick={()=>{formik.dirty && formik.handleReset()}}  title='Temizle' style={{color: `${formik.dirty ? "#910000" : "gray"}`}}> { <RiPaintBrushLine/> } </div>
                                      <div onClick={()=>{!subdistricts?.length>0 && open_deletemodal_district_StateObj[1](true)}} title={` ${subdistricts?.length>0 ? "Önce mevcut alt kategorileri siliniz!": "Kategori sil"}`} className={s.deleteCategoryButton}  style={{color: `${!subdistricts?.length>0 ? "#910000" : "gray"}`}}  > { <RiDeleteBin2Fill/>} </div>                                    
                            </div> 
                            {isOpenedDeleteModal && <MyModal props={{ mutateFunc:mutateFunc_Delete, closeModal:closeDeleteModal, isOpened:isOpenedDeleteModal, modalTitle:modalTitleDelete, modalText:modalTextDelete}}/>}
                            {isOpenedCopyModal && <MyModal props={{ mutateFunc:mutateFunc_Copy, closeModal:closeCopyModal, isOpened:isOpenedCopyModal, modalTitle:modalTitleCopy, modalText:modalTextCopy}}/>}
                            {isOpenedDistrictModal && <MyModal props={{ mutateFunc:mutateFunc_AddSubdistrict, closeModal:closeAddCityModal, isOpened:isOpenedDistrictModal, modalTitle:modalTitleAddCity, modalText:modalTextAddCity}}/>} 


                           
             </div>}

             { cityOpen &&  districtsOpen && subdistrictsOpen && <SubdistrictsComp subdistricts={subdistricts} countryOpen={countryOpen} cityOpen={cityOpen} districtsOpen={districtsOpen}  {...props}/> }

        </div>
        ) 
    }












    function SubdistrictsComp(props){
      
      let {subdistricts} = props ?? {};      
      return (
        <div className={s.citieswr}>
          
                {subdistricts?.map(subdistrict=> {
                
                        return <Subdistrict subdistrict={subdistrict} {...props}/>
                
                })}

        </div>
      )
    }



    const Subdistrict = (props) => {
      
      let {subdistrict, district, country, queryClient, open_addmodal_subdistrict_StateObj,open_copymodal_subdistrict_StateObj, open_deletemodal_subdistrict_StateObj,open_deletemodal_country_StateObj,  open_copymodal_country_StateObj, panelStates} = props;
            
      let mutateFunc_Update = async ({values}) => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"subdistrictmutation_update",subdistrict:values?.subdistrict} }) });  setTimeout(() => { queryClient.invalidateQueries(); }, 200) }
      
      const formik = useFormik({
        initialValues: {subdistrict}, // DBden gelen deger forma yükleniyor...
        enableReinitialize:true,  
        onSubmit: values => {                              
                                  mutateFunc_Update({values})
                            },    //alert(JSON.stringify(values?.category?.parent_slug, null, 2)); 
      });
      
      subdistrict = formik?.values?.subdistrict;

      let subdistrictOpen= panelStates?.[0]?.find(t=>t?.key==`${subdistrict?.id}-subdistrict`)?.state;

      let closeCopyModal = () => open_copymodal_subdistrict_StateObj[1](false);
      let closeDeleteModal = () => open_deletemodal_subdistrict_StateObj[1](false);      

      let mutateFunc_Copy = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"subdistrictmutation_copy", subdistrict} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeCopyModal() }, 100) }
      let mutateFunc_Delete = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"subdistrictmutation_delete", subdistrict} }) });  setTimeout(() => { queryClient.invalidateQueries(); closeDeleteModal() }, 100) }
      let isOpenedCopyModal = open_copymodal_subdistrict_StateObj[0];
      let isOpenedDeleteModal = open_deletemodal_subdistrict_StateObj[0];
      

      let modalTitleCopy = `Mahalle kopyalama`;
      let modalTextCopy = `"${subdistrict?.title_tr}" kopyalama yapmak istiyor musunuz?`;

      let modalTitleDelete = `Mahalle silme`;
      let modalTextDelete = `"${subdistrict?.title_tr}" silmek istiyor musunuz?`;
      

      return (
        <div className={s.cityshell} key={subdistrict?.id}>
          
             {/* {JSON.stringify(city)} */}
             <div className={s.subdistricttitlewr}  onClick={()=>{   tabStatesFunc_WithKey({ key:`${subdistrict?.id}-subdistrict`, set_tabstates:panelStates[1] });  }}> 
             
                <div>{subdistrict?.title_tr} </div>
                <div>{subdistrict?.country_datakey} / {subdistrict?.city_datakey} / {subdistrict?.district_datakey} </div>     

              </div>

             {subdistrictOpen && <div className={s.body}>

             <div className={s.iconsleftwr}>                          
                  {/* <div onClick={()=>{ if([]?.length>0) { open_addmodal_subdistrict_StateObj[1](item=>!item); }  }}  style={{color: `${[]?.length>0 ? "green" : "gray"}`}} title={`Alt kategoriler [${[]?.length}]`} > {!open_addmodal_subdistrict_StateObj[0] ? <RiFolderAddFill /> : <RiFolderReduceFill/>} </div>                                       */}
            </div>

                            <div className={s.inputrowgroup}>                      
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Başlık "TR"`} mainFieldName={`subdistrict.title_tr`} mainFieldValue={subdistrict?.title_tr ?? ""} formik={formik}  triggerFieldName={`subdistrict.slug_tr`}  mainFieldDatakey={subdistrict?.datakey}/>
                                                <InputComp subject={`Başlık "EN"`} mainFieldName={`subdistrict.title_en`} mainFieldValue={subdistrict?.title_en ?? ""} formik={formik}  triggerFieldName={`subdistrict.slug_en`}  mainFieldDatakey={undefined}/>
                                      </div>   
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Slug "TR"`} mainFieldDatakey={subdistrict?.datakey} mainFieldName={`subdistrict.slug_tr`} mainFieldValue={subdistrict?.slug_tr ?? ""}  triggerFieldName={`subdistrict.datakey`} formik={formik}/>
                                                <InputComp subject={`Slug "EN"`} mainFieldDatakey={subdistrict?.datakey} mainFieldName={`subdistrict.slug_en`} mainFieldValue={subdistrict?.slug_en ?? ""} formik={formik}/>
                                      </div>         
                                      <div className={s.inputrow}>       
                                                <InputComp subject={`Datakey`} mainFieldDatakey={subdistrict?.datakey} mainFieldName={`subdistrict.datakey`} mainFieldValue={subdistrict?.datakey ?? ""} formik={formik} disabled={[]?.length>0}/>
                                      </div>                                                 
                            </div>

                            <div className={s.iconsrightwr} >                 
                                      <div onClick={()=>{formik.dirty && formik.handleSubmit()}}  title='Kaydet' style={{color: `${formik.dirty ? "#0e550e" : "gray"}`}}> { <RiSave2Fill/> } </div>                            
                                      {/* { console.log('formik__________', formik?.values?.category?.title_en) } */}
                                      <div onClick={()=>{!formik.dirty && open_copymodal_subdistrict_StateObj[1](true);  }}  title={!formik.dirty ? `Kategoriyi kopyala` : `Kategori kopyalamak için önce yarım kalan kaydetme işlemini tamamlayın!`}  className={s.button}  style={{color: `${!formik.dirty ? "#0e550e" : "gray"}`}}>  { <RiFileCopy2Fill/> } </div>
                                      <div onClick={()=>{formik.dirty && formik.handleReset()}}  title='Temizle' style={{color: `${formik.dirty ? "#910000" : "gray"}`}}> { <RiPaintBrushLine/> } </div>
                                      <div onClick={()=>{![]?.length>0 && open_deletemodal_subdistrict_StateObj[1](true)}} title={` ${[]?.length>0 ? "Önce mevcut alt kategorileri siliniz!": "Kategori sil"}`} className={s.deleteCategoryButton}  style={{color: `${![]?.length>0 ? "#910000" : "gray"}`}}  > { <RiDeleteBin2Fill/>} </div>                                    
                            </div> 
                            {isOpenedDeleteModal && <MyModal props={{ mutateFunc:mutateFunc_Delete, closeModal:closeDeleteModal, isOpened:isOpenedDeleteModal, modalTitle:modalTitleDelete, modalText:modalTextDelete}}/>}
                            {isOpenedCopyModal && <MyModal props={{ mutateFunc:mutateFunc_Copy, closeModal:closeCopyModal, isOpened:isOpenedCopyModal, modalTitle:modalTitleCopy, modalText:modalTextCopy}}/>}
                            {/* {isOpenedAddCityModal && <MyModal props={{ mutateFunc:mutateFunc_AddCity, closeModal:closeAddCityModal, isOpened:isOpenedAddCityModal, modalTitle:modalTitleAddCity, modalText:modalTextAddCity}}/>}  */}
             </div>}

        </div>
        ) 
    }
    
    
    


    




























    
    const MyModal = ({props}) => {

      let {                                                         
             mutateFunc,
             closeModal,      
             isOpened,
             modalTitle,
             modalText
          } = props;
          
          // let targetvalue = category?.targetcategorypath ?? [];      
          const targetObj = useState([]);
    
          return (
            <div>        
                                                        <Modal
                                                        isOpen={isOpened}                                                      
                                                        onRequestClose={()=>closeModal()}
                                                        style={customStyles}
                                                        contentLabel="Example Modal"
                                                        ariaHideApp={false}
                                                        >                                                      
                                                              <div className={s.modal}>
                                                                    {/* {JSON.stringify(country)} */}
                                                                    <div className={s.modaltitle}>{modalTitle}        </div>
                                                                    <p className={s.modaltext}> {modalText} </p> 
                                                                          <div style={{display:"flex", gap:30}}>
                                                                                  {/* mutateFunc_Copy({ country, targetpath:targetObj[0] }); */}
                                                                                  <button onClick={()=>{mutateFunc({ targetpath:targetObj[0] });   }} color="error">Evet</button>
                                                                                  <button onClick={()=>closeModal()} style={{marginLeft:8}}>Hayır</button>
                                                                          </div>
                                                              </div>                                                      
                                                        </Modal>
            </div>
          )
    }



    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    
    
    
    
    
    
    
    const InputComp = (props) => {

      let { subject, mainFieldDatakey, mainFieldName, mainFieldValue, triggerFieldName, triggerFieldTitle="Slug oluştur", formik, disabled } = props;

      return (
                  <div className={s.inputwr}>                      
                              <div className={s.inputtitle}>                              
                                       {subject}
                                       {/* {mainFieldDatakey && <div> {mainFieldDatakey} </div>  }   */}
                              </div>                                            
                              <input id={mainFieldValue} type="text" name={mainFieldName}  onChange={formik.handleChange} value={mainFieldValue} disabled={disabled}/>
                              {triggerFieldName && <div className={s.slugicon} onClick={()=>formik.setFieldValue(triggerFieldName, slugifyFunc(mainFieldValue).slugstring)} title={triggerFieldTitle}> <RiBrushFill/> </div>}
                  </div>
            )
    }
    
  
