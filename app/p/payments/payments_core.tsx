"use client"
import {_userState} from "@/modules/constants/user"
import Modal from 'react-modal';
import {  useQueryClient } from "@tanstack/react-query";
import s from "./payments_core.module.css";
import React, { useState } from "react";
import Head from 'next/head';
import { RiExternalLinkLine, RiFileUserFill, RiLock2Fill, RiLockUnlockFill, RiMenuAddLine } from 'react-icons/ri';
import { Textarea, Textfield } from '@/modules/common/reuseable';
import { useFormik } from 'formik';
import Link from 'next/link';
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import { usershook_next15 } from '@/modules/functions/usershook_next15';
import {  useRouter } from "next/navigation";
import { getpaymentshook_next15 } from "@/modules/functions/getpaymentshook_next15";
import { getpaymenthook_next15 } from "@/modules/functions/getpaymenthook_next15";

export default function PaymentsCore(props) {

      let {userdata} = props ?? {};

      let { data:payments, isLoading} = getpaymentshook_next15();

      const searchParams = useState({ order:0, count:500});
      // return JSON.stringify(payments)
      
      let amounts=payments?.map(a=>Number(a?.i_key_1)) ?? []
      let sum =  amounts?.reduce((a, b) => a + b, 0);
      //console.log("paymentsssss", sum);
      sum = sum ? `${sum} TL` : ""

      const modalstate    =  useState(false); // Country ekleme
      let closeModal = () => modalstate[1](false);
      // console.log("paymentspayments!: ",payments, error);
      let router=useRouter();

      return (<div>
                      <Head><title>Ödemeler</title></Head>
                      
                            <div className={s.wrapper}>
                              

                                      <div  className={s.sum}>  {sum} </div>

                                        {/* {JSON.stringify(payments)}   */}
                                                                
                                        {
                                              payments?.map(p=>{

                                                                      let data=p?.o_key_1;
                                                                      let {link1, link2, link3, module_type, orderid,ccname, ccmonth, ccyear, ccnumber,  finalamount, amount, installment, company, gsm, person, detail, commision,  defactouser, orderdate, user, domain  }  = data ?? {}

                                                                      let {diffDays,  timeAgo} = datetimeFunc({datetime:p?.createdat});


                                                                      return <div className={s.item} style={{backgroundColor:p?.locked? "#eef9ed": "#f5f4f4"}} title={p?.locked? "Kilitli kayıt": "Kontrol bekleyen kayıt"} key={p?.id}>
                                                                      {/* {JSON.stringify(p)} */}

                                                                                                          <div className={s.titlewr}> 
                                                                                                                  <div className={s.itemtitle}> {finalamount} TL </div>
                                                                                                                  
                                                                                                                  <div className={s.titlerightwr}>                                                                                                                  
                                                                                                                        <div className={s.________} title={!module_type? "Hata: `domain` kaydedilemiyor!!!": "" } > {domain ?? "d?"} </div>
                                                                                                                        <div className={s.________} title={!module_type? "Hata: `module_type` kaydedilemiyor!!!": "" } > {module_type ?? "m?"} </div>
                                                                                                                        <div className={s.buttonwr} onClick={()=>{ modalstate[1](p) }}> <RiMenuAddLine size={30} /> </div>
                                                                                                                  </div>
                                                                                                          </div>
                                                                                                          
                                                                                                          <div className={s.itemdetails} >

                                                                                                                      <div className={s.itemdetail}>  {ccnumber} </div>
                                                                                                                      {/* <div className={s.itemdetail}>  {company} </div> */}
                                                                                                                      <div className={s.gsm}>  {gsm} </div>
                                                                                                                      {/* <div className={s.itemdetail}>  {person} </div> */}
                                                                                                                      <div className={s.itemdetail}> {detail} </div>
                                                                                                                      <div className={s.itemdetail} style={{display:"flex", alignItems:"center", gap:4}}><RiFileUserFill size={24} onClick={()=> {_userState.myAccountUser.email=p?.user; router.push("/p/myaccount");}} style={{cursor:"pointer"}}/> {p?.user} </div>
                                                                                                                      {defactouser!=p?.user ? <div className={s.defacto}> Defacto:  {defactouser}  </div> : <div className={s.defacto}>_</div> }



                                                                                                                      <div className={s.timeandurls} title={orderdate}>
                                                                                                                        
                                                                                                                        <div> {timeAgo} </div>

                                                                                                                        {link1 && <div className={s.urlwr}>
                                                                                                                              <Link href={link1} target='_blank'><RiExternalLinkLine size="20" title="Url 1"/></Link>
                                                                                                                              {link2 && <Link href={link2} target='_blank'><RiExternalLinkLine size="20" title="Url 2"/></Link>}
                                                                                                                              {link3 && <Link href={link3} target='_blank'><RiExternalLinkLine size="20"  title="Url 3"/></Link>}
                                                                                                                        </div>}


                                                                                                                      </div>



                                                                                                          </div>

                                                                                                                                                                                                                    

                                                                            </div>
                                                          })
                                        }
                      
                                        { (payments?.length==0 && !isLoading) && <div>~</div> } 
                                        { (!!isLoading) && <div>Yükleniyor</div> }                                           

                                        <MyModal props={{ modalstate, userdata, searchParams }}/>
                            </div>                                                                            
                </div>            
            );
}






