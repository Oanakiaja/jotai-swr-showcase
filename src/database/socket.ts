import {EventEmitter} from 'eventemitter3'
import { IndexStatus } from './model'
import { useEffect } from 'react'


enum EventType {
  MessageUpdateStatus = 'MessageUpdateStatus'
}

const mockSocket = new EventEmitter()

const startMockSocket = ()=>{
  mockSocket.on(EventType.MessageUpdateStatus, (status)=>{
    console.log(status)
  })
  
  
  const id = setInterval(()=>{
    mockSocket.emit(EventType.MessageUpdateStatus,
       Math.random()<0.5? IndexStatus.DOWN : IndexStatus.UP)
  }, 1000)

  return ()=> clearInterval(id)
}

const useMockSocket = ()=>{
  useEffect(()=>{
    const clear = startMockSocket()
    return clear
  }, [])
}

export {useMockSocket}


