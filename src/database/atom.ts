import { InfoType, IndexStatus } from './model'
import { Atom, atom, useAtom } from 'jotai'
import { splitAtom,selectAtom,atomWithReducer } from 'jotai/utils'


// utils 

export function atomWithCompare<Value>(
  initialValue: Value,
  areEqual: (prev: Value, next: Value) => boolean
) {
  return atomWithReducer(initialValue, (prev: Value, next: Value) => {
    if (areEqual(prev, next)) {
      return prev
    }

    return next
  })
}

export function useSplitAtom<T>(anAtom: Atom<T[]>) {
  return useAtom(splitAtom(anAtom))
}

// atoms
export const infoAtom = atom<InfoType | null>(null)
// export const basicAtom = selectAtom(infoAtom, (s)=>({id: s?.id, name: s?.name}))
export const localeAtom = selectAtom(infoAtom, (s)=>(s?.locale))
export const nameAtom = selectAtom(infoAtom, (s)=>(s?.name))

export const IndexStatusAtom = atom((get) => {
  const info = get(infoAtom)
  return  info?.status ?? IndexStatus.DOWN
})

export const stocksAtomAtom = atom((get) => {
  const info = get(infoAtom)
  return info?.stocks ?? []
})

export const stocksAtom = splitAtom(stocksAtomAtom)