const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:450,
        zIndex:800
      },
    };
    
    const MyModal = ({props}) => {

      let { modalstate,userdata, searchParams } = props;    
      
      let { data:payment, isLoading} = getpaymenthook_next15({id:modalstate[0]?.id, enabled:true})

      // return JSON.stringify(payment)
      let submittingState = useState(false)
      
      let {userscopes } = userdata ?? {};
      let email = userdata?.email;  
      let isTechnician  = userscopes?.isTechnician;
      let manegerAuth  =  userscopes?.isManager;
      let patreonAuth  =  userscopes?.isPatreon;
      let technicianAuth  =  userdata?.userscopes.isManager;

      const queryClient = useQueryClient();

                
      let saveFunc = async (payment) => {submittingState[1](true); await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"paymentchange", payment } }) }); queryClient.invalidateQueries(); submittingState[1](false);  }          
      
          const formik = useFormik({
                                                enableReinitialize: true,
                                                initialValues:  payment ,
                                                onSubmit: values => {}, 
                                        });   
                    
              payment = formik?.values;
          let locked = payment?.locked;

          let link1=payment?.o_key_1?.link1;
          let link2=payment?.o_key_1?.link2;
          let link3=payment?.o_key_1?.link3;

          let savebuttonactive=!locked || patreonAuth;

          
          let { data:users, isLoading:usersLoading } =  usershook_next15({count:searchParams[0]?.count, order:searchParams[0]?.order, keyword:searchParams[0]?.keyword});
          
          let usersoptions = users?.map((c) => { return <option value={c?.email} key={`user-${c?.email}`}>{c?.email}</option>; }) ?? [];

          if (!!payment?.user && !users?.find(u=> u?.email==payment?.user)) // Ödeme  yapan bir kullanıcı var ama kullanıcılar arasında bu kullanıcı yoksa bu options'a ödeme yapan kullanıcıyı da ekleyelim. Çünkü, Kullanıcıların bir kısmı çekiliyor. Tammamı çekilmiyor. Örnek 300 tanesi. Bu 300 tane içinde ödeme yapan kullanıcı olmayabilir.
            {
                  usersoptions = [<option value={payment?.user}>{payment?.user}</option>, ...usersoptions]
            }

          
          

            let router=useRouter()
          
          
            
              
          return (
            <div> 
                                                        <Modal
                                                        isOpen={!!modalstate?.[0]?.id}                                                      
                                                        onRequestClose={()=>modalstate[1](undefined)}
                                                        style={customStyles}
                                                        contentLabel="Example Modal"
                                                        ariaHideApp={false}
                                                        >                                                      
                                                              {(!isLoading && payment?.id) ?<div className={s.modalshell}>
                                                                    {/* { JSON.stringify(users?.[0]) } */}
                                                                    <div className={s.modaltitle}>Ödeme Düzenleme!      </div> 

                                                                    

                                                                    <div className={s.modalinputs}>
                                                                        
                                                                        <Textarea formik={formik} name={`o_key_1.detail`} label={"Detay"} value={payment?.o_key_1?.detail} style={{backgroundColor:"#dedede", fontSize:14}} row={5}/> 
                                                                        <Textfield formik={formik} name={`o_key_1.link1`} label={"Link1"} value={link1} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        <Textfield formik={formik} name={`o_key_1.link2`} label={"Link2"} value={link2} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        <Textfield formik={formik} name={`o_key_1.link3`} label={"Link3"} value={link3} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        
                                                                        {link1 && <div className={s.urlwr}>
                                                                                          <Link href={link1} target='_blank'><RiExternalLinkLine size="30" title="Url 1"/></Link>
                                                                                          {link2 && <Link href={link2} target='_blank'><RiExternalLinkLine size="30" title="Url 2"/></Link>}
                                                                                          {link3 && <Link href={link3} target='_blank'><RiExternalLinkLine size="30"  title="Url 3"/></Link>}
                                                                        </div>}

                                                                        <Filter_Categories searchParams={searchParams}/>

                                                                        {/* {payment?.user} - {usersoptions[0]} */}

                                                                        <div className={s.userswr}>     
                                                                              <RiFileUserFill size={34} onClick={()=> {_userState.myAccountUser.email=payment?.user; router.push("/p/myaccount");}}/>
                                                                              {(usersLoading) ? <div>Yükleniyor</div>:  usersoptions?.length>0 ?
                                                                              
                                                                                    <select
                                                                                          id="user_email"
                                                                                          name="[user_email]"                                                                                
                                                                                          value={payment?.user}
                                                                                          disabled={!savebuttonactive}
                                                                                          onChange={(e)=>{formik.setFieldValue("user", e?.target.value)}}                                                                                
                                                                                    >             
                                                                                    <option>Seçiniz</option>                                                                   
                                                                                                {usersoptions}
                                                                                    </select>
                                                                                    :
                                                                                    undefined
                                                                                    
                                                                                    }  

                                                                               {(!usersLoading && usersoptions?.length==0)? <div>Kullanıcı bulunamadı</div> : undefined}     
                                                                        </div>      

                                                                        
                                                                        <button onClick={()=>patreonAuth && formik.setFieldValue(`locked`, !locked) }
                                                                                    disabled={!patreonAuth}
                                                                                    className={s.lockedbutton}
                                                                                    type="button"
                                                                                    title={!!locked? "Kilitli" : "Kilitli değil"}
                                                                                    style={{color:!!locked? "green" : "gray"}}
                                                                        >                                                                 
                                                                                             {locked ? <RiLock2Fill /> : <RiLockUnlockFill />}
                                                                        </button> 

                                                                    </div>
                                                                    
                                                                        {/* {JSON.stringify(payment?.o_key_1?.detail)} */}
                                                                        <div style={{display:"flex", gap:10, alignItems:"center"}}>
                                                                                    {savebuttonactive && <button onClick={()=>{ saveFunc(payment)   }} color="error" className={s.modalbutton}>Kaydet</button>}
                                                                                    <button onClick={()=>modalstate?.[1](undefined)} style={{marginLeft:8}}  className={s.modalbutton}>Kapat</button>
                                                                                    {submittingState[0] ? "Kaydediliyor" :undefined }
                                                                        </div>
                                                              </div>:<div className={s.emptymodal}>Yükleniyor</div>} 
                                                        </Modal>
            </div>
          )
    }

    const Filter_Categories = (props) => {

      const { searchParams } = props ?? {};
      
      return (
              <div style={{display:"flex", gap:10, flexDirection:"column", border:"1px solid gray", padding:8}}>
                  {/* {JSON.stringify(sectorStateObj?.[0])} */}
                                                            
               <div style={{display:"flex", gap:10}}>
    
                  <select value={searchParams[0]?.order}  onChange={ (e)=>{searchParams[1](old=>old = {...old, order:Number(e?.target?.value) }) }} key={`000-${"deep"}-${"siralama"}`} style={inputstyle}>
                            <option value={0}>    A'dan Z'ye     </option>
                            <option value={1}>    Z'den A'ya     </option>
                            <option value={2}>    Sondan başa     </option>
                            <option value={3}>    Baştan sona     </option>
                  </select>              
                  <input value={searchParams[0]?.count} onChange={(e)=>{searchParams[1](old=>old = {...old, count:Number(e?.target?.value) }) }} placeholder="Kaç adet kayıt?" type="number" style={inputstyle}/>
    
                  <input value={searchParams[0]?.keyword} onChange={(e)=>{searchParams[1](old=>old = {...old, keyword:e?.target?.value }) }} placeholder="Kelime" type="text" style={inputstyle}/>
    
                  </div>
              </div>
              )
    }
    
    


    let inputstyle={width:100, fontSize:12};