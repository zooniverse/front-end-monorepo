# Helpers for Settings Page

## How To: fetching and updating user data

TL;DR:

- Use useUserData() to fetch user data.
- Use mutate() to make local changes (e.g. on text input, when user inputs a new display name). Remember to set `options.revalidate=false`.
- Use updateUserData() INSIDE mutate() to save changes to _Panoptes._ and then force revalidation (`options.revalidate=true`) to make sure server changes are legit.
- Keep an eye on when SWR automatically revalidates (i.e. on network reconnect) because this will usually _undo any unsaved local changes._

## useUserData()

Hook for _fetching_ Panoptes user data.

```
// Example
const { data: user, isLoading, isValidating, error, mutate } = useUserData({ login: 'zootester1' })
```

The **mutate** function is used to modify the _local copy_ of the user data (_without_ explicitly saving the changes to Panoptes).

```
// Example
mutate({ ...user, ['display_name']: 'Zootester 1X' })

// Alternatively,
mutate(prevData => ({ ...prevData, ['display_name']: 'Zootester 1X' }))
```

Regarding SWR:

- useUserData() uses SWR to ensure the data is fresh by periodically checking in with Panoptes.
  - In practice this just mostly means it automatically checks when their network reconnects after a disconnect.
  - We also _manually_ trigger a revalidate when we do a mutate() + updateUserData() combo to save data to Panoptes.
  - We do NOT automatically revalidate when the window (re-)gains focus, because it will reset any local changes/changes not saved to Panoptes caused by mutate(). And boy, this is a very annoying experience if you're, say, tabbing into another window to check some details.

### Dev Notes

Why yes, we do actually have the full User resource already, passed in via authUser, but we treat that as a read-only object and we're only interested in its `login` value.

## updateUserData()

Function for _saving_ changes to Panoptes.

- Performs a GET to Panoptes (to get some validation data for the header), then a PUT with the new data.
- ⚠️ WARNING: unlike useUserData, there's no built-in "isLoading" equivalent so you'll need to manually keep track of the processing/saving state.

```
// Example
try {
  const updatedUser = await updateUserData({ display_name: 'Zootester 1X'}, '12345678')
} catch (err) {}

// Alternatively,
mutate(prevData => { 
  try {
    const unusedUpdatedUser = await updateUserData({ display_name: 'Zootester 1X'}, '12345678')
  } catch (err) {}
  return prevData
}, {
  // Send another GET to Panoptes to make sure local data matches server data.
  revalidate: true,
}) 
```

### Dev Notes

For future work, consider using [`useSWRMutation()`](https://swr.vercel.app/docs/mutation#useswrmutation) if we really, really want to sync our local data to whatever Panoptes responds with.
