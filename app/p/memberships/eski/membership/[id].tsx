
import {LayoutMain} from "@/components/layouts/console/layoutmain"; 
import {_userState} from "@/modules/constants/user";
import { useRouter } from 'next/router';
import CompanyShell from '@/components/commonnew/company/companyshell';

const  Membership = () =>{  //{countries, isloggeddata} >> bunlar gelmiyor olmalı ?
   
const router = useRouter();    
const {locale, defaultLocale, query:{id}}= router;
// return JSON.stringify(id);

      return (
              <LayoutMain layout_title={"Firma"} >
                         <CompanyShell id={id}/>
               </LayoutMain>
            );
}

export default Membership  







