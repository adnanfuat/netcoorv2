"use client"
import 'react-tabs/style/react-tabs.css';
import { RiExternalLinkFill, RiRepeat2Fill,RiEyeFill, RiEmotionUnhappyLine, RiRestartFill, RiStopCircleFill, RiDeleteBin2Fill  } from "react-icons/ri";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import s from "./index.module.css";
import { useEffect, useState } from 'react';
import { RiChatDeleteFill } from "react-icons/ri";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { projectshook_next15 } from '@/modules/functions/projectshook_next15';
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import projectbasedurl from '@/modules/functions/projectbasedurl';


export default function  Sitemaps (props) {

  let {userdata} = props ?? {}
  
  let patreonAuth  =  userdata?.userscopes.isPatreon;
  const queryClient = useQueryClient();

    
  
    // Build bildirimlerini tekil silme (s)------------------->
    let removeSitemapNotify = async (id) => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"removesitemapnotify", id } }) });  queryClient.invalidateQueries(); } 
            
    // Build bildirimlerini çoğul silme (s)------------------->
    const projectStateObj    =  useState("sakaryarehberim.com");      
    let removeSitemapNotifies = async () => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"removesitemapnotifies", project:projectStateObj[0]} }) });  queryClient.invalidateQueries(); }
    
    let { data:projects, isLoading:projectsIsLoading } = projectshook_next15();
    let project = projects?.find(a=>a?.datakey==projectStateObj?.[0]);
    let domain = project?.domain?.replace(".", "");

    let article_readyurllist = [
          {mustberenewed:true, label:"1) Önemli veriler içeren sitemap oluştur. (max:300)", slug:`project=${project?.domain}&category=${"article"}&segment=importants&skip=0&take=300&filename=${domain}_important_articles.xml`},
          {mustberenewed:true, label:"0-200 arası son verileri içeren sitemap oluştur. ", slug:`project=${project?.domain}&category=${"article"}&segment=latests&skip=0&take=200&filename=${domain}_latest_articles.xml`},
          {mustberenewed:false, label:"0-20.000 arası eskiden yeniye doğru sitemap oluştur.", slug:`project=${project?.domain}&category=${"article"}&segment=full&skip=0&take=20000&filename=${domain}_full_articles_1.xml`},
          {mustberenewed:false, label:"20.000-40.000 arası eskiden yeniye doğru sitemap oluştur.", slug:`project=${project?.domain}&category=${"article"}&segment=full&skip=20000&take=20000&filename=${domain}_full_articles_2.xml`},
          {mustberenewed:false, label:"40.000-60.000 arası eskiden yeniye doğru sitemap oluştur.", slug:`project=${project?.domain}&category=${"article"}&segment=full&skip=40000&take=20000&filename=${domain}_full_articles_3.xml` },
          {mustberenewed:false, label:"60.000-80.000 arası eskiden yeniye doğru sitemap oluştur.", slug:`project=${project?.domain}&category=${"article"}&segment=full&skip=60000&take=20000&filename=${domain}_full_articles_4.xml` },        
    ]

    let subsector_readyurllist = [
                                    {mustberenewed:false, label:"Alt sektörler için sitemap oluştur. (max:5000)", slug:`project=${project?.domain}&category=${"subsector"}&segment=importants&skip=0&take=5000&filename=${domain}_subsectors.xml`}
                                 ]

    let sector_readyurllist = [
                                  {mustberenewed:false, label:"Sektörler için sitemap oluştur. (max:5000)", slug:`project=${project?.domain}&category=${"sector"}&segment=importants&skip=0&take=5000&filename=${domain}_sectors.xml`}
                              ]     
                              
    let cclass_readyurllist = [
                                 {mustberenewed:false, label:"Tüm sınıflandırmalar için sitemap oluştur.", slug:`project=${project?.domain}&category=${"cclass"}&segment=importants&skip=0&take=8000&filename=${domain}_cclasses.xml`}
                            ]            
                            
    let label_readyurllist = [
                              {mustberenewed:true, label:"Kritik etiketler için sitemap oluştur.",      slug:`project=${project?.domain}&category=${"label"}&segment=importants&skip=0&take=500&filename=${domain}_important_labels.xml`},
                              {mustberenewed:false, label:"0-20.000 arası için sitemap oluştur.",        slug:`project=${project?.domain}&category=${"label"}&segment=full&skip=0&take=20000&filename=${domain}_full_labels_1.xml`},
                              {mustberenewed:false, label:"20.000-40.000 arası için sitemap oluştur.",   slug:`project=${project?.domain}&category=${"label"}&segment=full&skip=20000&take=20000&filename=${domain}_full_labels_2.xml`},
                              {mustberenewed:false, label:"40.000-60.000 arası için sitemap oluştur.",   slug:`project=${project?.domain}&category=${"label"}&segment=full&skip=40000&take=20000&filename=${domain}_full_labels_3.xml`},
                              {mustberenewed:false, label:"60.000-80.000 arası için sitemap oluştur.",   slug:`project=${project?.domain}&category=${"label"}&segment=full&skip=60000&take=20000&filename=${domain}_full_labels_4.xml`},
                              {mustberenewed:false, label:"80.000-100.000 arası için sitemap oluştur.",  slug:`project=${project?.domain}&category=${"label"}&segment=full&skip=80000&take=20000&filename=${domain}_full_labels_5.xml`},
                              {mustberenewed:false, label:"100.000-120.000 arası için sitemap oluştur.", slug:`project=${project?.domain}&category=${"label"}&segment=full&skip=100000&take=20000&filename=${domain}_full_labels_6.xml`}
                            ] 


    let company_readyurllist = [                              
                              {mustberenewed:true, label:"Özel firmalar için sitemap oluştur.",  slug:`project=${project?.domain}&category=${"company"}&segment=importants&skip=0&take=5000&filename=${domain}_companies.xml`},
                              {mustberenewed:true, label:"Tüm firmalar için sitemap oluştur.", slug:`project=${project?.domain}&category=${"company"}&segment=full&skip=0&take=20000&filename=${domain}_full_companies.xml`}
                            ]    
                            

    if (project?.domain=="yurtarama.com") // Eğer yurtarama'da isek çok fazla kayıt yok. O nedenle bazı verileri yok edelim.
    {
      article_readyurllist=article_readyurllist?.slice(0,3);
      label_readyurllist=label_readyurllist?.slice(0,2)
    }

    if (!patreonAuth)
    {
      return <div>~</div>
    }
    
  return (<div>
                  {/* {JSON.stringify(project)} */}

                  {patreonAuth ? <div className={s.shell}> 
                  
                          <div className={s.delete} title="Tüm build bildirimlerini sil" onClick={()=>{removeSitemapNotifies()}}><RiChatDeleteFill/></div>

                          <div className={s.projects} title="Projeler" onClick={()=>{}}>
                            
                                            {projectStateObj?.[0] && <div>
                                                                                                                      <select value={projectStateObj?.[0]} onChange={(e)=>{                                                                                                                        
                                                                                                                                                                                  let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                                                  projectStateObj[1](value);
                                                                                                                                                                          }}
                                                                                                                                                                          style={selectstyle}
                                                                                                                                                                          >

                                                                                                                                    <option value={"sakaryarehberim.com"}>Sakaryarehberim.com</option>
                                                                                                                                    <option value={"yurtarama.com"}>Yurtarama.com</option>
                                                                                                                                    <option value={"supereleman.com"}>Süpereleman.com</option>
                                                                                                                      </select>
                                                                                                      </div>}
                                  
                          </div>

                        
                            {projectStateObj?.[0] ?<Tabs>
                                            <TabList>
                                              <Tab>Haberler</Tab>
                                              <Tab>Alt sektörler</Tab>
                                              <Tab>Sektörler</Tab>
                                              <Tab>Sınıflandırmalar</Tab>
                                              <Tab>Etiketler</Tab>
                                              <Tab>Firmalar</Tab>
                                              <Tab>Yardım</Tab>
                                            </TabList>

                                            <TabPanel className={s.maintab_1}>
                                                  <SitemapModule props={{removeSitemapNotify,   project, category:"article", readyurllist:article_readyurllist}}/>
                                            </TabPanel>

                                            <TabPanel className={s.maintab_1}>
                                                  <SitemapModule props={{removeSitemapNotify,   project, category:"subsector", readyurllist:subsector_readyurllist}}/>
                                            </TabPanel>

                                            <TabPanel className={s.maintab_1}>
                                                  <SitemapModule props={{removeSitemapNotify,   project, category:"sector", readyurllist:sector_readyurllist}}/>
                                            </TabPanel>

                                            <TabPanel className={s.maintab_1}>
                                                  <SitemapModule props={{removeSitemapNotify,   project, category:"cclass", readyurllist:cclass_readyurllist}}/>
                                            </TabPanel>

                                            <TabPanel className={s.maintab_1}>
                                                  <SitemapModule props={{removeSitemapNotify,   project, category:"label", readyurllist:label_readyurllist}}/>
                                            </TabPanel>

                                            <TabPanel className={s.maintab_1}>
                                                  <SitemapModule props={{removeSitemapNotify,   project, category:"company", readyurllist:company_readyurllist}}/>
                                            </TabPanel>                                            
                                                                                                                        
                                            <TabPanel>
                                                  <Help_Main/>
                                            </TabPanel>
                              </Tabs> : <div>~</div>}
                  
                    <div className={s.caution}>Site haritalarının tarihlerinin belirli aralıklarla güncellenmesi açısından, özellikle yanında EasyCron yazanları arada sırada çalıştırmakta yarar var.</div>
                    <div className={s.caution}>EasyCron sitesine gidip, cronjoblar durmuş mu kontrol ediniz.</div>
                  
                  </div> : undefined}
            </div>
  );

}







