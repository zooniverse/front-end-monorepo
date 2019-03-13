import sinon from 'sinon'

import FeedbackStore from './FeedbackStore'
import strategies from './feedback/strategies'
import helpers from './feedback/helpers'
console.log(helpers)

describe('Model > FeedbackStore', function () {
  let feedback
  let feedbackStub

  before(function () {
    feedbackStub = {
      isActive: true,
      rules: {
        T0: [{
          id: 'testRule',
          answer: '0',
          strategy: "testStrategy",
          successEnabled: true,
          successMessage: 'Yay!',
          failureEnabled: true,
          failureMessage: 'No!'
        }]
      }
    }
    sinon.stub(helpers, 'isFeedbackActive').callsFake(() => feedbackStub.isActive)
    sinon.stub(helpers, 'generateRules').callsFake(() => feedbackStub.rules)
    strategies.testStrategy = {
      reducer: sinon.stub().callsFake(rule => rule)
    }
    feedback = FeedbackStore.create(feedbackStub)
  })

  it('should exist', function () {
    expect(FeedbackStore).to.exist
    expect(FeedbackStore).to.be.an('object')
  })

  describe('createFeedbackRules', function () {
    const project = {
      id: '1'
    }
    const workflow = {
      id: '2'
    }
    const subject = {
      id: '3'
    }

    before(function () {
      feedback.projects = {
        active: project
      }
      feedback.workflows = {
        active: workflow
      }
      feedback.createFeedbackRules(subject)
    })

    it('should set active state', function () {
      expect(helpers.isFeedbackActive).to.have.been.calledOnceWith(project, subject, workflow)
    })

    it('should generate rules', function () {
      expect(helpers.generateRules).to.have.been.calledOnceWith(subject, workflow)
    })
  })

  describe('update', function () {
    before(function () {
      const annotation = { task: 'T0', value: 0 }
      feedback.update(annotation)
    })

    it('should reduce the rule and value', function () {
      const [ rule ] = feedback.rules.get('T0')
      expect(strategies.testStrategy.reducer).to.have.been.calledOnceWith(rule, 0)
    })
  })

  describe('reset', function () {
    before(function () {
      feedback.reset()
    })

    it('should reset active state', function () {
      expect(feedback.isActive).to.be.false
    })

    it('should reset feedback rules', function () {
      expect(feedback.rules).to.be.empty
    })
  })
})
