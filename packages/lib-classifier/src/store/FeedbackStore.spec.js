import sinon from 'sinon'

import FeedbackStore from './FeedbackStore'
import strategies from './feedback/strategies'

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
    strategies.testStrategy = {
      reducer: sinon.stub().callsFake(rule => rule)
    }
    feedback = FeedbackStore.create(feedbackStub)
  })

  it('should exist', function () {
    expect(FeedbackStore).to.exist
    expect(FeedbackStore).to.be.an('object')
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
