// Borrowed from https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser top answer
// Testing if in browser or node environments

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')

const isNode = new Function('try {return this===global;}catch(e){return false;}')

// For response mocks
function buildResponse(httpMethod, resourceType, resources, linked, params) {
  const response = { links: {}, meta: {} }

  if (linked) {
    response.linked = linked
  }

  if (httpMethod === 'put' && params) {
    return {
      links: {},
      meta: {},
      projects: [Object.assign({}, resources[0], params)]
    }
  }

  return {
    links: {},
    meta: {},
    [resourceType]: resources
  }
}

module.exports = { isBrowser, isNode, buildResponse }
