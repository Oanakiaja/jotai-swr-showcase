import { useAtomValue } from "jotai"
import { IndexStatusAtom } from "../database/atom"
import {IndexStatus} from '../database/model'

const Status = () => {
  const status = useAtomValue(IndexStatusAtom)
  if(status === IndexStatus.UP) return <div className="text-red-400">Up</div>
  return <div className="text-green-400">Down</div>
}

export default Status