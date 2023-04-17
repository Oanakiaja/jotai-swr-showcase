import { Atom, useAtomValue } from "jotai"
import { Stock, StockStatus } from "../database/model"
import {  stocksStatusAtom, useSplitAtomByIndex } from "../database/atom"
import Status from "./Status"
import { useStocksMetaAtoms } from "../database/swr"
import { memo } from "react"

type Props = {
  stockMetaAtom: Atom<Pick<Stock, 'name'>>,
  children: React.ReactNode
}

const StockStatusComp = memo((props: { id: number }) => {
  const { id } = props
  const {status } = useSplitAtomByIndex(stocksStatusAtom,id)
  if (status === StockStatus.UP) {
    return <div className="text-red-200">Up</div>
  }
  return <div className="text-green-200">Down</div>
})

const Stock = memo((props: Props) => {
  const { stockMetaAtom, children } = props
  const stock = useAtomValue(stockMetaAtom)

  return <div className="m-4 p-4 border-2 rounded-lg">
    <div>{stock.name}</div>
    <div className="flex justify-between">
      <Status />
      {children}
    </div>
  </div>
})

const StockList = memo(() => {
  const stocksMetaAtom = useStocksMetaAtoms()
  if (stocksMetaAtom.length === 0) return <></>
  return <div className="flex rounded-lg
  m-4 p-4 border-t-2 bg-zinc-600 border-zinc-500">
    {stocksMetaAtom.map((atom, idx) =>
      <Stock stockMetaAtom={atom} key={idx} >
        <StockStatusComp id={idx} />
      </Stock>)}
  </div>
})

export default StockList
