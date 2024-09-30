/*
Experimental Auth Client
Based on PJC: https://github.com/zooniverse/panoptes-javascript-client/blob/8157794/lib/auth.js
 */

const globalStore = {}

async function checkCurrent (_store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: checkCurrent()')

  return Promise.resolve(undefined)  // TODO: not sure if this is what should be returned by oh well
}

function listen (signal, callback, _store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: listen()')
}

function stopListening (signal, callback, _store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: stopListening()')
}

export {
  checkCurrent,
  listen,
  stopListening,
}