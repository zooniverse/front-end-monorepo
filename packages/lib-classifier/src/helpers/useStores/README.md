# useStores
  
A custom hook which connects a component to the classifier store, or to a filtered list of store properties if a store  mapper function is provided.

Usage:
```js
import { useStores } from '@helpers'

function storeMapper(store) {
  const { workflows } = store
  return { workflows }
}

function MyConnectedComponent(props) {
  const { workflows } = useStores(storeMapper)
}
```