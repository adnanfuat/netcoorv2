import s from "./loading.module.css";

import { MdOutlineDownloading } from "react-icons/md";


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className={s.shell} title="YÜKLENİYOR"> <MdOutlineDownloading />  </div>
  }