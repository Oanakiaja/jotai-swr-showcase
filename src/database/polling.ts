import { info } from './model'
import { StockStatus, IndexStatus, InfoType } from "./model"


const mockFetchCreator = (timeout: number) => async () => {
  console.log('fetch')
  const res = await new Promise((res) => {
    setTimeout(() => {
      res({
        ...info,
        status: Math.random() < 0.5 ? IndexStatus.DOWN : IndexStatus.UP,
        stocks: info.stocks.map(v => ({
          ...v,
          status: Math.random() < 0.5 ? StockStatus.DOWN : StockStatus.UP
        }))
      })
    }, timeout)
  }) as InfoType

  return res
}

export const mockFetch500ms = mockFetchCreator(500)

