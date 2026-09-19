# Helpers for Settings Page

## How To: fetching and updating user data

In practice, we're only fetching the user data once using SWR, and then trusting the local data that we edit.

- After we fetch user data via useUserData(), we rely on the SWR to automatically revalidate (usually when user re-focuses on the page or their network reconnects).
- We are NOT syncing local data with any 
  - Basically when we successfully use updateUserData() to save changes to Panoptes, we're ignoring what the update user resource that the server responds with.
  - Unless the server responds with an error, in which case we definitely have an issue.

## useUserData()

Hook for _fetching_ Panoptes user data.

```
// Example
const { data: user, isLoading, isValidating, error, mutate } = useUserData({ login: 'zootester1' })
```

The **mutate** function is used to modify the _local copy_ of the user data (_without_ saving the changes to Panoptes).

```
// Example
mutate({ ...user, ['display_name']: 'Zootester 1X' })

// Alternatively,
mutate(prevData => ({ ...prevData, ['display_name']: 'Zootester 1X' }))
```

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
```

### Dev Notes

For future work, consider using [`useSWRMutation()`](https://swr.vercel.app/docs/mutation#useswrmutation) if we really, really want to sync our local data to whatever Panoptes responds with.
