import {IndexStatus} from '../database/model'
import { useIndexStatus } from "../database/query"

const Status = () => {
  const status = useIndexStatus()
  if(status === IndexStatus.UP) return <div className="text-red-400">Up</div>
  if(status ===IndexStatus.DOWN)  return <div className="text-green-400">Down</div>
  return  <></>
}

export default Status