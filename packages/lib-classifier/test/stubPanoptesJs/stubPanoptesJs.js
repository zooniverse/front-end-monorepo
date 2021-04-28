
function createResponse (url, factories) {
  // Assuming url is in the format '/resource_type/resource_id'
  const endpoint = url.split('/')[1]
  const response = {}
  const mockResponse = factories[url] || factories[endpoint]
  response[endpoint] = mockResponse ? [].concat(mockResponse) : []
  return Promise.resolve({ body: response })
}

export default function stubPanoptesJs (factories) {
  return {
    panoptes: {
      get: (url) => createResponse(url, factories),
      post: (url) => createResponse(url, factories),
      put: (url) => createResponse(url, factories)
    }
  }
}
