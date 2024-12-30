import s from "./layoutmain.module.css"
import {LayoutLeft} from "./layoutleft";
 import {YankeeGoHome} from "@/components/commonnew/yankeegohome"; 
import {isLoggedV2} from "@/modules/functions/isloggedv2"
import Head from 'next/head';
import React, { useState } from "react";
import { RiMenuLine , RiCloseLine, RiExternalLinkFill,RiCloseCircleFill } from "react-icons/ri";
import { Footer} from "@/components/commonnew/footer";
import Region  from "@/modules/common/region";
import projectbasedlink from "@/components/utilsnew/projectbasedlink";
import { useRouter } from "next/router";

export const LayoutMain = (props) => {
        
    const router = useRouter();
    const {locale, defaultLocale, query:{id, country_slug, city_slug, district_slug, subdistrict_slug}}= router;    
    const uploadObj = useState(false);
    const [left, setleft] = useState(false);

    let  isloggeddata = isLoggedV2();
    let {user} = isloggeddata;    
    let { pathname, contractStateObj, sectorsIsLoading, countryStateObj, cityStateObj, districtStateObj, subdistrictStateObj,projectAdCategoryStateObj, projectStateObj, sectorStateObj, subsectorStateObj, cclassStateObj, labelStateObj, sectors_options, subsectors_options, cclasses_options, projects  } = props ?? {};    
    let link = projectbasedlink({project:projectStateObj?.[0], sector:sectorStateObj?.[0], subsector:subsectorStateObj?.[0], cclass:cclassStateObj?.[0], label:labelStateObj?.[0], country_slug:countryStateObj?.[0], city_slug:cityStateObj?.[0], district_slug:districtStateObj?.[0], subdistrict_slug:subsectorStateObj?.[0]});

    let selectedproject = projects?.find(a=>a?.datakey==projectStateObj?.[0]);
    let adscategories = selectedproject?.adscategories ?? [];      
    let adcategoriesoptions = (!!adscategories && adscategories?.length>0) ? adscategories?.map(s=>{return {value:s?.datakey, label:s?.title, }}) : [];
    
        // return JSON.stringify(country_slug)

    if (!user) { return <YankeeGoHome /> }
    return (
        <div className={s.shell}>
                
                  <Head>
                        <title>Konsol</title>
                        <meta name="description" content="Ana kumanda" />                        
                  </Head>                     

                <div className={s.left}><LayoutLeft  uploadObj={uploadObj} /></div>  
                
                {left && <div className={s.left_mobile}  onClick={()=>setleft(false)}>                
                            <LayoutLeft uploadObj={uploadObj}  />
                            {left && <div className={s.left_mobile_close_button} onClick={()=>setleft(false)}> <RiCloseLine size={30}/> </div>} 
                </div>} 
                

                <div className={`flexcolumn ${s.bodywr}`} style={{backgroundImage:`url("/images/common/bg.jpg")`}} >

                                                                        
                                                                        <div className={s.main}>                                
                                                                            {/* <div className={`flexcolumn`}>  */}
                                                                             <div className={s.titlewr} style={{ display:"flex", justifyContent:"space-between"}}>
                                                                                    <div>                                                                                    
                                                                                        <h1> {props?.layout_title} 
                                                                                                {props?.suptitle  && <div className={s.suptitle} style={{display:"flex", gap:10}}>
                                                                                                                                
                                                                                                                        <div>{props?.suptitle}</div>
                                                                                                
                                                                                                                        {country_slug && <div onClick={()=>router?.replace({pathname ,query:undefined})} style={{cursor:"pointer"}} title="Bölge sorgularını kaldır"><RiCloseCircleFill color="darkred" size="15"/></div>}  
                                                                                                </div>}   
                                                                                        </h1>
                                                                                    </div>    


                                                                                    <div style={{display:"flex", gap:8}}>   
                                                                                    
                                                                                    {countryStateObj ? <Region countryStateObj={countryStateObj} cityStateObj={cityStateObj} districtStateObj={districtStateObj} subdistrictStateObj={subdistrictStateObj}  /> : null}

                                                                                    {projectStateObj?.[0] && <div>
                                                                                                    <select value={projectStateObj?.[0]} onChange={(e)=>{
                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                projectStateObj[1](value);
                                                                                                                                                projectAdCategoryStateObj[1](undefined)
                                                                                                                                                sectorStateObj[1](undefined);
                                                                                                                                                subsectorStateObj[1](undefined);
                                                                                                                                                cclassStateObj[1](undefined);
                                                                                                                                                labelStateObj[1](undefined);
                                                                                                                                        }} style={selectstyle}>
                                                                                                            <option value={"sakaryarehberim.com"}>Sakaryarehberim.com</option>
                                                                                                            <option value={"yurtarama.com"}>Yurtarama.com</option>
                                                                                                            <option value={"supereleman.com"}>Süpereleman.com</option>
                                                                                                    </select>
                                                                                    </div>}

                                                                                    { projectStateObj?.[0] &&  adcategoriesoptions?.length>0 && <div>
                                                                                                    <select value={projectAdCategoryStateObj?.[0]} onChange={(e)=>{
                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                projectAdCategoryStateObj[1](value);
                                                                                                                                                // sectorStateObj[1](undefined);
                                                                                                                                                // subsectorStateObj[1](undefined);
                                                                                                                                                // cclassStateObj[1](undefined);
                                                                                                                                                // labelStateObj[1](undefined);
                                                                                                                                        }} style={{...selectstyle, backgroundColor:"#effbe3"}}>
                                                                                                            <option value={""}>Reklam kategorileri</option>
                                                                                                            {   adcategoriesoptions?.map(s=>{ return <option value={s?.value}>{ s?.label }</option> }) }
                                                                                                    </select>
                                                                                    </div> }


                                                                                     {(projectStateObj?.[0] && !labelStateObj?.[0] && !sectorsIsLoading) && <div className={s.item_inputwr}>  
                                                                                    
                                                                                    
                                                                                                
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

                                                                                     {sectorsIsLoading && <div className={s.item_inputwr}> Sektörler yükleniyor </div>}
                         
                                                
                                                                                        { subsectors_options?.length>0 && <div className={s.item_inputwr}>  
                                                                                                        
                                                                
                                                                                            <select className={s.select} onChange={(e)=>{
                                                                                                
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
                                                                                                        
                                                                
                                                                                                        <select className={s.select} onChange={(e)=>{
                                                                                                                        let value = e?.target?.value =="" ? undefined :  e?.target?.value;      
                                                                                                                        cclassStateObj[1](value);
                                                                                                                        labelStateObj[1](undefined);                                                                                                                
                                                                                                                }} 
                                                                                                        value={cclassStateObj?.[0]} 
                                                                                                        style={selectstyle}                                                  
                                                                                                        >
                                                                                                                <option value={""}>Sınıflandırma seçiniz [{subsectors_options?.length}]</option>
                                                                                                                {cclasses_options?.map(s=>{
                                                                                                                                                                                                            
                                                                                                                                                return <option value={s?.value}>{ s?.label }</option>
                                                                                                                                        
                                                                                                                                        })}
                                                                                                        </select>
                                                                            
                                                                                                    </div> }  


                                                                                       { !sectorStateObj?.[0] && labelStateObj && <div className={s.item_inputwr}>  
                                                                                                                                                                        
                                                                                                                <input onChange={(e)=>{
                                                                                                                                      
                                                                                                                                        let value = e?.target?.value =="" ? undefined :  e?.target?.value;        
                                                                                                                                        labelStateObj[1](value);                                                                                                                                        
                                                                                                                                        sectorStateObj[1](undefined);
                                                                                                                                        subsectorStateObj[1](undefined);
                                                                                                                                        cclassStateObj[1](undefined);
                                                                                                                                        
                                                                                                                                      }} style={selectstyle} value={labelStateObj?.[0]} placeholder="Etiket için slug girin"/> 

                                                                                                    </div> }       

                                                                                    {projectStateObj?.[0] && <div>
                                                                                                    <select value={contractStateObj?.[0]} onChange={(e)=>{
                                                                                                                                                let value = e?.target?.value =="" ? undefined :  Number(e?.target?.value);
                                                                                                                                                contractStateObj[1](value);
                                                                                                                                                
                                                                                                                                        }} style={{...selectstyle, width:200}}>
                                                                                                            <option value={""}>Sözleşme</option>
                                                                                                            <option value={1}>Sözleşme bağlantısı olanlar</option>
                                                                                                            <option value={0}>Sözleşme bağlantısı olmayanlar</option>
                                                                                                    </select>
                                                                                    </div>}




                                                                                                    {link ?<a href={link} target={"_blank"} title="Proje içindeki konum"><RiExternalLinkFill/></a> : undefined}
                                                                                                    

                                                                                </div>

                                                                                        
                                                                            </div>
                                                                                    { React.cloneElement(props?.children,  props ) }
                                                                            {/* </div> */}


                                                                        </div>

                                                                                <div className={s.footer}><Footer /></div>

                </div>
                    
                {!left && <div className={s.left_mobile_open_button} onClick={()=>setleft(true)}> <RiMenuLine size={30}/> </div>}                                                                 

        </div>
    )


}





let selectstyle={fontSize:11, padding:"4px 2px", width:140}


