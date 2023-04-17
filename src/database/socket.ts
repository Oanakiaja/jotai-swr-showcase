import {EventEmitter} from 'eventemitter3'
import { getIndexStatus } from './polling'
import useSWRSubscription from 'swr/subscription'
import { IndexStatus } from './model'

enum EventType {
  MessageUpdateStatus = 'MessageUpdateStatus'
}
 
const mockSocket = new EventEmitter() 
const startMockSocket = ()=>{
  const id = setInterval(()=>{
    mockSocket.emit(EventType.MessageUpdateStatus, getIndexStatus())
  }, 1000)

  return ()=> clearInterval(id)
}


const useMockSocket = ()=>{
  const { data, error } = useSWRSubscription<IndexStatus>('wss://IndexMessageUrl', 
  (_: string, 
  { next }: {next:  (error: unknown, data: IndexStatus)=> void}) => {
    const clear = startMockSocket()
    mockSocket.on(EventType.MessageUpdateStatus, (status: IndexStatus)=>{
      next(null, status)
    })
    return clear
  })
  return { data, error}
}

export { useMockSocket }


