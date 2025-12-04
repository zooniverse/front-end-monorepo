// Borrowed from https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser top answer
// Testing if in browser or node environments

export const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')

export const isNode = new Function('try {return this===global;}catch(e){return false;}')

// For response mocks
export function buildResponse (httpMethod, resourceType, resources, linked, params) {
  const response = { links: {}, meta: {} }

  if (linked) {
    response.linked = linked
  }

  if (httpMethod === 'put' && params) {
    response[resourceType] = [Object.assign({}, resources[0], params)]
    return response
  }

  response[resourceType] = resources
  return response
}

export function raiseError (errorMessage, errorClass) {
  const error = {
    error: new Error(errorMessage),
    typeError: new TypeError(errorMessage)
  }

  if (console && process.env.NODE_ENV !== 'test') console.error(error[errorClass])

  return Promise.reject(error[errorClass])
}

export function isParamTypeInvalid (param, type) {
  if (param) return (typeof param !== type)

  return false
}
