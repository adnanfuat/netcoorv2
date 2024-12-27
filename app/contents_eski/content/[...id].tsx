import { LayoutContents } from '@/layouts/console/layoutcontents';
import { useQuery } from "react-query";
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BackButton } from  "@/components/commonnew/backbutton";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useQueryClient } from "react-query";
import { useFormik } from 'formik';
import { Article_Active_V2_Admin } from  "@/components/commonnew/content/article_active_v2_admin";
import { Article_Name_V2_Admin } from  "@/components/commonnew/content/article_name_v2_admin";
import { Article_Contents_V2_Admin } from  "@/components/commonnew/content/article_contents_v2_admin";
import { Article_ChangeScope_V2_Admin } from  "@/components/commonnew/content/article_changescope_v2_admin";
import { Article_Cuffs_V2_Admin } from  "@/components/commonnew/content/article_cuffs_v2_admin";
import { Article_MetaData_V2_Admin } from  "@/components/commonnew/content/article_metadata_v2_admin";
import { Article_FirstImg_V2_Admin } from  "@/components/commonnew/content/article_firstimg_v2_admin";
import { EditButton_V3 } from  "@/components/commonnew/editbutton_v3";
import { SaveButton_V3 } from  "@/modules/common/savebutton_v3";
import { permissionsControl } from "@/components/hooksnew/permissionscontrol"
import { _userState } from "@/modules/constants/user"
import { useRouter } from 'next/router';
import s from "./core.module.css"
import { datetimeFunc } from "@/components/utilsnew/datetimefunc";
import { Address } from  "@/components/commonnew/content/address";
import { isLogged } from  "@/components/hooksnew/islogged";
import { useState } from 'react';
import perfectmutation from '@/modules/functions/perfectmutation';

const  Content = (props) =>{
      
  // let {id} = props ?? {};  
  const {name,permissions, user, session} = isLogged();  
  const queryClient = useQueryClient()
  const router = useRouter();    
  const {locale, defaultLocale, query:{id}}= router;
  
  const tabIndexObj = useState(0); 

  
              const fetcher_article = async () =>   
                                        {                                                                                               
                                                let articleObj =  await fetch(`/api/articlequery_backend?id=${id}`, {
                                                //   next:{revalidate:6000},
                                                  method: "POST",
                                                  headers: { "Content-Type": "application/json", },                
                                                })
                                                  .then((res) => res.json())
                                                  .then(async (result) => { return result });                                                                                                          
                                                     return articleObj;
                                        }
                                                                                
            let { data:articleclient , isLoading } = useQuery( ["articlequery_backend", id], () => fetcher_article() , {enabled:!!id, refetchOnWindowFocus:false})                                            


  
  
  const fetcher =async (values)=> {
      
                  
            delete values?.article?.getcomments
            delete values?.article?.getaroundarticles
            delete values?.article?.getrelatedsectors
            delete values?.article?.getrelatedsubsectors
            delete values?.article?.getrelatedcclasses
            delete values?.article?.getrelatedlabels
            delete values?.article?.getnextarticle
            delete values?.article?.getbeforearticle
            delete values?.article?.getrelatedlabels   
            
            let result = await perfectmutation({data:{ article:values.article, type:"articleupdate", project:article?.project }, session });
            queryClient.invalidateQueries();
            // console.log("tamam bu iş");
      };     


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { article:articleclient },
    onSubmit: values => { 

                        // console.log("revalidate start", values);
                        delete values?.article?.getcomments
                        delete values?.article?.getaroundarticles
                        delete values?.article?.getrelatedsectors
                        delete values?.article?.getrelatedsubsectors
                        delete values?.article?.getrelatedcclasses
                        delete values?.article?.getrelatedlabels
                        delete values?.article?.getnextarticle
                        delete values?.article?.getbeforearticle
                        delete values?.article?.getrelatedlabels                               
                        fetcher(values)//.then(()=>{ queryClient.invalidateQueries() }) ;                                    
            },
  });   

  let article=formik?.values?.article;
//   
//   const disableState_upload = useState(false);            
//   function handleUploadClick () { _userState.uploadPanel =!_userState?.uploadPanel }

  let upload_authority=permissionsControl({askList:["upload"], type:"some"}); // parça yetkilere göre hareket etmek için sorgulama___ // slug değişimi hassas konu___
  
  let dateObj = datetimeFunc({datetime:article?.createdat });
  
   
  let nextRecordArray=articleclient?.bigdata?.nextRecordArray;
  let beforeRecordArray=articleclient?.bigdata?.beforeRecordArray;


//   if (!article && !isLoading)  {return <div className={s.shell}>Yetkiniz olmayan bir içeriktesiniz.</div>}    

