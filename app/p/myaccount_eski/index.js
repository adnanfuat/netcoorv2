import {useSnapshot} from "valtio";
import {isLogged} from "@/components/hooksnew/islogged";
import s from "./index.module.css";
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import {YankeeGoHome} from "@/components/commonnew/yankeegohome";
import {LayoutMain} from "@/components/layouts/console/layoutmain";
import 'react-tabs/style/react-tabs.css';
import useStorage from "@/modules/functions/usestorage";
import {_userState} from "@/modules/constants/user";
import { useSearchParams } from 'next/navigation';
import MyAccount_Shell from "@/components/commonnew/myaccount/myaccount_shell";
import UserSelection from "./userselection";


export default function MyAccount(props) {

      // let selectedweb = useSnapshot(webProxy)?.web   
      const { getItem, setItem } = useStorage();
      const searchParams = useSearchParams()
      let userparam = searchParams.get('user');
      
      let ccuser = getItem("ccuser"); // biri adına ödeme yapıldığında ödeme işlemleri için bankaya gidip geri döndüğünde ilgili kulllanıcının selectte set olması lazım

      let {name, permissions, user, userscopes} = isLogged();           
      let updateaccount= permissions?.find(p=>p?.name=="updateaccount")?.whichcanedit=="all" ? true : false;      
      let selecteduser = useSnapshot(_userState).myAccountUser.email;
      
      // console.log("first", selecteduser);
      let isTechnician  = userscopes?.isTechnician;
      let manegerAuth  =  userscopes?.isManager;
      let patreonAuth  =  userscopes?.isPatreon;
      // if (isTechnician) return undefined; // Buna çok gerek yok. Zaten üstte kontrol ediyoruz ama yine de kalsın. tedbiren    

      // console.log("user?.userscopesuser?.userscopes: ", user?.userscopes, isTechnician, user, typeof(user));

    useEffect(() => {

      let initializeuser=undefined;
      // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değştiriliirse, onu session storage tekrar atıyorum.
      if (!!ccuser && ccuser!="" &&  ccuser!="null" && ccuser!="undefined" && ccuser!=NaN ) // session storageten gelen.. /kredi kartı ödemeleri
      {
        console.log("zxccxzczxcxz 1",ccuser, typeof ccuser);
        initializeuser = ccuser;
        // console.log ("111111111111", initializeuser, selecteduser,userparam, user?.email)
      }
      else if  (!!userparam)  {
        initializeuser = userparam
        console.log("zxccxzczxcxz 2");
      }
      else if (!!selecteduser) 
      {
        initializeuser = selecteduser;
        console.log("zxccxzczxcxz 3");
      }
      else if (!!user?.email)
      {
        initializeuser = user?.email;
        console.log("zxccxzczxcxz 4");
      }
      
      _userState.myAccountUser.email = initializeuser
      setItem("ccuser", initializeuser); 

   }, [user?.email, ccuser, userparam])

              // useEffect(() => {
              //      setItem("ccuser", emailQP);
              //  }, [emailQP])

  // return (<div>aaa{JSON.stringify(userparam)}</div>) 
 
if (!user?.email || !user?.accessToken) { return <YankeeGoHome/> }

 // if (!user?.accessToken ) { return <div>Erişim Hatası</div> }            
      return (<LayoutMain layout_title={"Hesabım"}>
                              <div className={s.shell}> 
                              {/* {JSON.stringify(user)} */}
                                <Head><title>Hesabım</title></Head>                                                                                         
                                {/* {isTechnician ? "evet" : "hayır"} */}
                                {isTechnician ? <UserSelection/> : 
                                                <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
                                                {user?.email}
                                                </div>
                                 }
          {/* {user?.email } {selecteduser} */}
                                {user?.email && <MyAccount_Shell user={user} selecteduser={selecteduser}/>}

                              </div>
            </LayoutMain>);
}







// const UserSelection = (props) => {

//   let { aaaaaa } = props ?? {};
//   let [searchkeyword, setSearchKeyword] = useState("");
//   let [filter, setFilter] = useState({keyword:undefined});
//   const { getItem, setItem } = useStorage();

//   let {name, permissions, user} = isLogged();           
//   let updateaccount= permissions?.find(p=>p?.name=="updateaccount")?.whichcanedit=="all" ? true : false;      
//   let selecteduser = useSnapshot(_userState).myAccountUser.email;

//   const [newusermail, setnewusermail] = useState();

//  //  body: JSON.stringify({ query: RelatedSubCategoriesQuery_WithKey, variables: {data:{origin:rootslug}}, }),
//    const getUsersFunc = async () => {

