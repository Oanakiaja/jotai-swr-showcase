import { Atom, useAtomValue } from "jotai"
import { Stock, StockStatus } from "../database/model"
import {  stocksAtom } from "../database/atom"
import Status from "./Status"

type Props = { atom: Atom<Stock> }

const StockStatusComp = (props: {status: StockStatus})=>{
  const {status} = props
  if(status === StockStatus.UP){
    return <div className="text-red-200">Up</div>
  }
  return <div className="text-green-200">Down</div>
}

const Stock = (props:Props) => {
  const { atom }= props
  const stock = useAtomValue(atom)

  return <div className="m-4 p-4 border-2 rounded-lg">
    <div>{stock.name}</div>
    <div className="flex justify-between">
        <Status />
        <StockStatusComp status={stock.status} />
    </div>
  </div>
}

const StockList = () => {
  const stocksAtoms = useAtomValue(stocksAtom)
  if (stocksAtoms.length===  0) return <></>
  return <div className="
  flex rounded-lg
  m-4 p-4 border-t-2 bg-zinc-600 border-zinc-500">
    {stocksAtoms.map((atom,idx) => <Stock atom={atom} key={idx} />)}
  </div>
}

export default StockList
