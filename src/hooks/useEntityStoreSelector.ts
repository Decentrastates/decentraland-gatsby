import { useState, useEffect, useMemo } from 'react'
import EntityStore, { EntityStoreState } from '../utils/EntityStore'

export type Selector<E extends object, R> = (store: EntityStoreState<E>) => R

const defaultSelector = (state: EntityStoreState<any>) => state as any

/**
 * @deprecated
 * @param store
 * @param selector
 * @returns
 */
export default function useEntityStoreSelector<E extends object, R>(
  store: EntityStore<E>,
  selector: (store: EntityStoreState<E>) => R = defaultSelector
) {
  const [state, setState] = useState(store.getState())
  const result = useMemo(() => selector(state), [state, selector])

  useEffect(() => {
    function handleChange(newState: EntityStoreState<E>) {
      if (state !== newState) {
        setState(newState)
      }
    }

    store.addEventListener('change', handleChange)
    return function removeStoreListener() {
      store.removeEventListener('change', handleChange)
    }
  }, [])

  return result
}
