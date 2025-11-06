# Store utilities

## ClassificationQueue

The `ClassificationQueue` class handles classification submissions to Panoptes for all browsers. New classifications are added to the queue when a volunteer presses 'Done' or 'Done & Talk'. Pending classifications are stored in local storage, and removed from the queue after a successful save to Panoptes (usually the first request.) The queue is flushed every time that a new classification is submitted.

422 responses for malformed classifications, that cannot be saved to Panoptes, are permanently dropped. All failed classifications should be logged to Sentry.

```js
const classificationQueue = new ClassificationQueue(store.client.panoptes, onClassificationSaved, store.authClient)

// Queue a new classification and POST to Panoptes.
classificationQueue.add(classification)

// Queue a new classification without saving to Panoptes.
classificationQueue.store(classification)

// Remove a classification from the queue.
// Classifications are identified by classification.id.
classificationQueue.remove(classification)

// Manually flush the pending queue.
classificationQueue.flushToBackend()
```

## convertMapToArray

Convert a Map to either a flat array of its values, or an array of `[key, value]` pairs if the `pairs` option is set.

```js
convertMapToArray(map).forEach(value => {
  console.log(value)
})

convertMapToArray(map, { pairs: true }).forEach(([key, value]) => {
  console.log(key, value)
})
```

## getBearerToken

Generate an Authorization header to send with authenticated Panoptes API requests.

```js
const authorization = getBearerToken(store.authClient)
```

## sessionUtils

Get the current session ID to include with classification metadata. Sessions are stored in browser session storage, so unique to individual tabs.

```js
const sessionID = sessionUtils.getSessionID()
```
