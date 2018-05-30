import workflowsFixture from '../fixtures/workflows'
import subjectsFixture from '../fixtures/subjects'

const stubPanoptesJs = {
  get: function (url, query) {
    // Assuming url is in the format '/resource_type/resource_id'
    const endpoint = url.split('/')[1]

    const mockData = {
      workflows: workflowsFixture,
      subjects: subjectsFixture
    }

    return Promise.resolve(mockData[endpoint])
  }
}

export default stubPanoptesJs
