"use client"
import {_userState} from "@/modules/constants/user"
import Modal from 'react-modal';
import s from "./payments_core.module.css";
import React, { useState } from "react";
import Head from 'next/head';
import { useQuery } from "@tanstack/react-query";
import { RiExternalLinkLine, RiFileUserFill, RiLock2Fill, RiLockUnlockFill, RiMenuAddLine } from 'react-icons/ri';
import { Textarea, Textfield } from '@/modules/common/reuseable';
import { useFormik } from 'formik';
import Link from 'next/link';
import { datetimeDiffFunc } from '@/modules/functions/datetimedifffunc';
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import { giveuserv2hook_next15 } from '@/modules/functions/giveuserv2hook_next15';
import { usershook_next15 } from '@/modules/functions/usershook_next15';
import {  useRouter } from "next/navigation";

export default function PaymentsCore(props) {

      let {userdata} = props ?? {};
            
      let getPayments = async () => {
        let res =  await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"payments", } }) } );       
        res = await res.json();     
        return  res
      }

      let { data:payments, isLoading, error} = useQuery({queryKey:["payments"], queryFn:() => getPayments()});
      
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
                                                                      let {module_type, orderid,ccname, ccmonth, ccyear, ccnumber,  finalamount, amount, installment, company, gsm, person, detail, commision,  defactouser, orderdate, user, domain  }  = data ?? {}

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
                                                                                                                      <div className={s.itemdetail} style={{display:"flex", alignItems:"center"}}><RiFileUserFill size={24} onClick={()=> {_userState.myAccountUser.email=p?.user; router.push("/p/myaccount");}} style={{cursor:"pointer"}}/> {p?.user} </div>
                                                                                                                      {defactouser!=p?.user ? <div className={s.defacto}> Defacto:  {defactouser}  </div> : <div className={s.defacto}>_</div> }
                                                                                                                      <div className={s.itemdetail} title={orderdate}> {timeAgo}</div>

                                                                                                          </div>

                                                                                                                                                                                                                    

                                                                            </div>
                                                          })
                                        }
                      
                                        { (payments?.length==0 && !isLoading) && <div>~</div> } 
                                        { (!!isLoading) && <div>Yükleniyor</div> }                                           

                                        <MyModal props={{ modalstate, userdata }}/>
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

      let { modalstate,userdata } = props;       
      
      let {userscopes } = userdata ?? {};
      let email = userdata?.email;  
      let isTechnician  = userscopes?.isTechnician;
      let manegerAuth  =  userscopes?.isManager;
      let patreonAuth  =  userscopes?.isPatreon;
      let technicianAuth  =  userdata?.userscopes.isManager;
                
      let saveFunc = async (payment) => { await fetch("/api/perfectmutation_next15", { method: "POST", body: JSON.stringify({ data:{type:"paymentchange", payment } }) });  }          
      
          const formik = useFormik({
                                                enableReinitialize: true,
                                                initialValues:  modalstate[0] ,
                                                onSubmit: values => {}, 
                                        });   
                    
          let payment = formik?.values;
          let locked = payment?.locked;

          let link1=payment?.o_key_1?.link1;
          let link2=payment?.o_key_1?.link2;
          let link3=payment?.o_key_1?.link3;

          let savebuttonactive=!locked || patreonAuth;

          let { data:users, isLoading:usersLoading } =  usershook_next15({count:5000});

          let usersoptions = users?.map((c) => { return <option value={c?.email} key={`user-${c?.email}`}>{c?.email}</option>; });

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
                                                              <div className={s.modalshell}>
                                                                    {/* { JSON.stringify(users?.[0]) } */}
                                                                    <div className={s.modaltitle}>Ödeme Düzenleme      </div>                                                                    

                                                                    {/* { JSON.stringify(payment)} */}

                                                                    <div className={s.modalinputs}>
                                                                        
                                                                        <Textarea formik={formik} name={`o_key_1.detail`} label={"Detay"} value={payment?.o_key_1?.detail} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        <Textfield formik={formik} name={`o_key_1.link1`} label={"Link1"} value={link1} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        <Textfield formik={formik} name={`o_key_1.link2`} label={"Link2"} value={link2} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        <Textfield formik={formik} name={`o_key_1.link3`} label={"Link3"} value={link3} style={{backgroundColor:"#dedede", fontSize:14}}/> 
                                                                        
                                                                        {link1 && <div className={s.urlwr}>
                                                                              <Link href={link1} target='_blank'><RiExternalLinkLine size="30" title="Url 1"/></Link>
                                                                              {link2 && <Link href={link2} target='_blank'><RiExternalLinkLine size="30" title="Url 2"/></Link>}
                                                                              {link3 && <Link href={link3} target='_blank'><RiExternalLinkLine size="30"  title="Url 3"/></Link>}
                                                                        </div>}

                                                                        <div className={s.userswr}>       
                                                                              <RiFileUserFill size={34} onClick={()=> {_userState.myAccountUser.email=payment?.user; router.push("/p/myaccount");}}/>
                                                                              {usersLoading ? <div>Yükleniyor</div>:
                                                                              
                                                                                    <select
                                                                                    id="user_email"
                                                                                    name="[user_email]"                                                                                
                                                                                    value={payment?.user}
                                                                                    disabled={!savebuttonactive}
                                                                                    onChange={(e)=>{formik.setFieldValue("user", e?.target.value)}}                                                                                
                                                                                    >                                                                                
                                                                                    {usersoptions}
                                                                                    </select> }  
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
                                                                        <div style={{display:"flex", gap:10}}>
                                                                                    {savebuttonactive && <button onClick={()=>{ saveFunc(payment)   }} color="error" className={s.modalbutton}>Kaydet</button>}
                                                                                    <button onClick={()=>modalstate?.[1](undefined)} style={{marginLeft:8}}  className={s.modalbutton}>Kapat</button>
                                                                        </div>
                                                              </div>                                                      
                                                        </Modal>
            </div>
          )
    }