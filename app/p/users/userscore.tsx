"use client"
import Modal from 'react-modal';
import { useRouter } from "next/navigation";
import {_userState} from "@/modules/constants/user";
// import { JsonViewer, createDataType } from '@textea/json-viewer'
import Head from 'next/head';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import s from "./userscore.module.css";
import React, { useState } from 'react';

import { RiLockUnlockLine, RiDragMove2Fill } from "react-icons/ri";


export default function UsersCore  (props) {

  let {userdata} = props ?? {};

  const searchParams = useState({ order:2, count:50});
  let count = searchParams[0]?.count;
  let order = searchParams[0]?.order;
  let keyword = searchParams[0]?.keyword;
  
  const [usertransfer, setusertransfer] = useState();
  let permissions = userdata?.permissions ?? [];

  let auth_userinfo_view=permissions?.find(item=>item?.name=="userinfo_view");
  let auth_userinfo_mutate=permissions?.find(item=>item?.name=="userinfo_mutate");

  const fetcher= async ()=> {
          let res =  await fetch(`/api/perfectquery_next15`, { method: "POST", body: JSON.stringify({ data:{type:"users2", count, order, keyword  } }) } );      
          res=await res.json();
          return res
  };
                                      
  const { isLoading, data } = useQuery( {queryKey:["users2", count, order, keyword ], queryFn:() => fetcher(), staleTime:2000000000000000});

  let users = data ?? [];
   
//  console.log("usersusersusers: ", users)

const [useremail, setuseremail] = useState(null);
const [modalIsOpen, setIsOpen] = useState(false);

function closeModal() { setIsOpen(false); }

let userdatastransferFunc =async ({from, to}) => {  
  await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{ type:"userdatastransfer", from, to, jobadverts_transfer:true,richcontents_transfer:true, followedjobseekers_transfer:true, messages_transfer:true, notifications_transfer:true, payments_transfer:true, purchasedpackages_transfer:true, webs_transfer:true, applies_transfer:true, followedjobads_transfer:true } }) });
}

let loginFixFunc =async ({target}) => {  
    await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{ type:"loginfix", target } }) });
}

let removePasswordFunc =async ({target}) => {  
  await fetch("/api/swissarmyknifemutation", { method: "POST", body: JSON.stringify({ data:{ type:"removepassword", target } }) });
}

let router = useRouter();

// return move
  return (    
      <div>
      <Head><title>Kullanıcılar {users?.length>0 ? `${users?.length} kişi` : ``}</title></Head>    
              <div className={s.shell}>  
              <Filter_Categories searchParams={searchParams}/>
              {/* {usertransfer} */}
               {/* {JSON.stringify(users)} */}
                            <div className={s.users}>
                                      {users?.length>0 && users?.map((user,i)=>{ 
                                        
                                                      return <div className={s.userrow} key={`${i}-${user?.email}`}>   
                                                                                
                                                                                {1==2 && <img src={user?.image}  className={s.image} />}
                                                                                <div className={s.userdata}>
                                                                                    <span className={s.username}>{user?.name}</span>
                                                                                    
                                                                                    {user?.parent_slug && <span style={{fontSize:12, color:"darkgreen", textDecoration:"underline"}} title="İlk giriş kaynağı">{user?.parent_slug}</span>}
                                                                                    <span style={{fontSize:12, color:"darkgray"}}>{user?.email}</span>
                                                                                    
                                                                                    <div className={s.buttons}>
                                                                                      {auth_userinfo_mutate && <div><button  className={s.button} onClick={()=>{setIsOpen(true); setuseremail(user?.email)}}>Tıkla</button></div>}
                                                                                      <div><button  className={s.button} onClick={()=>{_userState.myAccountUser.email=user?.slug_tr; setItem("ccuser", user?.slug_tr);  router.push("/myaccount")}}>Git</button></div>
                                                                                      {user?.error && <div><button  className={`${s.button} ${s.usererror}`} onClick={()=>{ loginFixFunc({target:user?.email}) }} title="Fix Login Problem" >Fix</button></div>}
                                                                                      {<button  onClick={()=>{setusertransfer(user?.email); } } className={`${s.button} ${s.usererror}`} title="Taşı"><RiDragMove2Fill/></button>}

                                                                                      {(user?.bigparent_key && user?.email!="yigitruzgaruzun@gmail.com" && user?.email!="kevseresen@sakaryarehberim.com"  ) && <div><button  className={`${s.button} ${s.usererror}`} onClick={()=>{ removePasswordFunc({target:user?.email}) }} title="Şifre Kaldır" ><RiLockUnlockLine/></button></div>}
                                                                                      
                                                                                    </div>

                                                                                    
                                                                                </div>
                                                              </div>
                                              }) }

                                              {isLoading &&

                                                        <div>
                                                              Yükleniyor...
                                                        </div>
                                                                                            
                                              }            
                            </div>    
                          
                          
                          {<MoveModal usertransfer={usertransfer} setusertransfer={setusertransfer} userdatastransferFunc={userdatastransferFunc}  users={[...users]}/> }

                          {(modalIsOpen && auth_userinfo_mutate) && <ModalComp modalIsOpen={modalIsOpen} closeModal={closeModal} users={users} useremail={useremail}/>}

                    </div>    
      </div>    
  )
}




