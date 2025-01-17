import 'react-tabs/style/react-tabs.css';
import { DateTime } from "luxon";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { RiEditBoxFill } from "react-icons/ri";
import s from "./index.module.css"
import {_userState} from "@/modules/constants/user";
import { isLogged } from '@/components/hooksnew/islogged';
import { LayoutMain } from '@/layouts/console/layoutmain';
import Link from "next/link";
import Universities from '@/components/commonnew/myaccount/universities';
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import { imgs_source } from '@/modules/constants/imgs_source';
import { advsAuthorizedClientMode } from '@/components/hooksnew/advsauthorizedclientmode';
import { isLoggedV2 } from '@/modules/functions/isloggedv2';


export default function  Expert (props) {

let loggeduser = isLoggedV2();
let {userscopes} = loggeduser;
let { isPatreon, isManager, isTechnician} = userscopes ?? {};

if (!isTechnician) { return undefined; }

  return (<LayoutMain layout_title="Panel" suptitle={""}>
                      <div className={s.shell}>

                              <div className={s.items}>

                                              <Tabs>

                                              <TabList style={{userSelect:"none"}} className={s.maintabtitle}>                         

                                                                                        {isPatreon ? <Tab title="Genel">Genel</Tab>:undefined}
                                                                                        {isPatreon ? <Tab title="Üniversiteler">Üniversiteler</Tab>:undefined}
                                                                                        {isPatreon ? <Tab title="Üniversiteler">Eski Reklamlar</Tab>:undefined}
                                                                                        {/* <Tab title="Ödeme İşlemlerim" onClick={()=>router.push("/payments")}>Ödemeler</Tab>                                                                                                                                                
                                                                                        <Tab title="Kullanıcılar" onClick={()=>router.push("/users")}>Kullanıcılar</Tab>           */}
                                                                                                                                                                                                                                                                           
                                                              </TabList>
                                                              
                                                              {isPatreon ? <TabPanel> <div className={s.maintab}> <General/> </div> </TabPanel> : undefined}
                                                              {isPatreon ? <TabPanel> <div className={s.maintab}> <Universities/> </div> </TabPanel> : undefined }
                                                              {isPatreon ? <TabPanel> <div className={s.maintab}> <Advertisements/></div> </TabPanel> : undefined }
                                            </Tabs>
                                            
                              </div>


                      </div>
                  </LayoutMain>);

}


let General =(props)=> {

    let {aaa} = props ?? {};
    let loggeduser = isLoggedV2();
    let { userscopes } = loggeduser;
    let { isPatreon, isManager, isTechnician} = userscopes ?? {};

      return <div className={s.maintab______}>

                              <div className={s.items}>

                                            {isManager ? <div className={s.item} ><Link href={"/categoricalads"}>Kategorik reklamlar</Link></div>:undefined}
                                            {isManager ? <div className={s.item} ><Link href={"/myaccount?tab=payment&subtab=packages"}>Satın alınan paketler</Link></div>:undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/categories"}>Kategoriler</Link></div>:undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/contractcategories"}>Sözleşme kategorileri</Link></div> : undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/regions"}>Bölgeler</Link></div>: undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/sitemaps"}>Site Haritaları</Link></div> : undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/settings"}>Ayarlar</Link></div>: undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/tasksystems"}>Görev Sistemleri </Link></div>: undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/taskcategories"}>Görev Kategorileri</Link></div> : undefined }
                                            {isPatreon ? <div className={s.item} ><Link href={"/pgas"}>Periyodik Görev Atama Kuralları</Link></div> : undefined}
                                            {isPatreon ? <div className={s.item} ><Link href={"/packages"}>Paketler</Link></div> : undefined }
                                                                                        
                              </div>

             </div>
                        }





const Advertisements = (props) => {

let {aaa} = props;
let isloggeddata  =  isLogged();    

const {loginAndAuthorized, advsclient, error, mutate, fileObjectsClient, isLoading, isFetching } = advsAuthorizedClientMode({ whichPermissions:["cuff_add"], pagetype:"subsector", parent_slug:undefined});
let now=new Date()

return (
<div className={s.acshell}>
  Eski reklam sistemi. Bir süre sonra kaldırılmalı
         {/* {JSON.stringify(now)} {} */}

          {advsclient?.map(advitem=> {

                                            let active= advitem?.active;
                                            let parent_slug= advitem?.parent_slug;
                                            let type= advitem?.type;

                                            let date1= advitem?.date1;
                                                 date1 = date1? datetimeFunc({datetime:advitem?.date1})?.localeString : undefined;
                                                
                                                
                                                let date2= DateTime.fromISO(advitem?.date2);
                                                  date2 = date2?.toISO();
                                                  date2 = date2? datetimeFunc({datetime:advitem?.date2})?.localeString : undefined;
                                                  // let overtime = advitem?.date2 ? datetimeDiffFunc({date2:advitem?.date2, date1:undefined })?.diffDays  :  undefined;
                                                  // let overtime = date2 ? datetimeDiffFunc({date2:"2024-05-25T18:11:03.774+03:00", date1:undefined }) : undefined;
                                                  // let {myDate1, myDate2} = datetimeDiffFunc({date2:advitem?.date2, date1:undefined });

                                             let img_value  =   advitem?.bigdata?.history[0]?.lang?.tr?.img?.xs?.files;      
                                             let fileObjects=advitem?.getconnectedfiles ?? []
                                             let imgObj= fileObjects?.find(a=>a?.slug_tr==img_value?.[0]);
                                             let new_img = `${imgs_source}/${imgObj?.bigdata?.folder}/${imgObj?.bigdata?.filename}`;  
                                      
                                             let link  =   advitem?.bigdata?.history[0]?.lang?.tr?.img?.xs?.link;      
                                             let title  =  advitem?.bigdata?.history[0]?.lang?.tr?.img?.xs?.title;  
                                             
                                             let pagetype=undefined;

                                             switch (type) {
                                              case "ads_subsector": pagetype="subsector"; 
                                                break;
                                              case "sector": pagetype="sector"; 
                                                break;  
                                              case "cclass":  pagetype="cclass"; 
                                                break;
                                              case "label":  pagetype="label"; 
                                                break;                
                                            }

                                            let editlink = `/promo/edit?pagetype=${pagetype}&parent_slug=${parent_slug}` //

                                            

                                              return <div className={s.acrow} style={{backgroundColor:active ? "white" : "lightpink"}}> 
                                              
                                              {/* {JSON.stringify(editlink)} */}
                                              
                                              {/* {date2}<br/>
                                              {JSON.stringify(overtime)} */}
                                                  
                                                                    {/* { JSON.stringify(myDate2) }  -  { JSON.stringify(myDate1) } - {advitem?.date2} - {advitem?.date1}  */}

                                                                      <div>{active ? "Aktif" : "Pasif"}</div>
                                                                      <div>                                                                              
                                                                          <div style={{backgroundImage:`url(${new_img})`, width:80, height:80, backgroundSize:"contain" , backgroundPosition: 'center', backgroundRepeat:"no-repeat", aspectRatio: 4/3  }}></div>                                                                              
                                                                      </div>
                                                                      <div>{title}</div>
                                                                      
                                                                      <div> {date1} { date2 ? "|" : ""}  {date2}</div>
                                                                      {/* 
                                                                        <div>
                                                                         {datetimeDiffFunc({date2:advitem?.date2, date1:advitem?.date1})?.diffDays}
                                                                        </div>
                                                                      */}

                                                                      <div><Link href={editlink}><RiEditBoxFill size={30}/></Link></div> 

                                                      </div>
          })}


</div>
)}