function  SitemapModule ({props}) {
  
  let {removeSitemapNotify,    project, category, readyurllist} = props ?? {};

  let url = projectbasedurl({project:"netcoor.com"})
  
  let sitemapLink=`${url}/api/sitemaps/create`;  

  const fetcher_count = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:`${category}_count` ,project:project?.domain } }) } ); res =  await res?.json(); return res; };
  let { data:article_count_db } = useQuery( {queryKey:["Article_Count",category, project?.domain ], queryFn:async () => await fetcher_count()});
      
  // *************************** (sitemap fecth) */
      const fetcher_sitemaps = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"sitemaps", parent:category, project:project?.domain } }) } ); res =  await res?.json(); return res; };
      let { data:sitemaps, isLoading } = useQuery( {queryKey:["sitemaps_", category, project?.domain ], queryFn:async () => await fetcher_sitemaps()});            
  // **************************** (sitemap fecth) */

        
  return (
    <div className={s.itemswr}>

        {/* {JSON.stringify(sitemaps)}         */}

        <h3><span style={{color:"green"}}>{project?.domain}</span> sitemap listesi / {article_count_db ?? "~"} içerik</h3>  

            <Tabs className={s.maintab_2_wr}>

              <TabList>
                <Tab>Komutlar</Tab>
                <Tab>Bildirimler</Tab>
                <Tab>Özel işlem</Tab>                            
              </TabList>

              <TabPanel className={s.maintab_2}>
                        <div className={s.tabcontents}>                          
                                                        
                              <h4>Sitemap komutları</h4>
                              
                              <ul className={s.ulstyle}>

                                {readyurllist?.map(item=>{
                                  
                                  return <li>
                                            
                                            { givesitemapLink({source:sitemaps, slug:item?.slug}) } 
                                            
                                            {item?.mustberenewed?
                                            <EasyCron/> 
                                            : <RiStopCircleFill size={20} title="Tek seferlik oluşturulan sitemap"/>
                                            }
                                            <a href={`${sitemapLink}?${item?.slug}`} target={"_blank"}  style={styler({source:sitemaps, slug:item?.slug, isLoading})} >{item?.label}</a> 
                                            
                                            

                                        </li> 
                                })}                                
                              </ul>                
                    </div>
              </TabPanel>                              
              <TabPanel  className={s.maintab_2}>
                  <Notifications props={{ project, sitemaps, category, removeSitemapNotify}}/>
              </TabPanel>
              <TabPanel className={s.maintab_2}>
                  <CustomCreate props={{project, sitemapLink, category}}/>
              </TabPanel>
            </Tabs>                                      
    </div>
  );

}






