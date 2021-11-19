import sinon from 'sinon'
import FeedbackStore from './FeedbackStore'
import RootStore from './RootStore'
import strategies from './feedback/strategies'
import helpers from './feedback/helpers'
import {
  FeedbackFactory,
  ProjectFactory,
  WorkflowFactory
} from '@test/factories'
import { Factory } from 'rosie'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > FeedbackStore', function () {
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

  const workflow = WorkflowFactory.build({
    tasks: {
      T0: {
        type: 'single',
        question: 'Yes or no?',
        answers: ['yes', 'no'],
        feedback: {
          enabled: true,
          rules: [{
            id: '51',
            strategy: 'singleAnswerQuestion',
            failureEnabled: true,
            successEnabled: true,
            defaultFailureMessage: '"Actually, that\'s not correct"',
            defaultSuccessMessage: '"Correct"'
          }]
        }
      }
    }
  })
  const project = ProjectFactory.build({}, {
    activeWorkflowId: workflow.id,
    experimental_tools: ['general feedback']
  })
  const subject = Factory.build('subject')
  subject.shouldDiscuss = undefined

  function createRootStore (feedbackSnapshot) {
    const project = ProjectFactory.build()
    const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
    const subjects = Factory.buildList('subject', 10)
    const client = stubPanoptesJs({ subjects, workflows: workflow })
    client.tutorials = {
      get: sinon.stub().callsFake(() => Promise.resolve({ body: { tutorials: [] } }))
    }
    return RootStore.create({
      feedback: feedbackSnapshot
    }, {
      client,
      authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
    })
  }

  describe('existance', function () {
    it('should exist', function () {
      expect(FeedbackStore).to.be.ok()
      expect(FeedbackStore).to.be.an('object')
    })
  })

  describe('Actions', function () {
    before(function () {
      sinon.stub(helpers, 'generateRules').callsFake(() => rulesStub)
      strategies.testStrategy = {
        reducer: sinon.stub().callsFake(rule => rule)
      }
    })

    after(function () {
      helpers.generateRules.restore()
    })

    describe('createRules', function () {
      let feedback
      let rootStore

      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
        const feedbackSnapshot = FeedbackFactory.build()
        rootStore = createRootStore(feedbackSnapshot)
        feedback = rootStore.feedback
      })

      beforeEach(function () {
        rootStore.projects.setResources([project])
        rootStore.projects.setActive(project.id)
        rootStore.workflows.setResources([workflow])
        rootStore.workflows.setActive(workflow.id)
      })

      afterEach(function () {
        feedback.reset()
        helpers.isFeedbackActive.resetHistory()
        helpers.generateRules.resetHistory()
      })

      after(function () {
        helpers.isFeedbackActive.restore()
      })

      it('should generate rules', function () {
        const workflow = rootStore.workflows.active
        expect(feedback.rules.toJSON()).to.be.empty()
        feedback.createRules(subject)
        expect(helpers.generateRules.withArgs(subject, workflow)).to.have.been.calledOnce()
        expect(feedback.rules.toJSON()).to.deep.equal(rulesStub)
      })
    })

    describe('update', function () {
      let feedback
      let rootStore

      describe('when feedback is active', function () {
        before(function () {
          sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
          const feedbackSnapshot = FeedbackFactory.build({ rules: rulesStub })
          rootStore = createRootStore(feedbackSnapshot)
          feedback = rootStore.feedback
        })

        beforeEach(function () {
          rootStore.projects.setResources([project])
          rootStore.projects.setActive(project.id)
          rootStore.workflows.setResources([workflow])
          rootStore.workflows.setActive(workflow.id)
          const annotation = { task: 'T1', value: 0 }
          feedback.update(annotation)
        })

        after(function () {
          strategies.testStrategy.reducer.resetHistory()
          helpers.isFeedbackActive.restore()
        })

        it('should reduce the rule and value', function () {
          const [rule] = feedback.rules.get('T1')
          expect(strategies.testStrategy.reducer).to.have.been.calledOnceWith(rule, 0)
        })
      })

      describe('when feedback is not active', function () {
        before(function () {
          sinon.stub(helpers, 'isFeedbackActive').callsFake(() => false)
          const feedbackSnapshot = FeedbackFactory.build({ rules: {} })
          rootStore = createRootStore(feedbackSnapshot)
          feedback = rootStore.feedback
        })

        after(function () {
          helpers.isFeedbackActive.restore()
        })

        beforeEach(function () {
          rootStore.projects.setResources([project])
          rootStore.projects.setActive(project.id)
          rootStore.workflows.setResources([workflow])
          rootStore.workflows.setActive(workflow.id)
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

    describe('reset', function () {
      let feedback
      let rootStore

      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
      })

      beforeEach(function () {
        const feedbackSnapshot = FeedbackFactory.build({ rules: rulesStub, showModal: true })
        rootStore = createRootStore(feedbackSnapshot)
        feedback = rootStore.feedback
        sinon.stub(rootStore.subjects, 'advance').callsFake(() => { })
      })

      after(function () {
        helpers.isFeedbackActive.restore()
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
        expect(feedback.onHide).to.equal(rootStore.subjects.advance)
      })
    })

    describe('showFeedback', function () {
      let feedback
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
        const feedbackStub = FeedbackFactory.build({ rules: rulesStub })
        feedback = FeedbackStore.create(feedbackStub)
      })

      after(function () {
        helpers.isFeedbackActive.restore()
      })

      it('should set showModal state to true', function () {
        expect(feedback.showModal).to.be.false()
        feedback.showFeedback()
        expect(feedback.showModal).to.be.true()
      })
    })

    describe('hideFeedback', function () {
      let feedback
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
        const feedbackStub = FeedbackFactory.build({ rules: rulesStub, showModal: true })
        feedback = FeedbackStore.create(feedbackStub)
      })

      beforeEach(function () {
        feedback.setOnHide(sinon.stub())
        feedback.hideFeedback()
      })

      after(function () {
        helpers.isFeedbackActive.restore()
      })

      it('should set showModal state to false', function () {
        expect(feedback.showModal).to.be.false()
      })

      it('should call the onHide callback', function () {
        expect(feedback.onHide).to.have.been.calledOnce()
      })
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
      sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
      feedbackStub = FeedbackFactory.build({ rules: rulesStub, showModal: true })
      feedback = FeedbackStore.create(feedbackStub)
    })

    after(function () {
      helpers.isFeedbackActive.restore()
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
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => false)
      })

      beforeEach(function () {
        const feedbackStub = FeedbackFactory.build({ rules: rulesStub })
        feedback = FeedbackStore.create(feedbackStub)
        feedback._onSubjectAdvance(call, next, abort)
      })

      after(function () {
        helpers.isFeedbackActive.restore()
      })

      it('should continue the action', function () {
        expect(next.withArgs(call)).to.have.been.calledOnce()
      })
    })

    describe('when feedback is active', function () {
      let feedback
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
      })

      beforeEach(function () {
        const feedbackStub = FeedbackFactory.build({ rules: rulesStub, showModal: false })
        feedback = FeedbackStore.create(feedbackStub)
        feedback._onSubjectAdvance(call, next, abort)
      })

      after(function () {
        helpers.isFeedbackActive.restore()
      })

      it('should abort the action', function () {
        expect(abort).to.have.been.calledOnce()
      })

      it('should show feedback', function () {
        expect(feedback.showModal).to.be.true()
      })
    })
  })

  describe('when a new subject loads', function () {
    let feedback
    let rootStore

    before(function () {
      const feedbackSnapshot = FeedbackFactory.build()
      rootStore = createRootStore(feedbackSnapshot)
      feedback = rootStore.feedback
    })

    beforeEach(function () {
      rootStore.projects.setResources([project])
      rootStore.projects.setActive(project.id)
      rootStore.workflows.setResources([workflow])
      rootStore.workflows.setActive(workflow.id)
    })

    afterEach(function () {
      feedback.reset()
    })

    describe('when the subject has no feedback', function () {
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => false)
        sinon.stub(helpers, 'generateRules').callsFake(() => {})
        strategies.testStrategy = {
          reducer: sinon.stub().callsFake(rule => rule)
        }
      })

      after(function () {
        helpers.isFeedbackActive.restore()
        helpers.generateRules.restore()
      })

      beforeEach(function () {
        rootStore.subjects.setResources([subject])
        rootStore.subjects.setActive(subject.id)
        feedback.onNewSubject()
      })

      it('should not set isActive', function () {
        expect(feedback.isActive).to.be.false()
      })

      it('should not generate rules', function () {
        expect(feedback.rules).to.be.empty()
      })
    })

    describe('when the subject has feedback', function () {
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

      beforeEach(function () {
        rootStore.subjects.setResources([subject])
        rootStore.subjects.setActive(subject.id)
        feedback.onNewSubject()
      })

      it('should set isActive', function () {
        expect(feedback.isActive).to.be.true()
      })

      it('should generate new rules', function () {
        expect(feedback.rules.toJSON()).to.deep.equal(rulesStub)
      })
    })
  })
})
