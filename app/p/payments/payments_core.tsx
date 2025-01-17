"use client"

import s from "./payments_core.module.css";
import React, { useState } from "react";
import Head from 'next/head';
import { useQuery } from "@tanstack/react-query";

export default function PaymentsCore(props) {
            
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

      // console.log("paymentspayments!: ",payments, error);      
      
      return (
                <div>
                      <Head><title>Ödemeler</title></Head>
                      
                            <div className={s.wrapper}>

                                      <div  className={s.sum}>  {sum} </div>

                                        {/* {JSON.stringify(payments)}   */}
                                                                
                                        {
                                              payments?.map(p=>{

                                                                      let o_key_1=p?.o_key_1;
                                                                      let {orderid,ccname, ccmonth, ccyear, ccnumber,  finalamount, amount, installment, company, gsm, person, detail, commision,  defactouser, orderdate, user  }  = o_key_1 ?? {}

                                                                      return <div className={s.item}> 
                                                                      {/* {JSON.stringify(p)} */}

                                                                                                          <div className={s.itemtitle}> {finalamount} TL</div>
                                                                                                          
                                                                                                          <div className={s.itemdetails}>  

                                                                                                                      <div className={s.itemdetail}>  {ccnumber} </div>
                                                                                                                      {/* <div className={s.itemdetail}>  {company} </div> */}
                                                                                                                      <div className={s.itemdetail}>  {gsm} </div>
                                                                                                                      {/* <div className={s.itemdetail}>  {person} </div> */}
                                                                                                                      <div className={s.itemdetail}>  {detail} </div>
                                                                                                                      <div className={s.itemdetail}> {p?.user} </div>
                                                                                                                      {defactouser!=p?.user && <div className={s.itemdetail}> Defacto:  {defactouser}  </div>}
                                                                                                                      <div className={s.itemdetail}>  {orderdate} </div>                                                                                                                                                                                                                                    

                                                                                                          </div>

                                                                            </div>
                                                          })
                                        }
                      

                                        {
                                              (payments?.length==0 && !isLoading) && <div>~</div>
                                        }                                       
                                        {
                                              (!!isLoading) && <div>Yükleniyor</div>
                                        }                                                                                                                                                                                            
                            </div>                                                                            
                </div>            
            );
}






