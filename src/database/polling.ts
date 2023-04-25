import { info } from './model'
import { StockStatus, IndexStatus, InfoType } from "./model"

export const getIndexStatus = ()=> Math.random() < 0.5 ? IndexStatus.DOWN : IndexStatus.UP
export const getStockStatus = ()=> Math.random() < 0.5 ? StockStatus.DOWN : StockStatus.UP


const mockFetchCreator = (timeout: number) => async () => {
  const res = await new Promise((res) => {
    setTimeout(() => {
      console.log('fetch success')
      res({
        ...info,
        status: getIndexStatus(),
        stocks: info.stocks.map(v => ({
          ...v,
          status: getStockStatus()
        }))
      })
    }, timeout)
  }) as InfoType

  return res
}

export const mockFetch500ms = mockFetchCreator(500)

