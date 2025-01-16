import { RiGift2Line } from "react-icons/ri";
import { datetimeFunc } from '@/modules/functions/datetimefunc';
import { datetimeDiffFunc } from "@/modules/functions/datetimedifffunc";
import { TbInfinity } from "react-icons/tb";

export default function ContractCaution (props) {

    let {contract, contractdatakey} = props ?? {}

    let {date_start, date_finish, continuous, closed, gift} = contract ?? {}

    let diff = datetimeDiffFunc({datetime2:date_finish, datetime1:undefined })

    let datetime_start = datetimeFunc({ datetime: date_start });
    let datetime_finish = datetimeFunc({ datetime: date_finish });

    let tardiness= diff.diffDays
    
    let cautionText = undefined;
    let cautionTextColor="black";

    if (!contract)
    {
      tardiness=tardiness*-1; // Negatif'ten pozitife çevirelim!!!
       cautionText = `Sözleşme yok`;
       cautionTextColor="darkred";
    }
    else if (!date_start)
    {
      tardiness=tardiness*-1; // Negatif'ten pozitife çevirelim!!!
       cautionText = `Sözleşme süresi yok`;
       cautionTextColor="darkred";
    }
    else if (continuous)
    {
      tardiness=tardiness*-1; // Negatif'ten pozitife çevirelim!!!
       cautionText = `Devamlı sözleşme`;
       cautionTextColor="black";
    }

    else if (tardiness<0)
    {
      tardiness=tardiness*-1; // Negatif'ten pozitife çevirelim!!!
       cautionText = `${tardiness} gün geçti`;
       cautionTextColor="darkred";
    }
    

    return <div style={{display:"flex", marginLeft:10, gap:10, borderLeft:"4px solid black",fontSize:10, padding:"0px 10px"}}>
    {/* {JSON.stringify(contract)} */}
    
    {date_start && <div style={{display:"flex", alignItems:"center", gap:4, }} >{datetime_start?.localeString} - {datetime_finish?.localeString} 
      
          {continuous ? <TbInfinity size={12}/> : undefined } 

      </div>}

    {cautionText ? <div className={"aaaaa"} style={{color:cautionTextColor}}>   {cautionText} </div> : undefined}

    {gift ? <RiGift2Line  size={20} title="Hediye"/>: undefined}
</div>

}