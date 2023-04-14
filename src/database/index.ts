export enum ImageStatus {
  READY,
  FAILED
}
export enum TaskStatus {
  STOP,
  RUNNING
}

export type InfoType = {
  name: string,
  id: string,
  status: TaskStatus,
  images: { url: string, name: string, status: ImageStatus }[]
}

const info: InfoType = {
  name: 'task',
  id: '9901',
  status: TaskStatus.STOP,
  images: [{
    url: '1',
    name: 'picture 1',
    status: ImageStatus.READY
  }, {
    url: '2',
    name: 'picture 2',
    status: ImageStatus.FAILED
  }]
}

const mockFetchCreator = (timeout: number) => async () => {
  console.log('fetch')
  const res = await new Promise((res) => {
    setTimeout(() => {
      res({
        ...info,
        status: Math.random() < 0.5 ? TaskStatus.RUNNING : TaskStatus.STOP,
        images: info.images.map(v => ({
          ...v,
          status: Math.random() < 0.5 ? ImageStatus.READY : ImageStatus.FAILED
        }))
      })
    }, timeout)
  }) as InfoType
  return res
}

export const mockFetch500ms = mockFetchCreator(500)

