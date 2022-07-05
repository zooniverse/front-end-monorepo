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

    try {
      store = RootStore.create(initialState, storeEnv)
    } catch (error) {
      console.error('Unable to hydrate store from session storage.')
      console.error(error)
      store = RootStore.create({}, storeEnv)
    }

    /*
    If the project uses session storage, we need to do some
    processing of the store after it loads.
    */
    if (cachePanoptesData) {
      if (!store.workflows.active?.prioritized) {
        /*
        In this case, we delete the saved queue so that
        refreshing the classifier will load a new, randomised
        subject queue.
        */
        console.log('randomising the subject queue.')
        store.subjects.reset()
        store.subjects.advance()
      }
      if (store.subjects.active) {
        /*
          This is a hack to start a new classification from a snapshot.
        */
        console.log('store hydrated with active subject', store.subjects.active.id)
        store.startClassification()
      }
      /*
        Save snapshots to storage whenever the store changes.
      */
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