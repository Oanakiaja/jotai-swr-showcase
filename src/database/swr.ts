import useSWR from 'swr'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { mockFetch500ms } from './polling'
import { infoAtom } from './atom'

const fetcher = ()=> mockFetch500ms()

export const useInfo = () => {
  const { mutate, data } = useSWR(
    '/info',
    fetcher,
    { refreshInterval: 1000 }
  )
  const setInfoAtom = useSetAtom(infoAtom)

  useEffect(() => {
    if (!data) return
    setInfoAtom(data)
  }, [data])

  return { mutate, data }
}
