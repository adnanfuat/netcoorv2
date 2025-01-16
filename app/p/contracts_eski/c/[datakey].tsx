import Head from 'next/head';
import { useRouter } from "next/router";  
import s from "./index.module.css"
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import { _userState } from "@/modules/constants/user"
import { useEffect, useState } from "react";
import { isLogged } from "@/components/hooksnew/islogged";
import {useSnapshot} from "valtio";
import { MyAccount_Contract } from '@/modules/contracts/myaccount_contract';
import { useQuery } from 'react-query';

const  Contract = (props) =>{

  //// son haberleri çek----->

  let router = useRouter();

  let {query:{datakey}} = router;

  let isloggeddata  =  isLogged();            
  let userscopes  =  isloggeddata?.userscopes;  

  let selecteduser = useSnapshot(_userState).myAccountUser.email;
  let contractowneremailStateObj = useState(selecteduser);

  let _userStateData = useSnapshot(_userState);

  
  const fetcher_myaccountcontractcategories = async () => { let res= await fetch(`/api/swissarmyknifequery`, { method: "POST", body: JSON.stringify({ data:{ type:"myaccount_contract_categories", email:selecteduser } }) } ); res =  await res?.json(); return res; };
  let  { data:categories } = useQuery( ["myaccount_contractcategories", selecteduser ], () => fetcher_myaccountcontractcategories() , { enabled:!!selecteduser, } );  // refetchOnWindowFocus:false, refetchOnReconnect: false, retry: false, staleTime: 6000,
  let  filtered_categories = _userStateData?.myaccount_contracts_filtered_categories;


  // Filitre selecti değişince çalışan fonksiyon
  
  const filtered_categoriesFunc = ({value}) =>  { _userState.myaccount_contracts_filtered_categories  = value; }


  
  const countriesv2_alldataFunc = async () => { let res= await fetch(`/api/swissarmyknifequery_tunnel`, { method: "POST", body: JSON.stringify({ data:{ type:"countriesv2_alldata", givedistricts:true } }) } ); res =  await res?.json(); return res; };
  let { data:countries, isLoading:countriesIsLoading } = useQuery( ["countriesv2_alldata", ], async () => await countriesv2_alldataFunc(), {keepPreviousData:true , refetchOnWindowFocus:false});

  const insertingObj = useState(false);

  let closeFunc = () => router.back() 
  
  let common_modal_props={categories, closeFunc, filtered_categoriesFunc, insertingObj, countries, countriesIsLoading} // Ekleme ve Düzenle Modallarına Gönderilen Ortak Propslar..


  useEffect(() => { contractowneremailStateObj[1](selecteduser); }, [selecteduser]);

  let {name, permissions, user} = isLogged();     

      useEffect(() => {
                              let initializeuser=undefined;
                              // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değiştirilirse, onu session storage tekrar atıyorum.
                              if (!!selecteduser) { initializeuser=selecteduser; } else if (!!user?.email) { initializeuser=user?.email; }  
                              _userState.myAccountUser.email=initializeuser
                }, [user?.email])



      return (<LayoutMain layout_title={"Sözleşme"} >
                                      <div className={s.shell}> 
                                                {/* {JSON.stringify(datakey)} */}
                                                <Head><title>Sözleşme</title></Head>                                               
                                                                                                 
                                                   {/* {datakey} */}
                                                   {/* {...common_modal_props} */}                                                
                                                <MyAccount_Contract mode="edit" {...common_modal_props} contractdatakey={datakey}/>

                                        </div>
             </LayoutMain>
             );
}

export default Contract


