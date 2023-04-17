import { InfoType, IndexStatus, Stock } from './model'
import { Atom, atom, useAtom, useAtomValue } from 'jotai'
import { splitAtom,selectAtom,atomWithReducer } from 'jotai/utils'
import equal from 'fast-deep-equal'

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

export function useSplitAtomByIndex<T>(splitAtom: Atom<Atom<T>[]>, id:number){
  return  useAtomValue(useAtomValue(splitAtom)[id])
}

// atoms
export const basicAtom = atomWithDeepCompare<Pick<InfoType, 'name'|'locale'>| null>(null)
export const IndexStatusAtom = atom<InfoType['status']|null>(null)

export const stocksMetaAtomAtom = atom<Pick<Stock,'name'>[]>([])
export const stocksMetaAtom = splitAtom(stocksMetaAtomAtom)

export const stocksStatusAtomAtom =  atom<Pick<Stock,'status'>[]>([])
export const stocksStatusAtom = splitAtom(stocksStatusAtomAtom)