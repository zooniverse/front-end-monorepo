import sinon from 'sinon'
import FeedbackStore from './FeedbackStore'
import ProjectStore from './ProjectStore'
import WorkflowStore from './WorkflowStore'
import SubjectStore from './SubjectStore'
import strategies from './feedback/strategies'
import helpers from './feedback/helpers'
import {
  FeedbackFactory,
  ProjectFactory,
  WorkflowFactory
} from '../../test/factories'
import { Factory } from 'rosie'

const rulesStub = {
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
}

const workflow = WorkflowFactory.build()
const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
const subject = Factory.build('subject')
subject.shouldDiscuss = undefined

describe('Model > FeedbackStore', function () {
  before(function () {
    sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
    sinon.stub(helpers, 'generateRules').callsFake(() => rulesStub)
    strategies.testStrategy = {
      reducer: sinon.stub().callsFake(rule => rule)
    }
  })

  after(function () {
    helpers.isFeedbackActive.restore()
    helpers.generateRules.restore()
  })

  describe('existance', function () {
    it('should exist', function () {
      expect(FeedbackStore).to.be.ok()
      expect(FeedbackStore).to.be.an('object')
    })
  })

  describe('Actions > createRules', function () {
    let feedback, feedbackStub
    before(function () {
      feedbackStub = FeedbackFactory.build()
      feedback = FeedbackStore.create(feedbackStub)
      feedback.projects = ProjectStore.create()
      feedback.workflows = WorkflowStore.create()
      feedback.subjects = SubjectStore.create()
    })

    beforeEach(function () {
      feedback.projects.setResource(project)
      feedback.projects.setActive(project.id)
      feedback.workflows.setResource(workflow)
      feedback.workflows.setActive(workflow.id)
    })

    afterEach(function () {
      feedback.reset()
      helpers.isFeedbackActive.resetHistory()
      helpers.generateRules.resetHistory()
    })

    it('should set active state', function () {
      feedback.subjects.setResource(subject)
      feedback.subjects.setActive(subject.id)
      expect(feedback.isActive).to.be.false()
      feedback.createRules(subject)
      const projectRef = feedback.projects.active
      const workflowRef = feedback.workflows.active
      const subjectRef = feedback.subjects.active.toJSON()
      expect(helpers.isFeedbackActive.withArgs(projectRef, subjectRef, workflowRef)).to.have.been.calledOnce()
      expect(feedback.isActive).to.equal(helpers.isFeedbackActive.returnValues[0])
      expect(feedback.isActive).to.be.true()
    })

    it('should generate rules', function () {
      expect(feedback.rules.toJSON()).to.be.empty()
      feedback.createRules(subject)
      expect(helpers.generateRules.withArgs(subject, workflow)).to.have.been.calledOnce()
      expect(feedback.rules.toJSON()).to.deep.equal(rulesStub)
    })
  })

  describe('Actions > update', function () {
    let feedback, feedbackStub
    describe('when feedback is active', function () {
      before(function () {
        feedbackStub = FeedbackFactory.build({ isActive: true, rules: rulesStub })
        feedback = FeedbackStore.create(feedbackStub)
        feedback.projects = ProjectStore.create()
        feedback.workflows = WorkflowStore.create()
        feedback.subjects = SubjectStore.create()
      })

      beforeEach(function () {
        feedback.projects.setResource(project)
        feedback.projects.setActive(project.id)
        feedback.workflows.setResource(workflow)
        feedback.workflows.setActive(workflow.id)
        const annotation = { task: 'T1', value: 0 }
        feedback.update(annotation)
      })

      after(function () {
        strategies.testStrategy.reducer.resetHistory()
      })

      it('should reduce the rule and value', function () {
        const [rule] = feedback.rules.get('T1')
        expect(strategies.testStrategy.reducer).to.have.been.calledOnceWith(rule, 0)
      })
    })

    describe('when feedback is not active', function () {
      before(function () {
        feedbackStub = FeedbackFactory.build({ isActive: false, rules: {} })
        feedback = FeedbackStore.create(feedbackStub)
        feedback.projects = ProjectStore.create()
        feedback.workflows = WorkflowStore.create()
        feedback.subjects = SubjectStore.create()
      })

      beforeEach(function () {
        feedback.projects.setResource(project)
        feedback.projects.setActive(project.id)
        feedback.workflows.setResource(workflow)
        feedback.workflows.setActive(workflow.id)
        const annotation = { task: 'T1', value: 0 }
        feedback.update(annotation)
      })

      after(function () {
        strategies.testStrategy.reducer.resetHistory()
      })

      it('should not reduce the rule and value', function () {
        expect(strategies.testStrategy.reducer).to.have.not.been.called()
      })
    })
  })

  describe('Actions > reset', function () {
    let feedback, feedbackStub
    beforeEach(function () {
      feedbackStub = FeedbackFactory.build({ isActive: true, rules: rulesStub, showModal: true })
      feedback = FeedbackStore.create(feedbackStub)
      feedback.subjects = SubjectStore.create()
      sinon.stub(feedback.subjects, 'advance').callsFake(() => { })
    })

    it('should reset active state', function () {
      expect(feedback.isActive).to.be.true()
      feedback.reset()
      expect(feedback.isActive).to.be.false()
    })

    it('should reset feedback rules', function () {
      expect(feedback.rules.toJSON()).to.deep.equal(rulesStub)
      feedback.reset()
      expect(feedback.rules).to.be.empty()
    })

    it('should reset showModal state', function () {
      expect(feedback.showModal).to.be.true()
      feedback.reset()
      expect(feedback.showModal).to.be.false()
    })

    it('should set the onHide callback', function () {
      expect(feedback.onHide).to.be.a('function')
      expect(feedback.onHide()).to.be.true() // default to just return true
      feedback.reset()
      expect(feedback.onHide).to.equal(feedback.subjects.advance)
    })
  })

  describe('Actions > showFeedback', function () {
    let feedback
    before(function () {
      const feedbackStub = FeedbackFactory.build({ isActive: true, rules: rulesStub })
      feedback = FeedbackStore.create(feedbackStub)
    })

    it('should set showModal state to true', function () {
      expect(feedback.showModal).to.be.false()
      feedback.showFeedback()
      expect(feedback.showModal).to.be.true()
    })
  })

  describe('Actions > hideFeedback', function () {
    let feedback
    before(function () {
      const feedbackStub = FeedbackFactory.build({ isActive: true, rules: rulesStub, showModal: true })
      feedback = FeedbackStore.create(feedbackStub)
    })

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

  describe('Views > applicableRules', function () {
    let feedback, feedbackStub
    before(function () {
      feedbackStub = FeedbackFactory.build({ rules: rulesStub })
      feedback = FeedbackStore.create(feedbackStub)
    })

    it('should return an array of applicable rules', function () {
      expect(feedback.applicableRules).to.have.lengthOf(2)
      expect(feedback.applicableRules.some(rule => rule.id === 'testRule1-1')).to.be.true()
      expect(feedback.applicableRules.some(rule => rule.id === 'testRule2-1')).to.be.true()
    })
  })

  describe('Views > hideSubjectViewer', function () {
    it('should return true if any rule hides subject viewer', function () {
      const feedbackStub = FeedbackFactory.build({ rules: rulesStub })
      const feedback = FeedbackStore.create(feedbackStub)
      expect(feedback.hideSubjectViewer).to.be.true()
    })

    it('should return false if no rule hides subject viewer', function () {
      const rules = {
        T1: [{
          id: 'testRule2-1',
          hideSubjectViewer: false,
          answer: '0',
          strategy: 'testStrategy',
          success: false,
          successEnabled: true,
          successMessage: 'Yippee!',
          failureEnabled: true,
          failureMessage: 'Nope!'
        }]
      }
      const feedbackStub = FeedbackFactory.build({ rules })
      const feedback = FeedbackStore.create(feedbackStub)
      expect(feedback.hideSubjectViewer).to.be.false()
    })
  })

  describe('Views > messages', function () {
    let feedback, feedbackStub
    before(function () {
      feedbackStub = FeedbackFactory.build({ isActive: true, rules: rulesStub, showModal: true })
      feedback = FeedbackStore.create(feedbackStub)
    })

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
      let feedback
      beforeEach(function () {
        const feedbackStub = FeedbackFactory.build({ rules: rulesStub })
        feedback = FeedbackStore.create(feedbackStub)
        feedback.onSubjectAdvance(call, next, abort)
      })

      it('should continue the action', function () {
        expect(next.withArgs(call)).to.have.been.calledOnce()
      })
    })

    describe('when feedback is active', function () {
      let feedback
      beforeEach(function () {
        const feedbackStub = FeedbackFactory.build({ isActive: true, rules: rulesStub, showModal: false })
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