const CustomCreate = ({props}) => {

  let {sitemapLink, category, project} = props;
  

  const [filename, setfilename] = useState(`${project?.domain?.replace(".", "")}_${category}_sitemap.xml`);
  const [take, settake] = useState(100);
  const [skip, setskip] = useState(0);

  const [segment, setsegment] = useState("latests");

  // let url_latests_200_0_build       =      `segment=latests&take=200&skip=0`;
  //let url_sitemaps    =      `segment=${segment}&take=${take}&skip=${skip}&filename=${filename}`;

  useEffect(() => {
    project?.domain && setfilename(`${project?.domain}_${category}_sitemap.xml`)
    
  }, [project?.domain])
  

  return (
    <div className={s.tabcontents}>
      
       {/* {JSON.stringify(project?.domain)} */}
          
            <h4>Özelleştirilmiş sitemap oluşturma</h4>
            <div className={s.info}>
              <div className={s.info_buttons}>
                          
                          <div className={s.inputwr}>
                                        Tip:
                                        <select name="type"  value={segment} onChange={(e)=>setsegment(e?.target.value)} className={s.select}>
                                              <option value="latests">Son dahil olanlar</option>
                                              <option value="importants">Sadece önemliler</option>
                                              <option value="full">Tüm listeyi hedef alarak</option>                                        
                                        </select>
                          </div>

                <div className={s.inputwr}>
                  Sitemap Filename: <input onBlur={(e) => { stringControl(e, setfilename); }} name={"filename"} value={filename} placeholder={`${project?.domain}_sitemap.xml`} onChange={(e) => { setfilename(e?.target.value); }} className={s.textinput} style={{width:290}} />
                </div>
                {/* Build listesine atanmış alt sektör sayısından daha fazla üretim pek tabi yapılamaz */}
                <div className={s.inputwr}>
                  Adet: <input type={"number"} name={"count"} value={take} onChange={(e) => { e?.target.value <= 10000 && settake(Number(e?.target.value)); }} className={s.numberinput} />
                </div>

                <div className={s.inputwr}> Ötele: <input type={"number"} name={"skip"} value={skip} onChange={(e) => { e?.target.value <= 10000 && setskip(Number(e?.target.value)); }} className={s.numberinput} /> </div>            
                  

                      {/* Buttons..........(s) */}

                      <div className={s.inputwr}>

                      <div className={s.run} style={{ backgroundColor: "green" }} title={"Sitemap oluştur"} >
                            <a href={ sitemapLink + "?project="+project?.domain + "&category="+ category + "&segment=" + segment + "&skip=" + skip  + "&take=" + take + "&filename=" + filename } target={"_blank"}>
                                  Sitemap oluştur {`(${skip ?? 0} öteleyerek ,${take ?? 0} adet)`}
                            </a>
                            {/* inputa girilen adet sitemap kaydı oluşturalım */}
                          </div>

                          </div>

              </div>
             
            </div>
          </div>


  )
}






