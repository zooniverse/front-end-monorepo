import WorkflowModel from './Workflow'
import workflowsFixture from '../../test/fixtures/workflows'

const fixture = workflowsFixture.body.workflows[0]

describe('WorkflowModel model', function () {
  let workflow

  before(function () {
    workflow = WorkflowModel.create(fixture)
  })

  describe('model properties', function () {
    it('should have an id', function () {
      workflow.id.should.equal(fixture.id)
    })
  })
})
