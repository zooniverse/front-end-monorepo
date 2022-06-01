# Classifier hooks

## useHydratedStore

Create a `mobx-state-tree` store from an optional stored [snapshot](https://mobx-state-tree.js.org/concepts/snapshots). Adds an `onSnapshot` handler to keep the stored snapshot updated when the store changes.

Returns the new store when hydration is complete. Snapshots are stored in session storage, so that they don't persist across tabs or windows.

```js
const classifierStore = useHydratedStore({ authClient, client }, cachePanoptesData = false, storageKey)
```
## usePanoptesAuth

Asynchronously fetch an auth token, for a given user ID. A wrapper for `authClient.checkBearerToken()`.

```js
  const authorization = usePanoptesAuth(user.id)
```

## usePanoptesTranslations

A wrapper for [`useSWR`](https://swr.vercel.app/), which fetches resource translations, using the default SWR options. The translations will refresh on visibility change (eg. waking from sleep), or when the classifier receives focus.

```js
const translations = usePanoptesTranslations({ translated_id, translated_type, language })
```

## usePanoptesUser

Get the logged-in user, or null if no one is logged in.

```js
  const user = usePanoptesUser()
```

## useProjectRoles

Get the logged-in user's project roles, as an array of strings, or an empty array if no one is logged in.

```js
  const projectRoles = useProjectRoles(project.id, user.id)
```

# useStores
  
A custom hook which connects a component to the classifier store, or to a filtered list of store properties if a store  mapper function is provided.

Usage:
```js
function storeMapper(store) {
  const { workflows } = store
  return { workflows }
}

function MyConnectedComponent(props) {
  const { workflows } = useStores(storeMapper)
}
```

## useWorkflowSnapshot

A wrapper for [`useSWR`](https://swr.vercel.app/), which fetches a workflow by ID, using the default SWR options. The workflow will refresh on visibility change (eg. waking from sleep), or when the classifier receives focus.

```js
const workflowSnapshot = useWorkflowSnapshot(workflowID)
```