import { useAtomValue } from "jotai"
import { useBasicInfo } from "../database/query"
import React from "react"
import Status from "./Status"

const Info = () => {
  const {locale, name} = useBasicInfo() || {}
  return  <div className="border-2 m-8 p-4  
  border-stale-700 rounded-md bg-slate-700">
  <div className=" flex
  items-center 
  ">
    <div>{locale}</div> 
    <div className="ml-4">{name}</div>
  </div>
    <Status />
  </div>

}

export default React.memo(Info)