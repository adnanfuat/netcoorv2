"use client"
import {webProxy} from "@/modules/constants/states/web";
import { useSearchParams } from 'next/navigation';
import {useSnapshot} from "valtio";
import {keepPreviousData, QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import s from "./userselection.module.css";
import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import useStorage from "@/modules/functions/usestorage";
import {_userState} from "@/modules/constants/user";
import { RiCharacterRecognitionLine, RiAccountPinBoxLine } from "react-icons/ri";
import setselecteduserhook from "@/modules/functions/setselecteduserhook";

const UserSelection = (props) => {

  let {userdata} = props ?? {};

  let user_email = userdata?.email;
      
  let [searchkeyword, setSearchKeyword] = useState("");
  let [filter, setFilter] = useState({keyword:undefined});
  
  let {name, permissions, userscopes, email} = userdata;
  let updateaccount= permissions?.find(p=>p?.name=="updateaccount")?.whichcanedit=="all" ? true : false;      
  
  let selecteduser = useSnapshot(_userState).myAccountUser.email;

  if (!selecteduser) // server componentlerden gelirken, valtio kullanılamıyor. O nedenle içerinden de alma özelliği yaptım.
  {                                              
    _userState.myAccountUser.email=user_email;                
  } 

  const queryClient = useQueryClient();

  setselecteduserhook({selecteduser, loggeduser:email})
  
  const [ newusermail, setnewusermail ] = useState();

  const submittingState = useState(false);
   

       let getUsersFunc= async () => {                                                                            
                                          let res= await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{searchkeyword, type:"giveuserslist"}  })});            
                                          let datajson =  await res?.json();                                                                    
                                          // console.log("res:::.", datajson);
                                          return datajson;
                                      }

let { data:users, refetch, isLoading:isLoading_Users, isFetching:isFetching_Users } = useQuery( {queryKey:["usersquery", filter?.keyword ],  queryFn:() =>  getUsersFunc(), staleTime:1200000000000, placeholderData:keepPreviousData  }); 

let processing = isLoading_Users || isFetching_Users;

let initializeuserFunc= async ({email}) => {    

        submittingState[1](true);
        let res= await fetch(`/api/perfectmutation_next15`, { method: "POST", body: JSON.stringify({ data:{email, type:"initializenewuser"} })});
        let datajson =  await res?.json();                 
        submittingState[1](false);
        queryClient.invalidateQueries() 
        _userState.myAccountUser.email=email
        // console.log("res:::.", datajson);        
        return datajson;
}






        

     return <div className={s.toolwr}> 
                                            {/* {JSON.stringify(selecteduser)} - {user_email} */}
                                          {updateaccount && <div className={s.searchuser}>
                                            <input value={searchkeyword} onChange={e=>setSearchKeyword(e.target.value)} placeholder="Arama kelimesini yaz, enter tuşuna bas"/>
                                            <button onClick={e=>{setFilter(old=>old={...old, keyword:searchkeyword }); refetch()}} disabled={processing}> {processing ? "Aranıyor" :  "Ara" }</button>
                                          </div>}

                                          <select onChange={(e)=>{                                                                    
                                                                   _userState.myAccountUser.email=e?.target?.value;
                                                                  // _userState.task_system_datakey=undefined;                                                                  
                                                                  //setItem("ccuser", e?.target?.value);
                                                                   //console.log("çalıştım:::111:: ", e?.target?.value);
                                                                  //localStorage.removeItem("web"); // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
                                                                  // webProxy.web=undefined; // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
                                                                  }} value={selecteduser} className={s.select}>

                                                                    {updateaccount && <option value={"all"}>{processing ? "Aranıyor" :"Tümü"} {users?.length}</option>}

                                                {users?.map((user,index)=>{

                                                      return <option value={user?.slug_tr} key={`user${index}}`}> {user?.slug_tr} </option>
                                                })
                                                }

                                                </select>

                                                {users?.length>1 && <div className={s.newuserwr}>
                                                      
                                                      <button onClick={()=>{                                      
                                                          _userState.myAccountUser.email="all";
                                                          setItem("ccuser", "all");                                                            
                                                          //webProxy.web=undefined; // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
                                                      }} type="button" title="Tümü" style={{padding:4}}><RiCharacterRecognitionLine size={20}/></button>

                                                        <button onClick={()=>{
                                                          _userState.myAccountUser.email=userdata?.email;
                                                          setItem("ccuser", userdata?.email);                                                            
                                                          // webProxy.web=undefined; // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
                                                      }} type="button" title="Ben" style={{padding:4}}><RiAccountPinBoxLine   size={20}/></button>

                                                       <input placeholder="Mail adresi yaz" type={"text"} value={newusermail} onChange={(e)=>setnewusermail(e.target.value)} className={s.newuserinput}  style={{padding:4, backgroundColor:"#dedede", padding:10, borderRadius:4}}/>
                                                       <button onClick={()=>initializeuserFunc({ email:newusermail })} type="button" title="Yeni kullanıcı oluştur"  className={s.newuserbutton}  style={{padding:4, backgroundColor:"#dedede", padding:10, borderRadius:4, color:submittingState[0]? "gray" : "black" }} disabled={submittingState[0]}>Yeni Kullanıcı</button>
                                                       
                                                </div>}

                               </div>
}


export default UserSelection



const SwissArmyKnifeMutation =
 `
  mutation SwissArmyKnifeMutation (  $data: JSON  ) {
    swissarmyknifemutation ( data:$data )
        {
          title_tr
          o_key_1
        }
  }
`;




const createUserInfo = async ({user, email}) => {

      let users =  await fetch(process.env.NEXT_PUBLIC_BACKEND_APIURL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": `Bearer ${"user?.accessToken"}` },
        body: JSON.stringify({
          query: SwissArmyKnifeMutation,
          variables: {data:{
            type:"", // Backendde slug olarak alıyormuş...
            email
      }},
        }),
      })
        .then((res) => res.json())
        .then(async (result) => {
              let data= result?.data?.swissarmyknifemutation ?? [];
              return data;
            });

            return users
    }