const Notifications = ({props}) => {

  let { sitemaps, category, segment, removeSitemapNotify, project} = props;
  

  return (
    <div className={s.tabcontents}>
            
          <h4>Oluşturulan Sitemapler</h4>

          <div className={s.items}>
            {sitemaps?.map((item, i) => {
              let dateObj_sitemaps = datetimeFunc({
                datetime: item?.createdat,
              });

              // console.log("itemmmm: ", item)
              return (
                <div className={s.buildrow}>
                  <div title="En son oluşturulma tarihi">
                      [ {dateObj_sitemaps?.timeAgo} ]
                  </div>

                  {/* { JSON.stringify(item) } */}
                  <br/>

                  {/* {`https://www.${project?.domain}/api/sitemaps/create?${item?.slug}`} */}
                  <div>
                          <a target={"_blank"} href={`https://www.${project?.domain}/api/sitemaps/create?${item?.slug}`} style={{display:"flex", alignItems:"center", gap:10,}} title={item?.s_key_1}><RiRepeat2Fill/> Tekrar Üret 
                                <sup style={{color:"gray"}}> {item?.s_key_1} </sup>
                          </a>
                  </div>
                    {/* <div><a href={`${item?.s_key_1}`} target={"_blank"}>{item?.slug} </a></div>                   */}
                    <div>[{item?.i_key_2} - {item?.i_key_3}] </div>
                    <div title='Sitemap içindeki kayıt adedi'>{item?.i_key_1}</div>

                    

                    <div style={{display:"flex", alignItems:"center", gap:38}}>
                      <a target={"_blank"} onClick={()=>removeSitemapNotify(item?.id)}  title='Sil' style={{cursor:"pointer"}}>
                          <RiDeleteBin2Fill  size={20}  color='darkred'/>
                      </a>

                      <a target={"_blank"} href={`https://www.${project?.domain}${item?.s_key_1}`} title='Gör' >
                          <RiEyeFill size={20}  color='darkgreen'/>
                      </a>

                    </div>

                </div>
              );
            })}

                {sitemaps?.length==0 && <div>Kayıt yok</div>}
          </div>

    </div>
  )
}




