const asyncStates = [
  'initialised', // state on initial creation of the store
  'loading', // remote fetch in progress
  'success', // remote fetch successful
  'error' // remote fetch unsuccessful
]

export default asyncStates
