"use client"

import {useSnapshot} from "valtio";
import {useQuery} from "@tanstack/react-query";
import s from "./userselection.module.css";
import 'react-tabs/style/react-tabs.css';
import {_userState} from "@/modules/constants/user";
import setselecteduserhook from "@/modules/functions/setselecteduserhook";

const UserSelection_Minimal = (props) => {

     let {userdata} = props ?? {};
    setselecteduserhook({selecteduser:props?.selecteduser, loggeduser:userdata?.email});
    
    let selecteduser = useSnapshot(_userState).myAccountUser.email;    
  
     return  <div style={{fontSize:20, backgroundColor:"#f0f0f0", padding:10, borderRadius:2}}>
                {userdata?.email}
             </div>
}


export default UserSelection_Minimal



