import { useAtomValue } from "jotai"
import { IndexStatusAtom } from "../database/atom"
import {IndexStatus} from '../database/model'
import { useIndexStatus } from "../database/swr"

const Status = () => {
  const status = useIndexStatus()
  if(status === IndexStatus.UP) return <div className="text-red-400">Up</div>
  return <div className="text-green-400">Down</div>
}

export default Status