//                            let users =  await fetch(process.env.NEXT_PUBLIC_API_URL, {
//                            method: "POST",
//                            next:{revalidate:6000},
//                            headers: { "Content-Type": "application/json", "authorization": `Bearer ${user?.accessToken}` },
//                            // let rawdata= await fetch(process.env.NEXT_PUBLIC_API_URL, { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ query: RelatedSubCategoriesQuery_WithKey, variables: {data:{origin:bigbigparent_key}}, }), })       
//                            body: JSON.stringify({ query: UsersQuery, variables:{data:{searchkeyword}}})
//                            })
//                            .then((res) => res.json())
//                            .then(async (result) => { let data= result?.data?.usersquery ?? []; return data; });

//                            return users
//        }


// let { data:users, refetch, isLoading:isLoading_Users, isFetching:isFetching_Users } = useQuery( ["usersquery", filter?.keyword ],  () =>  getUsersFunc(), {
//         enabled:!!user,
//         refetchOnWindowFocus: false,
//         refetchOnReconnect: false,
//         retry: false,
//         staleTime: 1000 * 60 * 60 * 24,
// });


// let processing = isLoading_Users || isFetching_Users;
// let verified = user?.userinfo?.slug_en;


//      return <div className={s.toolwr}>                                          
//                                            {/* { JSON.stringify(user?.userinfo?.slug_en)} */}
//                                           {updateaccount && <div className={s.searchuser}>
//                                             <input value={searchkeyword} onChange={e=>setSearchKeyword(e.target.value)} placeholder="Arama kelimesini yaz, enter tuşuna bas"/>
//                                             <button onClick={e=>{setFilter(old=>old={...old, keyword:searchkeyword }); refetch()}} disabled={processing}> {processing ? "Aranıyor" :  "Ara" }</button>
//                                           </div>}

//                                           <select onChange={(e)=>{  
//                                                                   // setselecteduser(e?.target?.value); 
//                                                                   _userState.myAccountUser.email=e?.target?.value
//                                                                   //let sesUser=getItem("ccuser");
//                                                                   setItem("ccuser", e?.target?.value);
//                                                                   // console.log("çalıştım", sesUser, e?.target?.value);
//                                                                   localStorage.removeItem("web"); // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
//                                                                   webProxy.web=undefined; // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
//                                                                   }} value={selecteduser} className={s.select}>

//                                                                     {updateaccount && <option value={"all"}>{processing ? "Aranıyor" :"Tümü"} {users?.length}</option>}

//                                                 {users?.map((user,index)=>{

//                                                       return <option value={user?.slug_tr} key={`user${index}}`}> {user?.slug_tr} </option>
//                                                 })
//                                                 }

//                                                 </select>

//                                                 {users?.length>1 && <div className={s.newuserwr}>
                                                      
//                                                       <button onClick={()=>{
//                                                           _userState.myAccountUser.email="all";
//                                                           setItem("ccuser", "all");                                                            
//                                                           webProxy.web=undefined; // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
//                                                       }} type="button" title="Tümü" style={{padding:4}}><RiCharacterRecognitionLine size={20}/></button>

//                                                         <button onClick={()=>{
//                                                           _userState.myAccountUser.email=user?.email;
//                                                           setItem("ccuser", user?.email);                                                            
//                                                           webProxy.web=undefined; // Aşağıda seçili bir web sitesi varsa onu yok etmek için kullanacağım
//                                                       }} type="button" title="Ben" style={{padding:4}}><RiAccountPinBoxLine   size={20}/></button>

//                                                        <input placeholder="Kullanıcının mail adresini yaz" type={"text"} value={newusermail} onChange={(e)=>setnewusermail(e.target.value)} className={s.newuserinput}/>
//                                                        <button onClick={()=>createUserInfo({user, email:newusermail})} type="button" title="Yeni kullanıcı oluştur"  className={s.newuserbutton}>Yeni Kullanıcı</button>
                                                       
//                                                 </div>}

//                                </div>
// }





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


const UsersQuery =
`  query  UsersQuery ($data:JSON)  {
  usersquery (data:$data)   {
    id
    slug_tr
    bigdata
  }
}`
;




const createUserInfo = async ({user, email}) => {

      let users =  await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": `Bearer ${user?.accessToken}` },
        body: JSON.stringify({
          query: SwissArmyKnifeMutation,
          variables: {data:{
            type:"initializenewuser", // Backendde slug olarak alıyormuş...
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

