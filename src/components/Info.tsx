import { useAtomValue } from "jotai"
import { memo } from "react"
import { basicAtom } from "../database/swr"

const Info = () => {
  const basic = useAtomValue(basicAtom)

  return <div>
    {basic?.name} {basic?.id}
  </div>
}

export default memo(Info)