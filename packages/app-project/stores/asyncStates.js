const asyncStates = {}

// state on initial creation of the store
Object.defineProperty(asyncStates, 'initialized', {
  value: 'initialized',
  enumerable: true
})

// remote fetch in progress
Object.defineProperty(asyncStates, 'loading', {
  value: 'loading',
  enumerable: true
})

// remote fetch successful
Object.defineProperty(asyncStates, 'success', {
  value: 'success',
  enumerable: true
})

// remote fetch unsuccessful
Object.defineProperty(asyncStates, 'error', {
  value: 'error',
  enumerable: true
})

// helper for returning states (e.g. for use in MST enumerable type)
Object.defineProperty(asyncStates, 'values', {
  value: Object.values(asyncStates)
})

export default asyncStates
