"use client"
import { SiAkasaair } from "react-icons/si";
import s from "./home_contracts.module.css"
import { useQuery } from "@tanstack/react-query";
import { RiExchangeFill } from "react-icons/ri";
import Link from "next/link";

export default function Home_Contracts(props) {
      
let {userdata} = props;
  
let {userscopes } = userdata ?? {};
let email = userdata?.email;  
let isTechnician  = userscopes?.isTechnician;
let manegerAuth  =  userscopes?.isManager;
let patreonAuth  =  userscopes?.isPatreon;
let technicianAuth  =  userdata?.userscopes.isManager;



const contract_reportsFunc = async () => { let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{ type:"contract_reports" } }) } ); res =  await res?.json(); return res; };

let { data:contract_reports, isLoading:contract_reportsIsLoading } = useQuery({queryKey:["contract_reports"],  queryFn:async () => await contract_reportsFunc()});  // , {enabled:!!technicianAuth}  
let { noncontrolleds_count, noncontractcompanies_count, noncontractcategoricalads_count} = contract_reports ?? {}



return <div className={s.gridwr}>
    
          { userdata?.userscopes.isTechnician && noncontrolleds_count>0 && <div className={s.griditemwr} style={cautiondiv}>
                      <Link href={`/myaccount?tab=contracts`}>
                      <div className={s.griditemicon} style={cautiontext}><RiExchangeFill  size="30"/></div>                              
                      <div className={s.griditemtitle} style={cautiontext}>Kontrol bekleyen {noncontrolleds_count} sözleşme</div>
                      </Link>
                </div> 
           }
    
    
    { userdata?.userscopes.isTechnician && noncontractcompanies_count>0 && <div className={s.griditemwr}  style={cautiondiv}>
                      <Link href={`/myaccount?tab=companysearch`}>
                      <div className={s.griditemicon}  style={cautiontext}><RiExchangeFill  size="30"/></div>                              
                      <div className={s.griditemtitle} style={cautiontext}>Sözleşme bağlantısı bekleyen {noncontractcompanies_count} firma</div>
                      </Link>
                </div> }     
    
    { userdata?.userscopes.isTechnician &&  noncontractcategoricalads_count>0 && <div className={s.griditemwr}  style={cautiondiv}>
                      <Link href={`/categoricalads`}>
                      <div className={s.griditemicon} style={cautiontext}><RiExchangeFill Fill size="30"/></div>                              
                      <div className={s.griditemtitle} style={cautiontext}>Sözleşme bağlantısı bekleyen {noncontractcategoricalads_count} reklam</div>
                      </Link>
                </div> }                                                             
    
     </div>

}



let cautiondiv = { backgroundColor:"#c30606", borderColor:"black", borderRadius:4}

let cautiontext = { color:"white"}