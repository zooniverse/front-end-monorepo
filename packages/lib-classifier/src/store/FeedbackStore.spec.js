import FeedbackStore from './FeedbackStore'
// import { ProjectFactory, SubjectFactory, WorkflowFactory, SingleChoiceTaskFactory } from '../../test/factories'

describe('Model > FeedbackStore', function () {
  it('should exist', function () {
    expect(FeedbackStore).to.exist
    expect(FeedbackStore).to.be.an('object')
  })

  describe('when a workflow task includes feedback', function () {
    xit('should set feedback as active', function () {})
    xit('should set the initial feedback rules', function () {})
    xit('should update feedback as annotations are added', function () {})
    xit('should update feedback as annotations are removed', function () {})
  })

  xit('should reset with a new subject', function () {})
})
