import useSWR from 'swr'
import { InfoType, mockFetch500ms, TaskStatus } from '.'
import { atom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const infoAtom = atom<InfoType | null>(null)
export const basicAtom = atom<Pick<InfoType, 'id' | 'name'> | null>((get) => {
  const info = get(infoAtom)
  return {
    id: info?.id ?? '',
    name: info?.name ?? ''
  }
})
export const taskStatusAtom = atom<Pick<InfoType, 'status'> | null>((get) => {
  const info = get(infoAtom)
  return {
    status: info?.status ?? TaskStatus.STOP,
  }
})
export const imagesAtom = atom<Pick<InfoType, 'images'> | null>((get) => {
  const info = get(infoAtom)
  return {
    images: info?.images ?? [],
  }
})


export const useInfo = () => {
  const { mutate, data } = useSWR(
    '/info',
    () => mockFetch500ms(),
    { refreshInterval: 1000 }
  )
  const setInfoAtom = useSetAtom(infoAtom)

  console.log(data)

  useEffect(() => {
    if (!data) return
    setInfoAtom(data)
  }, [data])
  return { mutate, data }
}
