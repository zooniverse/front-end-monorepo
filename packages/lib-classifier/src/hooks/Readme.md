# Classifier hooks

## useCaesarReductions

Get the stored Caesar reductions from the active subject, for a given reducer key.

```js
const { loaded, caesarReductions } = useCaesarReductions(reducerKey)
```

## useClientRect

Get the bounding client rectangle (`rect`) for a referenced DOM node (`ref`.)

```js
const [rect, ref] = useClientRect()
```

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

## useProjectPreferences

Get project preferences for a user and project, or null if there's no one logged in.
```js
  const upp = useProjectPreferences(project.id, user.id)
```

## useProjectRoles

Get the logged-in user's project roles, as an array of strings, or an empty array if no one is logged in.

```js
  const projectRoles = useProjectRoles(project.id, user.id)
```

## useStores
  
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

# useSubjectImage
  
A custom hook that fetches an image from a URL, with a ref to the image's DOM node for sizing etc.

Usage:
```jsx
// img is a DOM img. subjectImage is a React ref to the element that displays the image.
const { img, error, loading, subjectImage } = useSubjectImage({ src, onReady, onError })

if (loading) {
  return <p>The image is still loading.</p>
}
if (!loading && error) {
  return <p>{error.message}</p>
}
return <img ref={subjectImage} alt="This is an example of a subject image" src={img.src} />
```

## useTranscriptionReductions

A wrapper for `useCaesarReductions`, specific to the transcription task. Generates the props for the `TranscribedLines` component.

Usage:
```js
const {
  annotation,
  frame,
  invalidMark,
  lines,
  marks,
  task,
  visible,
  workflow
} = useTranscriptionReductions()
```

## useWorkflowSnapshot

A wrapper for [`useSWR`](https://swr.vercel.app/), which fetches a workflow by ID, using the default SWR options. The workflow will refresh on visibility change (eg. waking from sleep), or when the classifier receives focus.

```js
const workflowSnapshot = useWorkflowSnapshot(workflowID)
```