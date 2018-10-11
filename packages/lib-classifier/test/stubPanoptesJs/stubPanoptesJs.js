import WorkflowFactory from 'test/factories/WorkflowFactory'
import SubjectFactory from 'test/factories/SubjectFactory'

const stubPanoptesJs = {
  get: function (url, query) {
    // Assuming url is in the format '/resource_type/resource_id'
    const endpoint = url.split('/')[1]

    const mockData = {
      workflows: { body: WorkflowFactory.build({ id: '12345' }) },
      subjects: { body: { subjects: [SubjectFactory.build(), SubjectFactory.build()] }}
    }

    return Promise.resolve(mockData[endpoint])
  }
}

export default stubPanoptesJs
