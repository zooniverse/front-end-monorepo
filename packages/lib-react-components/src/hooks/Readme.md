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
## usePanoptesUser

Exchange a Panoptes session cookie for the logged-in user, using [`useSWR`](https://swr.vercel.app/docs/api).

```js
const { data: user, error, isLoading } = usePanoptesUser()
```
## useProgressiveImage

Use a placeholder while an image downloads.

```jsx
const src = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
const { img, error, loading } = useProgressiveImage({ delay: 0, src })

return <img src={img.src} alt='This is an example of an image with a placeholder.'/>
```
## useUnreadMessages

Fetch unread messages for a Zooniverse account, using [`useSWR`](https://swr.vercel.app/docs/api).

```js
const { data: user } = usePanoptesUser()
const { data, error, isLoading }= useUnreadMessages(user)

return `You have ${data} unread messages.`
````

## useUnreadNotifications

Fetch the notification count for a Zooniverse account, using [`useSWR`](https://swr.vercel.app/docs/api).

```js
const { data: user } = usePanoptesUser()
const { data, error, isLoading }= useUnreadNotifications(user)

return `You have ${data} notifications.`
```
