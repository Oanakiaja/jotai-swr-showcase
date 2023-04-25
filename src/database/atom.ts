import { Atom,  useAtom, useAtomValue } from 'jotai'
import { splitAtom,atomWithReducer } from 'jotai/utils'
import equal from 'fast-deep-equal'
import { useMemo } from 'react'

// utils 
export function atomWithDeepCompare<Value>(
  initialValue: Value,
) {
  return atomWithReducer(initialValue, (prev: Value, next: Value) => {
    if (equal(prev, next)) {
      return prev
    }
    return next
  })
}

export function useSplitAtom<T>(anAtom: Atom<T[]>) {
  return useAtom(splitAtom(anAtom))
}

export function useMemoAtomValue<T>(atom: Atom<T>) {
 const arr =  useAtomValue(atom)
 const memoArr = useMemo(()=>arr, [`${arr}`])
 return memoArr
}

export function useSplitAtomByIndex<T>(splitAtom: Atom<Atom<T>[]>, id:number){
  const atomList = useAtomValue(splitAtom)
  const targetAtom = atomList?.[id]
  if(!atomList?.[id]){
    return 
  }
  return useAtomValue(targetAtom)
}