const stringControl = (e, setfilename) => {

  let gelen=e.target.value

  if (gelen?.length<5) {
    alert("Dosya ismi 5 karakterden az olamaz ve `.xml` ile bitmelidir")
  }
  else {
    let kelime=  gelen.slice(-4); // son 4harf..    
    if (kelime!==".xml") {
      //alert("Hopppp");
      setfilename(`${e.target.value}.xml`)
    }
  }

}




const EasyCron = () => {
  return (
    <a href="https://www.easycron.com" target={"_blank"} title="Düzenli olarak yenilenmesi gereken sitemap - Otomatik oluşturuluyor mu, kontrol edin!"><img src="/images/common/easy.png" width={16} height={16} style={{marginTop:6}}/></a>
  )
}


  


function matchFunctions ({source, slug}) {  

  let matched = source?.find(item=>item?.slug==slug);

   console.log("tamam....",source, slug);
  return matched
}



function givesitemapLink ({source, slug}) {  

  let matched = source?.find(item=>item?.slug==slug);

  
  let url = projectbasedurl({project:matched?.project})
  // console.log("sasdsad....11::",url, matched?.s_key_1);
  // Eskisi böyleydi. Artık bu işlemi netcoor'a aldım.
  let result = matched?.s_key_1 ?  <a href={`${url}${matched?.s_key_1}`} title='Oluşan sitemap dosyasını gör'><RiExternalLinkFill size={20}/></a> :<RiEmotionUnhappyLine size={20} title='Sitemap dosyası oluşmamış olarak gözüküyor. - Bir ihtimal space içinde vardır. Varsa da, tekrar oluşturduğunuzda var olan dosyanın üzerine yazar.'/>  
  return result ;
  
}






const Help_Main = () => {
  return (
    <div className={s.noteswr}>

<div className={s.note}>
      Sitemap dış servisler (EasyCron) aracılığıyla devamlı tetiklenir.
      Böylece güncel veriler için Google düzenli olarak çağrılır. Easycron etiketi olan sitemaplerin, tetiklenmeye devam edip etmediğini kontrol etmelisin.
    </div>

    <div className={s.note}>
      "Full" sitemapler eskiden yeni göre dizilir. "Latest" olanlar ise yeniden eskiye göre dizilir. "Importants" ise ranka göre dizilir..
    </div>



    <div className={s.note}>
      Her 10.000 adet kayıt yaklaşık 2mb veri alanı kaplıyor. Biz 5mb'ı
      geçmemeyi tercih ediyoruz. Çünkü daha hızlı tarama istiyoruz.
    </div>

    <div className={s.note}>
      Özelleştirilmiş bir sitemap oluşturuldu diyelim. Bu sitemap buluta yüklenir. Fakat google sitemapleri "domain.com/" altında arar. 
      Biz ise küçük bir "trick" ile buluttaki bu dosyaları domain altındaymış gibi gösteriyoruz.
      İşte böyle bir durumda, eklenen custom.xml'in middleware'e manuel olarak enjekte edilmesi gerekir.
      İşte bu nedenle yeni bir proje yaptığınızda, ilgili url'lerin middleware'e eklenmesi gerekmektedir. Ki middleware, sitemap'i arayan google botlarını, bizim buluttaki adrese yönlendirsin.
      Neden sitemapsleri bulutta tutuyoruz? Çünkü daha önceden APP kullanıyorduk ve APP'e dosya yazsak da, droplet yeniden oluşturulduğunda bu dosyalar yok oluyordu. O nedenle, dosyaları dışarıda kalıcı olarak tutabileceğimiz bir noktaya atmamız gerekiyordu.
    </div>

    <div className={s.note}>
      Sitemap'leri "create" eden api, sadece sr'nin altında. Boşuna diğer projelere kopyalamak istemedim. Sonuçta aynı işi yapacak.
    </div>

  </div>
  )
}




let selectstyle={fontSize:11, padding:"4px 2px", width:140}

let styler = ({source, slug, isLoading }) => {

  console.log("source, slug", source, slug);

  return (matchFunctions({source, slug}) || isLoading) ? {color:"darkgreen"} : {color:"red"}

}






