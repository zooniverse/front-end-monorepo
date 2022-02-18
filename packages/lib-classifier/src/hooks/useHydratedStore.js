import makeInspectable from 'mobx-devtools-mst'
import { addDisposer, destroy, onSnapshot } from 'mobx-state-tree'
import { useMemo } from 'react'

import RootStore from '@store'

let store = null
const storage = window.sessionStorage

function loadSnapshot(storageKey) {
  const data = storage.getItem(storageKey)
  return JSON.parse(data) || {}
}

function persist(storageKey, _store) {
  function _saveSnapshot(snapshot) {
    const data = JSON.stringify(snapshot)
    storage.setItem(storageKey, data)
  }
  const snapshotDisposer = onSnapshot(_store, _saveSnapshot)
  return addDisposer(_store, snapshotDisposer)
}

function initStore({ cachePanoptesData, storageKey, storeEnv }) {
  if (store === null) {
    let initialState = {}

    if (cachePanoptesData) {
      initialState = loadSnapshot(storageKey)
    }

    store = RootStore.create(initialState, storeEnv)

    if (cachePanoptesData) {
      persist(storageKey, store)
    }
    makeInspectable(store)
  }
  return store
}

export function cleanStore() {
  destroy(store)
  store = null
}

export default function useHydratedStore(storeEnv = {}, cachePanoptesData = false, storageKey) {
  const _store = useMemo(() => initStore({ cachePanoptesData, storageKey, storeEnv }), [cachePanoptesData, storageKey, storeEnv])
  return _store
}