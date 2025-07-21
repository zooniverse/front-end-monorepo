# Zooniverse React hooks

## useHasMounted

When a component needs to be deferred until client-side rendering. See [https://www.joshwcomeau.com/react/the-perils-of-rehydration/](https://www.joshwcomeau.com/react/the-perils-of-rehydration) for a detailed mental model.

```js
const hasMounted = useHasMounted()

return (
  <>
  {hasMounted && <LazyLoadedComponent />}
  </>
)
```

## useJSONData

Fetch the raw JSON data and MobX State Tree data type for a Panoptes JSON subject.

```js
const url = 'https://panoptes-uploads.zooniverse.org/subject_location/74fddc9b-790d-47c6-9eac-110c64022ea8.json'
const { loading, data, type, error } = useJSONData(url)

if (loading) {
  return null
}

if (error) {
  return `There was an error. ${error.message}.`
}

if (data) {
  console.log('Subject type', type)
  console.log('Raw data', data)
}
```

## usePanoptesAuthToken

Get the Panoptes authentication bearer token after current session and refresh token.
Helpful for use in a SWR cache key, as it will invalidate the cache when authentication state changes.

```js
const token = usePanoptesAuthToken()
```

## usePanoptesUser

Exchange a Panoptes session cookie for the logged-in user, using [`useSWR`](https://swr.vercel.app/docs/api).

```js
const { data: user, error, isLoading } = usePanoptesUser()
```

## useProgressiveImage

Use a placeholder while an image downloads.

```jsx
function onLoad(event) {
  console.log('image loaded: ', event.target)
}

function onError(error) {
  console.warn('loading failed')
  console.error(error)
}

const src = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
const { img, error, loading } = useProgressiveImage({ delay: 0, src, onLoad, onError })

return <img src={img.src} alt='This is an example of an image with a placeholder.'/>
```

## useUnreadMessages

Fetch unread messages for a Zooniverse account, using [`useSWR`](https://swr.vercel.app/docs/api).

```js
const { data: user } = usePanoptesUser()
const { data, error, isLoading } = useUnreadMessages(user)

return `You have ${data} unread messages.`
```

## useUnreadNotifications

Fetch the notification count for a Zooniverse account, using [`useSWR`](https://swr.vercel.app/docs/api).

```js
const { data: user } = usePanoptesUser()
const { data, error, isLoading } = useUnreadNotifications(user)

return `You have ${data} notifications.`
```

## useUserCollections

Fetch collections for a Zooniverse account, using [`useSWR`](https://swr.vercel.app/docs/api).
The following example query fetches a user's favorite collections for a specific project.
See the [Panoptes API documentation](https://zooniverse.github.io/panoptes/#collections) for more query options.

```js
const query = {
  favorite: true,
  project_ids: ['1234'],
  owner: 'user_login'
}
const { data, error, isLoading } = useUserCollections({ query })
```
