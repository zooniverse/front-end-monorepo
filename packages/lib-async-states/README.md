# `@zooniverse/async-states`

Provides a handy immutable object for describing the state of an asynchronous request.

Available states are:

- `initialized`
- `loading`
- `success`
- `error`

## Usage

Use the `asyncStates` object to provide the strings to describe the state of your request, rather than defining them locally. For example:

```js
import asyncStates from '@zooniverse/async-states'

let requestState = asyncStates.initialized

function asyncRequest () {
  requestState = asyncStates.loading
  fetchSomething()
    .then(() => requestState.success)
    .catch(() => requestState.error)
}
```
