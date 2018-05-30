import projectFixture from '../fixtures/project'

const stubPanoptesJs = {
  get: function (url, query) {
    // Assuming url is in the format '/resource_type/resource_id'
    const endpoint = url.split('/')[1]

    const mockData = {
      projects: projectFixture
    }

    return Promise.resolve(mockData[endpoint])
  }
}

export default stubPanoptesJs