//     return JSON.stringify(article)

      let FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
      if (article?.project=="sakaryarehberim.com") 
      {
            FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
      }
      else if (article?.project=="yurtarama.com") 
      {
            FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_YA_DOMAIN;
      }

      return (
            <LayoutContents layout_title="Haber düzenleme">                
                  <div className={s.mainshell}>
                   {(!article && !isLoading) ?
                   <div className={s.shell}>Yetkiniz olmayan bir içeriktesiniz.</div>
                   :
                   
                   
                   isLoading ?  <div className={s.shell}>Yükleniyor. Lütfen bekleyin.</div> : <form onSubmit={() =>{  formik?.handleSubmit(); }}>
       
                                                       
                               <div className={s.shell}>

                                     {/* {JSON.stringify(articleclient?.img_tr)} */}
                                                       
                                     <Tabs  selectedIndex={tabIndexObj[0]} onSelect={(index) => tabIndexObj[1](index)}>
                                             <TabList>
                                               <Tab>Haber başlık</Tab>                                                  
                                               <Tab>İçerik</Tab>                                        
                                               <Tab>Haber temel bilgiler</Tab>                                                                                 
                                               <Tab onClick={()=>formik?.handleSubmit()}>Haber manşet</Tab>                                                                                                                            
                                             </TabList>
                                             
                                             <TabPanel className={s.maintab}>
       
                                             <div className={s.tabcontentwr} >
                                                <div className={s.name}> <Article_Name_V2_Admin props={{formik, locale, dateObj}}/> </div>                                                                                                                                                                                                                                   
                                                <div className={s.firstimg}> <Article_FirstImg_V2_Admin props={{formik, locale}}/> </div>
                                                <div className={s.aaaa}> <Address props={{formik, articleclient, locale}}/> </div>
                                             </div>
       
                                             </TabPanel>
       
                                             
       
                                             <TabPanel className={s.maintab}>    
                                             <div className={s.tabcontentwr}>
                                                <div className={s.contents}> <Article_Contents_V2_Admin props={{formik, locale}}/> </div>
                                                 </div>                                      
                                             </TabPanel>
       
                                             
                                             <TabPanel className={s.maintab}>    
                                             <div className={s.tabcontentwr}>
                                                
                                                <div className={s.metadata}> <Article_MetaData_V2_Admin props={{formik, locale}}/> </div>                                                             
                                                
                                                <div className={s.dsasd}> <Article_ChangeScope_V2_Admin props={{formik, locale}}/> </div>                                                                       
                                                
                                                <div className={s.asdasds}> <ChangeProject formik={formik}/></div>

                                                 </div>                                                                           
                                             </TabPanel>                                      
       
                                             <TabPanel className={s.maintab}>
                                             <div className={s.tabcontentwr}>
                                                <div className={s.cuffs}><Article_Cuffs_V2_Admin props={{formik, locale}}/> </div>
                                                 </div>                                      
                                             </TabPanel>                                                                            
                                           
                               </Tabs>
       
                               <div className={s.active}> <Article_Active_V2_Admin props={{formik, locale}}/> </div>
                                  
                               {tabIndexObj[0]!=3 && <div className={s.buttons}>     
                                     {(formik?.values?.article?.slug_tr) &&  <SaveButton_V3 props={{target:`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/cn/${article?.slug_tr}`, loginAndAuthorized:true, icon:"MdSave", formik}}/> }                              
                                     { (article?.slug_tr) &&  <EditButton_V3 props={{target:`${FRONTEND_DOMAIN}/cn/${article?.slug_tr}`, loginAndAuthorized:true, icon:"IoArrowDownCircleOutline", formik, showmode:"admin"}}/> }                              
                                    <BackButton/>                                                                                
                               </div>  }                       
       
                         </div>
       
       
                              
       
                               
       
       
       
                   </form>}
                   <div className={s.navbuttons}>

                        <button onClick={()=>{!!nextRecordArray?.[0]?.id  && router.push(`/contents/content/${nextRecordArray?.[0]?.id}`)}} 
                             disabled={!nextRecordArray?.[0]?.id} 
                            className={s.button}
                            type="button"
                            title={"Şimdiye doğru"}     
                            style={{color:!!nextRecordArray?.[0]?.id ? "black" : "darkgray"}}                                                   
                            >                                                                 
                                     <BsFillArrowLeftSquareFill/> 
                                     {/* {nextRecordArray?.[0]?.id} */}
                            </button>

                        <button onClick={()=>{!!beforeRecordArray?.[0]?.id  && router.push(`/contents/content/${beforeRecordArray?.[0]?.id}`)}} 
                             disabled={!beforeRecordArray?.[0]?.id} 
                            className={s.button}
                            type="button"
                            title={"Geçmişe doğru"}             
                            style={{color:!!beforeRecordArray?.[0]?.id ? "black" : "darkgray"}}                   
                            >                                                                 
                                     <BsFillArrowRightSquareFill/> 
                                     {/* {beforeRecordArray?.[0]?.id} */}
                            </button>
                            
                            
                            
                            {/* {JSON.stringify(nextRecordArray)} */}
                        
                   </div>
                  </div>                
            </LayoutContents>
      );
}




export default Content


const ChangeProject = (props) => {

      let {formik} = props;

      let article=formik?.values?.article;

            return (<select value={article?.project} onChange={(e) => { formik?.setFieldValue(`article.project`, e?.target?.value); }} style={{width:"100%", padding:"20px 10px", borderRadius:6}}>
                              <option key={`project-sakayarehberim.com`} value={"sakaryarehberim.com"}> SakaryaRehberim.com </option>
                              <option key={`project-yurtarama.com`} value={"yurtarama.com"}> Yurtarama.com  </option>
                    </select>)
      
}