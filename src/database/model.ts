export enum IndexStatus {
  UP,
  DOWN
}

export enum StockStatus {
  UP,
  DOWN
}

export type Stock={ name: string, status: StockStatus }

export type InfoType = {
  name: string,
  locale: string,
  status: IndexStatus,
  stocks: Stock[]
}

const TEST_STOCKS_DATA = new Array(1000).fill(0).map((_,i)=>({
  name: `${i}-Kevin Company`,
  status: StockStatus.UP
}))

export const info: InfoType = {
  name: 'Online',
  locale: 'Hongkong',
  status: IndexStatus.UP,
  stocks: TEST_STOCKS_DATA
}