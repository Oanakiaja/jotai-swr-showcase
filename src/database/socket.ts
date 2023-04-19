import {EventEmitter} from 'eventemitter3'
import { getIndexStatus } from './polling'

export enum EventType {
  MessageUpdateStatus = 'MessageUpdateStatus'
}
 
let mockSocket: null | EventEmitter = new EventEmitter() 
export const startMockSocket = ()=>{
  const id = setInterval(()=>{
    mockSocket?.emit(EventType.MessageUpdateStatus, getIndexStatus())
  }, 1000)

  const clear = ()=> {
    clearInterval(id)
    mockSocket = null
  }

  return {socket: mockSocket, clear}
}

