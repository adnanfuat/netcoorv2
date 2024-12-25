import { useSearchParams } from 'next/navigation';
import s from "./index.module.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import JobAdvert_Core from '@/modules/jobadverts_core_next15/jobadvert_core_next15';


export default function  JobAdvert (props) { 

  let {aaa} = props ?? {};
  
  const tabIndexObj = useState(0);

  const searchParams = useSearchParams();  
  const datakey = searchParams.get('datakey');
      
  const router = useRouter();
  const {locale, defaultLocale, query:{ slug }}=  router;

  /// gggggg------------->  (Settings denetimi) (s)
  

 useEffect(() => {
  router.beforePopState(({ url, as, options }) => {    
    tabIndexObj[1](0)    
    return false    
  })
}, [router])
                                                                    

// advert && editAuth


  
          // return  JSON.stringify(advert?.phones)
          useEffect(() => { tabIndexObj[1](0); }, [datakey]);
                  

          return (<div>                                            
                                    {(1==1) ? <div>
                                                                                                                                                            
                                              <div className={s.main_container}>
                                               
                                                              
                                              <Tabs selectedIndex={tabIndexObj[0]} onSelect={(index) => tabIndexObj[1](index)}>
                                                  <TabList>
                                                      <Tab style={{fontWeight:"bold", userSelect:"none"}}>İlan</Tab>                                                             
                                                      {/* <Tab style={{fontSize:"0.8rem", color:"#3d3b3b", userSelect:"none"}}>Hesabım  [{advert?.user}] </Tab> */}
                                                      {/* {(whois=="mycompany" && advertiser_company_OBJ?.title_tr) && <Tab  style={{fontSize:"0.8rem", color:"#3d3b3b", userSelect:"none"}}>Firma [{advertiser_company_OBJ?.title_tr}]</Tab>} */}
                                                   </TabList>
                                                  
                                                  <TabPanel>   
                                                        <JobAdvert_Core/>
                                                  </TabPanel>


                                                  {/* <TabPanel >   
                                                      <div className={s.shelltab}>                                                        
                                                        <div className={s.infobar}>
                                                          <div>Aşağıdaki bölümden hesabınızla ilgili; telefon, adres gibi temel düzenlemeleri yapabilirsiniz...  </div>
                                                          <div style={{color:"#ffc800"}}> Daha sonra yan sekmeye geçip ilan eklemeye devam edebilirsiniz.</div>
                                                        </div>
                                                        <div className={s.XXX}> 
                                                          <MyAccount_Shell selecteduser={advert?.user} user={user} origin="myjobadvert" originTabStates={tabIndexObj}/>
                                                        </div>
                                                      </div>  
                                                  </TabPanel > */}
                                                  
                                                  {/* {advertiser_company_OBJ?.title_tr && whois=="mycompany"  && <TabPanel >                                                                                                                                                                                                                                                                                                                                                                                                   
                                                        <div className={s.shelltab}>                                                        
                                                          <div className={s.infobar}>
                                                            <div>Aşağıdaki bölümden firmanızla ilgili; telefon, adres gibi temel düzenlemeleri yapabilirsiniz.  </div>
                                                            <div style={{color:"#ffc800"}}> Daha sonra yan sekmeye geçip ilan eklemeye devam edebilirsiniz.</div>
                                                          </div>
                                                          <div className={s.XXX}>                                                            
                                                            <CompanyShell id={advertiser_company_id} origin="myjobadvert" originTabStates={tabIndexObj}/>
                                                          </div>
                                                      </div>
                                                  </TabPanel >} */}
                                                  
                                    </Tabs>
                                                                                                                                                                      
                                    
                                              </div> 
                                   </div>:           
                                   <div>Yükleniyor</div>}
                </div>
          ) }







