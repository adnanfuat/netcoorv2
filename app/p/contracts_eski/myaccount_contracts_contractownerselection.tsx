import { useSnapshot } from "valtio";
import { _userState} from "@/modules/constants/user";
import React, {  useEffect } from "react";

import s from "./myaccount_contracts_contractownerselection.module.css"

export function MyAccount_Contracts_ContractOwnerSelection  (props)  {

    let {                  
            selecteduser, // Sözleşme sisteminin sahibi            
        }   =  props ?? {}; // indexi buradan kaldır..

      let _userStateData = useSnapshot(_userState);
      
      useEffect(() => {                  
            _userState.contractowneremail=selecteduser
      }, [selecteduser])


return (<select name={"sozlesmesahibi"} value={_userStateData?.contractowneremail} onChange={(e)=>{ _userState.contractowneremail=e?.target?.value }}  className={s.input}>
                                                                              <option value="">Seçim yapınız - { _userStateData?.contractowneremail}</option>
                                                                                    <option value={"yigitruzgaruzun@gmail.com"}>Sözleşme sisteminin sahibi: PROWEB  | Müşteri:{selecteduser} </option>
                                                                                    <option value={selecteduser}>Sözleşme sisteminin sahibi: {selecteduser} | Müşteri: ~ </option>
                                                                          </select>)
}

