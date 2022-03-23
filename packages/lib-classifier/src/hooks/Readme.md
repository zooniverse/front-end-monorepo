# Classifier hooks

## useHydratedStore

Create a `mobx-state-tree` store from an optional stored [snapshot](https://mobx-state-tree.js.org/concepts/snapshots). Adds an `onSnapshot` handler to keep the stored snapshot updated when the store changes.

Returns the new store when hydration is complete. Snapshots are stored in session storage, so that they don't persist across tabs or windows.

```js
const classifierStore = useHydratedStore({ authClient, client }, cachePanoptesData = false, storageKey)
```

## useWorkflowSnapshot

A wrapper for [`useSWR`](https://swr.vercel.app/), which fetches a workflow by ID, using the default SWR options. The workflow will refresh on visibility change (eg. waking from sleep), or when the classifier receives focus.

```js
const workflowSnapshot = useWorkflowSnapshot(workflowID)
```