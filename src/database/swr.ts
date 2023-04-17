import useSWR from 'swr'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { mockFetch500ms } from './polling'
import { IndexStatusAtom, basicAtom, stocksMetaAtom, stocksMetaAtomAtom, stocksStatusAtom, stocksStatusAtomAtom } from './atom'
import pick from 'lodash/pick'
import { IndexStatus, InfoType } from './model'
import { useMockSocket } from './socket'

const fetcher = ()=> mockFetch500ms()

export const useInfo = () => {
  const { data } = useSWR(
    '/info',
    fetcher,
    { refreshInterval: 5000 }
  )
  const { data: message } = 	useMockSocket()
  useBasicInfoWatch(data)
  useIndexStatusWatch(data,message)
  useStocksWatch(data)
}

export const useBasicInfoWatch = (data:InfoType | undefined)=>{
  const [,setBasic] = useAtom(basicAtom)
  useEffect(()=>{
    if(!data) return
    setBasic(pick(data, ['locale', 'name']))
  }, [data])
}

export const useIndexStatusWatch =  (data:InfoType | undefined, message?: IndexStatus)=>{
  const [,setIndexStatus] = useAtom(IndexStatusAtom)
  // 这里合并数据策略依赖后端返回时间戳，否则按最后触发为准
  const useCompareDataEffect= ()=>{
    useEffect(()=>{
      if(data?.status === undefined) return
      setIndexStatus(data.status)
    }, [data?.status])
  
    useEffect(()=>{
      if(message === undefined) return
      setIndexStatus(message)
    }, [message])
  }
  useCompareDataEffect()
}

export const useStocksWatch = (data: InfoType|undefined)=>{
  const [,setStocksMeta] = useAtom(stocksMetaAtomAtom)
  const [,setStocksStatus] = useAtom(stocksStatusAtomAtom)

  const stockBasicInfos = useMemo(()=> data?.stocks?.map(v=> pick(v,'name'))|| [], [data?.stocks?.length])
  const stockStatusInfos = useMemo(()=> data?.stocks?.map(v=> pick(v,'status'))|| [], [JSON.stringify(data?.stocks)])

  useEffect(()=>{
    setStocksMeta(stockBasicInfos)
  }, [stockBasicInfos])

  useEffect(()=>{
    setStocksStatus(stockStatusInfos)
  }, [stockStatusInfos])
}

export const useBasicInfo=()=>{
  const [value] = useAtom(basicAtom)
  return value
}
export const useIndexStatus=()=>{
  const [value] = useAtom(IndexStatusAtom)
  return value
}
export const useStocksMetaAtoms=()=>{
  const [value] = useAtom(stocksMetaAtom)
  return value
}