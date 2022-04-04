import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

/**
  A custom hook which connects a component to the classifier store, or to a filtered list of store properties if a store  mapper function is provided.
*/
export default function useStores(
  /** optional function which should take a store and return an object containing filtered store properties. */
  storeMapper = store => store
) {
  const { classifierStore } = useContext(MobXProviderContext)
  return storeMapper(classifierStore)
}
