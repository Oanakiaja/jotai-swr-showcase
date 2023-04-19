import { atomsWithQuery } from "jotai-tanstack-query";
import { mockFetch500ms } from "./polling";
import { InfoType, Stock } from "./model";
import { Atom, atom, useAtom } from "jotai";
import pick from "lodash/pick";
import { splitAtom } from "jotai/utils";
import {EventType, startMockSocket} from './socket'

// datasource
const fetcher = () => mockFetch500ms();

const [infoAtom] = atomsWithQuery(() => ({
  queryKey: ["info"],
  queryFn: fetcher,
  refetchInterval: 5000,
}))  as unknown as [Atom<InfoType>]; 

// atom split
const nameAtom = atom<InfoType["name"] | null>((get) => {
  const info = get(infoAtom);
  return info.name;
});

const localeAtom = atom<InfoType["locale"] | null>((get) => {
  const info = get(infoAtom);
  return info.locale;
});

const IndexStatusAtom = atom<InfoType["status"] | null>((get) => {
  const info = get(infoAtom);
  return info.status;
});

const IndexStatusMessageAtom = atom<InfoType["status"]| null>(null)

const stocksMetaAtomAtom = atom<Pick<Stock, "name">[]>((get) => {
  const info = get(infoAtom);
  // FIXME: 这块取了引用，导致重复渲染
  const stockBasicInfos = info?.stocks?.map((v: Stock) => pick(v, "name")) || [];
  return stockBasicInfos;
});

const stocksMetaAtom = splitAtom(stocksMetaAtomAtom);

const stocksStatusAtomAtom = atom<Pick<Stock, "status">[]>((get) => {
  const info = get(infoAtom);
  // FIXME: 这块取了引用，导致重复渲染
  const stockStatusInfos =
    info?.stocks?.map((v: Stock) => pick(v, "status")) || [];
  return stockStatusInfos;
});

const stocksStatusAtom = splitAtom(stocksStatusAtomAtom);

// consume hooks
import { useAtomValue } from "jotai";
import { useSplitAtomByIndex } from "./atom";
import { useEffect } from "react";

export const useBasicInfo = () => {
  const name = useAtomValue(nameAtom);
  const locale = useAtomValue(localeAtom);
  return { name, locale };
};

export const useIndexStatus = () => {
  const pollingStatus =  useAtomValue(IndexStatusAtom);
  const [commitValue, setCommitValue] =  useAtom(IndexStatusMessageAtom)
  useEffect(()=>{
    const {socket, clear} = startMockSocket()
    socket?.on(EventType.MessageUpdateStatus, (status)=>{
      setCommitValue(status)
    })
    return clear
  },[])

  useEffect(()=>{
    setCommitValue(pollingStatus)
  }, [pollingStatus])

  return commitValue
}

export const useStocksMetaAtoms = () => useAtomValue(stocksMetaAtom)

export const useStockStatusByID = (id: number) => useSplitAtomByIndex(stocksStatusAtom, id)?.status;
