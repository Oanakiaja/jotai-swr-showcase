import { useAtomValue } from "jotai"
import { memo } from "react"
import { InfoType } from "../database"
import { basicAtom, imagesAtom } from "../database/swr"

const Image = ({ v }: { v: InfoType['images'][0] }) => {
  const basic = useAtomValue(basicAtom)

  return <div>
    {basic?.id}
    {v.name}
    {v.status}
    {v.url}
  </div>
}

const ImageList = () => {
  const data = useAtomValue(imagesAtom)
  if (!data?.images) return <></>

  return <div>
    {data.images.map(v => <Image v={v} />)}
  </div>
}

export default memo(ImageList)
