import { useAtomValue } from "jotai"
import { memo } from "react"
import { taskStatusAtom } from "../database/swr"

const Status = () => {
  const data = useAtomValue(taskStatusAtom)

  return <div>{data?.status}</div>
}

export default memo(Status)