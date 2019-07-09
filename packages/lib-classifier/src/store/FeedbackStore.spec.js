import sinon from 'sinon'

import FeedbackStore from './FeedbackStore'
import strategies from './feedback/strategies'
import helpers from './feedback/helpers'

describe('Model > FeedbackStore', function () {
  let feedback
  let feedbackStub

  before(function () {
    sinon.stub(helpers, 'isFeedbackActive').callsFake(() => feedbackStub.isActive)
    sinon.stub(helpers, 'generateRules').callsFake(() => feedbackStub.rules)
    strategies.testStrategy = {
      reducer: sinon.stub().callsFake(rule => rule)
    }
  })

  beforeEach(function () {
    feedbackStub = {
      isActive: true,
      rules: {
        T0: [
          {
            id: 'testRule1-1',
            hideSubjectViewer: false,
            answer: '0',
            strategy: 'testStrategy',
            success: true,
            successEnabled: true,
            successMessage: 'Yay! 1-1',
            failureEnabled: true,
            failureMessage: 'No!'
          },
          {
            id: 'testRule1-2',
            hideSubjectViewer: false,
            answer: '1',
            strategy: 'testStrategy',
            success: false,
            successEnabled: true,
            successMessage: 'Yay! 1-2',
            failureEnabled: false
          }
        ],
        T1: [{
          id: 'testRule2-1',
          hideSubjectViewer: true,
          answer: '0',
          strategy: 'testStrategy',
          success: false,
          successEnabled: true,
          successMessage: 'Yippee!',
          failureEnabled: true,
          failureMessage: 'Nope!'
        }]
      },
      showModal: false
    }
    feedback = FeedbackStore.create(feedbackStub)
  })

  it('should exist', function () {
    expect(FeedbackStore).to.be.ok()
    expect(FeedbackStore).to.be.an('object')
  })

  describe('createRules', function () {
    const project = {
      id: '1'
    }
    const workflow = {
      id: '2'
    }
    const subject = {
      id: '3'
    }

    beforeEach(function () {
      feedback.projects = {
        active: project
      }
      feedback.workflows = {
        active: workflow
      }
      feedback.createRules(subject)
    })

    afterEach(function () {
      helpers.isFeedbackActive.resetHistory()
      helpers.generateRules.resetHistory()
    })

    it('should set active state', function () {
      expect(helpers.isFeedbackActive).to.have.been.calledOnceWith(project, subject, workflow)
    })

    it('should generate rules', function () {
      expect(helpers.generateRules).to.have.been.calledOnceWith(subject, workflow)
    })
  })

  describe('update', function () {
    beforeEach(function () {
      const annotation = { task: 'T1', value: 0 }
      feedback.update(annotation)
    })

    it('should reduce the rule and value', function () {
      const [ rule ] = feedback.rules.get('T1')
      expect(strategies.testStrategy.reducer).to.have.been.calledOnceWith(rule, 0)
    })
  })

  describe('reset', function () {
    beforeEach(function () {
      feedback.subjects = {
        advance: sinon.stub()
      }
      feedback.reset()
    })

    it('should reset active state', function () {
      expect(feedback.isActive).to.be.false()
    })

    it('should reset feedback rules', function () {
      expect(feedback.rules.toJSON()).to.be.empty()
    })

    it('should reset showModal state', function () {
      expect(feedback.showModal).to.be.false()
    })

    it('should set the onHide callback', function () {
      expect(feedback.onHide).to.equal(feedback.subjects.advance)
    })
  })

  describe('showFeedback', function () {
    it('should set showModal state to true', function () {
      feedback.showFeedback()
      expect(feedback.showModal).to.be.true()
    })
  })

  describe('hideFeedback', function () {
    beforeEach(function () {
      feedback.setOnHide(sinon.stub())
      feedback.hideFeedback()
    })

    it('should set showModal state to false', function () {
      expect(feedback.showModal).to.be.false()
    })

    it('should call the onHide callback', function () {
      expect(feedback.onHide).to.have.been.calledOnce()
    })
  })

  describe('applicableRules', function () {
    it('should return an array of applicable rules', function () {
      expect(feedback.applicableRules.length).to.equal(2)
      expect(feedback.applicableRules.some(rule => rule.id === 'testRule1-1')).to.equal(true)
      expect(feedback.applicableRules.some(rule => rule.id === 'testRule2-1')).to.equal(true)
    })
  })

  describe('hideSubjectViewer', function () {
    it('should return true if any rule hides subject viewer', function () {
      expect(feedback.hideSubjectViewer).to.equal(true)
    })

    it('should return false if no rule hides subject viewer', function () {
      const [ rule ] = feedback.rules.get('T1')
      rule.hideSubjectViewer = false
      expect(feedback.hideSubjectViewer).to.equal(false)
    })
  })

  describe('messages', function () {
    it('should return an array of feedback messages', function () {
      expect(feedback.messages).to.eql(['Yay! 1-1', 'Nope!'])
    })
  })

  describe('when the subject queue advances', function () {
    const call = {
      name: 'advance',
      args: []
    }
    const next = sinon.stub()
    const abort = sinon.stub()

    describe('when feedback is inactive', function () {
      beforeEach(function () {
        feedback = FeedbackStore.create({ isActive: false })
        feedback.onSubjectAdvance(call, next, abort)
      })

      it('should continue the action', function () {
        expect(next.withArgs(call)).to.have.been.calledOnce()
      })
    })

    describe('when feedback is active', function () {
      beforeEach(function () {
        feedback = FeedbackStore.create(feedbackStub)
        feedback.onSubjectAdvance(call, next, abort)
      })

      it('should abort the action', function () {
        expect(abort).to.have.been.calledOnce()
      })

      it('should show feedback', function () {
        expect(feedback.showModal).to.be.true()
      })
    })
  })
})
