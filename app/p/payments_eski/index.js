import {isLogged} from "@/components/hooksnew/islogged";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Link from "next/link";
import { BiComment } from "react-icons/bi"; 
import s from "./payments.module.css";
import React, { useState } from "react";
import {GraphQLClient } from "graphql-request";
import {RiBaseStationLine, RiDeleteBin3Line,RiCoinFill, RiStackLine,RiMailSendFill, RiShoppingCartFill, RiQuestionFill, RiExternalLinkFill, RiFolderOpenFill, RiFolderFill, RiDeleteBin2Fill, RiMailFill, RiMailOpenFill, RiShieldStarFill, RiStarFill, RiExchangeBoxFill, RiNodeTree, RiArrowRightUpFill, RiStore3Fill, RiArticleFill,RiGitBranchFill, RiGitBranchLine, RiCopyrightFill, RiPriceTag2Fill, RiErrorWarningFill } from "react-icons/ri";

import Head from 'next/head';

import {LayoutMain} from "@/components/layouts/console/layoutmain"; 
import {YankeeGoHome} from "@/components/commonnew/yankeegohome"; 



export default function Payments(props) {
            
      const [onlymine, setonlymine] = useState("own");
      const [category, setcategory] = useState(0);
      const [take, settake] = useState(20);
      const [active, setactive] = useState(1);  //okunanlar active:0, okunmayanlar active:0

      let {name, permissions, user} = isLogged();
                  
      let { data:payments, isLoading, error} = useQuery(["getPayments"], () => getPayments({user}), { revalidateOnFocus:true, enabled:!!user?.email });            
      
      
      let amounts=payments?.map(a=>Number(a?.i_key_1)) ?? []
      let sum =  amounts?.reduce((a, b) => a + b, 0);
      //console.log("paymentsssss", sum);
      sum = sum ? `${sum} TL` : ""

      // console.log("paymentspayments!: ",payments, error);
      

      if (!user?.email) { return <YankeeGoHome/> }
      
      return (
      
      <LayoutMain layout_title={`Ödemeler`}>
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
            </LayoutMain>
      );
}






const SwissArmyKnifeQuery = 
`  query SwissArmyKnifeQuery ($data:JSON)  {
    swissarmyknifequery (data:$data) {
      id
      title_tr      
      o_key_1
      i_key_1
      createdat
    }
  }`
;




const getPayments = async ({user}) => {

      
  
      // console.log("zzxzxcczx");
      let dataPayments= await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json",  "authorization": `Bearer ${user?.accessToken}` },
            body: JSON.stringify({
              query: SwissArmyKnifeQuery,
              variables: { data: {type:"payments"} },
            }),
          });

          dataPayments= await dataPayments.json()
          dataPayments = dataPayments?.data?.swissarmyknifequery?.o_key_1;

            return dataPayments;
}
