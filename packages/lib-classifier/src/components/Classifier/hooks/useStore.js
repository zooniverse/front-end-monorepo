import makeInspectable from 'mobx-devtools-mst'
import { useMemo } from 'react'

import RootStore from '@store'

let store

function initStore({ authClient, client, initialState }) {
  if (!store) {
    store = RootStore.create(initialState, {
      authClient,
      client
    })
    makeInspectable(store)
  }
  return store
}
/**
  useStore hook adapted from
  https://github.com/vercel/next.js/blob/5201cdbaeaa72b54badc8f929ddc73c09f414dc4/examples/with-mobx-state-tree/store.js#L49-L52
*/
export default function useStore({ authClient, client, initialState }) {
  const _store = useMemo(() => initStore({ authClient, client, initialState }), [authClient, initialState])
  return _store
}