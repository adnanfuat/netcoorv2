// const { getItem, setItem }  =   useStorage();
  // const searchParams          =   useSearchParams();
  // let userparam               =   searchParams.get('user');
  
  // let ccuser = getItem("ccuser"); // biri adına ödeme yapıldığında ödeme işlemleri için bankaya gidip geri döndüğünde ilgili kulllanıcının selectte set olması lazım


//  if (isTechnician) return undefined; // Buna çok gerek yok. Zaten üstte kontrol ediyoruz ama yine de kalsın. tedbiren    
//  console.log("user?.userscopesuser?.userscopes: ", user?.userscopes, isTechnician, user, typeof(user));

// useEffect(() => {
  //let initializeuser=undefined;
  // Aslında her daim session storage'ten okuyorum ama select'ten bir kullanıcı değştiriliirse, onu session storage tekrar atıyorum.
//   if (!!ccuser && ccuser!="" &&  ccuser!="null" && ccuser!="undefined" && ccuser!=NaN ) // session storageten gelen.. /kredi kartı ödemeleri
//   {
//     // console.log("zxccxzczxcxz 1",ccuser, typeof ccuser);
//     initializeuser = ccuser;
//     console.log ("zxccxzczxcxz 1", initializeuser, selecteduser,userparam, user?.email, "-->", ccuser)
//   }
//   else if  (!!userparam)  {
//     initializeuser = userparam
//     console.log("zxccxzczxcxz 2");
//   }
//   else if (!!selecteduser) 
//   {
//     initializeuser = selecteduser;
//     console.log("zxccxzczxcxz 3");
//   }
//   else if (!!userdata?.email)
//   {
//     initializeuser = userdata?.email;
//     console.log("zxccxzczxcxz 4");
//   }
  
//   _userState.myAccountUser.email = initializeuser
//   setItem("ccuser", initializeuser);

// }, [userdata?.userinfo?.user, ccuser, userparam])