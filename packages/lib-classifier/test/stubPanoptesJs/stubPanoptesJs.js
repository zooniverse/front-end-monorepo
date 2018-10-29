

export default function stubPanoptesJs(factories) {
  return { 
    panoptes: {
      get: function (url, query) {
        // Assuming url is in the format '/resource_type/resource_id'
        const endpoint = url.split('/')[1]
        const response = {}
        response[endpoint] = [factories[endpoint]]
        return Promise.resolve({ body: response })
      }
    }
  }
}

