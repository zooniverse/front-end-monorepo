# Classifier hooks

## useHydratedStore

Hydrate a `mobx-state-tree` store from a stored [snapshot](https://mobx-state-tree.js.org/concepts/snapshots). Wraps the store in [`mst-persist`](https://github.com/agilgur5/mst-persist), which runs `applySnapshot(store, snapshot)` to hydrate the store, and adds an `onSnapshot` handler to keep the stored snapshot updated when the store changes.

Runs asynchronously and returns `true` when hydration is complete. Snapshots are stored in session storage, so that they don't persist across tabs or windows.

```js
const loaded = useHydratedStore(store, enableStorage = false, storageKey)
```

## useStore

Create a `mobx-state-tree` store, using the Panoptes API clients and an optional snapshot. Adapted from [the NextJS example](https://github.com/vercel/next.js/blob/5201cdbaeaa72b54badc8f929ddc73c09f414dc4/examples/with-mobx-state-tree/store.js#L49-L52), which is also used in `app-project`. `initialState` must be a valid store snapshot.

```js
  const classifierStore = useStore({ authClient, client, initialState })
````
## useWorkflowSnapshot

A wrapper for [`useSWR`](https://swr.vercel.app/), which fetches a workflow by ID, using the default SWR options. The workflow will refresh on visibility change (eg. waking from sleep), or when the classifier receives focus.

```js
const workflowSnapshot = useWorkflowSnapshot(workflowID)
```