const MoveModal = (props) => {


  let {setusertransfer, usertransfer, userdatastransferFunc, users} = props ?? {};

  users=users?.sort( (a,b) => 
  {if(a.email < b.email) { return -1; }
  if(a.email > b.email) { return 1; }
  return 0;}
  );
  //type userType= string | undefined
  const [selecteduser, setselecteduser] = useState();
 

  return (
  <div>    
    
          <Modal
          isOpen={!!usertransfer}                                                      
          onRequestClose={()=>{setusertransfer(undefined); setselecteduser(undefined)}}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
          >                                                      
                <div className={s.modal}>  

                {/* {JSON.stringify(users[0])} */}

                <br/>

                      "{usertransfer}" üzerindeki verileri, aşağıda seçilen kullanıcıya taşı

                      <select className={s.select} onChange={(e)=>setselecteduser(e.target?.value)}>
                          <option value={""}> Seçiniz </option>
                          {users?.map((user,i)=>
                              <option value={user?.email}  key={`${i}-${user?.email}`}> {user?.email} </option>
                            )}
                      </select>

                      <button className={s.button} style={{padding:20}} disabled={!!!selecteduser} onClick={()=>{!!selecteduser && userdatastransferFunc({from:usertransfer, to:selecteduser})}}>
                            Kullanıcının üzerindeki verileri {selecteduser ? `"${selecteduser}" kullanıcısına` : ""} taşı  
                      </button>
                      
                      {/* {JSON.stringify(userinfojson)} -- {newdata} */}
                      {/* <textarea value={newdata} rows={15}  className={s.textareastyle} onChange={(e)=>setnewdata(e?.target?.value)}/>
                      <button onClick={()=>mutate()} disabled={false} type="button" className={s.button}>Kaydet</button>
                      <JsonViewer value={userinfojson} /> */}

                </div>                                                      
          </Modal>

      </div>          
        )

}



const ModalComp = (props) => {

  const queryClient = useQueryClient();

  
  const user =isLogged();
  const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, { headers: { authorization: `Bearer ${user?.accessToken}` }}); //{ authorization: `Bearer ${user?.accessToken}` }    

  let {modalIsOpen, closeModal, users, useremail } = props ?? {};

  let userinfojson=users?.find(user=>user?.email==useremail)?.bigdata;
  const [newdata, setnewdata] = useState(JSON.stringify(userinfojson));

  const mutateFunc =async ()=> {return await graphcms?.request(UserInfoMutation, {  data:{newdata, useremail} })};      
  const { mutate } = useMutation( () => mutateFunc(),    {onSuccess: () => { console.error("MUTATE cache temizlendi..."); queryClient.invalidateQueries() }} );

  return (
  <div>
    
          <Modal
          isOpen={modalIsOpen}                                                      
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
          >                                                      
                <div className={s.modal}>  
                      {/* {JSON.stringify(userinfojson)} -- {newdata} */}

                      <textarea value={newdata} rows={15}  className={s.textareastyle} onChange={(e)=>setnewdata(e?.target?.value)}/>
                      <button onClick={()=>mutate()} disabled={false} type="button"  className={s.button}>Kaydet</button>

                      {/* <JsonViewer value={userinfojson} /> */}

                </div>                                                      
          </Modal>

      </div>          
        )

}



const Filter_Categories = (props) => {

  const {contractowneremailStateObj, categories,projects, keywordObj, searchParams, changeFilterSelect, filtered_categories } = props ?? {};
  
  return (
          <div style={{display:"flex", gap:10, flexDirection:"column"}}>
              {/* {JSON.stringify(sectorStateObj?.[0])} */}
                                                        
           <div style={{display:"flex", gap:10}}>

              <select value={searchParams[0]?.order}  onChange={ (e)=>{searchParams[1](old=>old = {...old, order:Number(e?.target?.value) }) }} key={`000-${"deep"}-${"siralama"}`}>
                        <option value={0}>    A'dan Z'ye     </option>
                        <option value={1}>    Z'den A'ya     </option>
                        <option value={2}>    Sondan başa doğru sırala     </option>
                        <option value={3}>    Baştan sona doğru sırala     </option>
              </select>              
              <input value={searchParams[0]?.count} onChange={(e)=>{searchParams[1](old=>old = {...old, count:Number(e?.target?.value) }) }} placeholder="Kaç adet kayıt?" type="number"/>

              <input value={searchParams[0]?.keyword} onChange={(e)=>{searchParams[1](old=>old = {...old, keyword:e?.target?.value }) }} placeholder="Anahtar kelime" type="text"/>

              {/* { <div className={s.item_inputwr}>
                                                                                                    <select value={projectStateObj?.[0]} onChange={(e)=>{
                                                                                                                                                let value = e?.target?.value =="" ? undefined :  e?.target?.value;
                                                                                                                                                projectStateObj[1](value);
                                                                                                                                                sectorStateObj[1](undefined);
                                                                                                                                                subsectorStateObj[1](undefined);
                                                                                                                                                cclassStateObj[1](undefined);
                                                                                                                                                labelStateObj[1](undefined);
                                                                                                                                        }} style={selectstyle}>
                                                                                                            <option value={""}>Proje seçiniz</option>
                                                                                                            <option value={"sakaryarehberim.com"}>Sakaryarehberim.com</option>                                                                                                            
                                                                                                    </select>
              </div>} */}


              </div>
          </div>
          )
}





const UserInfoMutation= 
 ` mutation UserInfoMutation (  $data: JSON  ) {
    userinfomutation  ( data:$data ) 
        {
          title_tr
          slug_tr
        }
  }
`;




const customStyles = {
  content: {
     top: '13%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',    
  },
};



