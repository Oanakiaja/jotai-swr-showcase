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

export const info: InfoType = {
  name: 'Online',
  locale: 'Hongkong',
  status: IndexStatus.UP,
  stocks: [{
    name: 'Kevin Company',
    status: StockStatus.UP
  }, {
    name: 'Joe Company',
    status: StockStatus.DOWN
  }]
}