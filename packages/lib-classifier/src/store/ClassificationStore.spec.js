import sinon from 'sinon'
import { Factory } from 'rosie'
import RootStore from './RootStore'
import ClassificationStore from './ClassificationStore'
import { applySnapshot } from 'mobx-state-tree'
import {
  FeedbackFactory,
  ProjectFactory,
  SingleChoiceAnnotationFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'


const feedbackRulesStub = {
  T0: [{
    id: 'testRule',
    answer: '0',
    strategy: 'singleAnswerQuestion',
    successEnabled: true,
    successMessage: 'Yay!',
    failureEnabled: true,
    failureMessage: 'No!'
  }]
}
const subjectsStub = Factory.buildList('subject', 10)
const singleChoiceTaskStub = SingleChoiceTaskFactory.build()
const singleChoiceAnnotationStub = SingleChoiceAnnotationFactory.build()
const workflowStub = WorkflowFactory.build({ tasks: { T0: singleChoiceTaskStub }})
const projectStub = ProjectFactory.build({}, { activeWorkflowId: workflowStub.id })

describe.only('Model > ClassificationStore', function () {
  function setupStores (stores) {
    const clientStub = stubPanoptesJs({ classifications: [], subjects: subjectsStub })
    const store = RootStore.create(stores, {
      client: clientStub,
      authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
    })
    store.projects.setResource(projectStub)
    store.projects.setActive(projectStub.id)
    store.workflows.setResource(workflowStub)
    store.workflows.setActive(workflowStub.id)
    return store
  }

  it('should exist', function () {
    expect(ClassificationStore).to.be.ok()
    expect(ClassificationStore).to.be.an('object')
  })

  describe('when it instantiates', function () {
    let classifications
    let rootStore
    beforeEach(function () {
      rootStore = setupStores({
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        subjectViewer: {},
        tutorials: {},
        workflowSteps: {},
        userProjectPreferences: {}
      })
      classifications = rootStore.classifications
    })

    afterEach(function () {
      rootStore = null
      classifications = null
    })

    it('should create an empty Classification with links to the Project, Workflow, and Subject', function () {
      const classification = classifications.active.toJSON()
      const subject = subjectsStub[0]
      expect(classification).to.be.ok()
      expect(classification.links.project).to.equal(projectStub.id)
      expect(classification.links.workflow).to.equal(workflowStub.id)
      expect(classification.links.subjects[0]).to.equal(subject.id)
    })

    it('should create an empty Classification with the correct Subject Selection metadata', function () {
      const classification = classifications.active.toJSON()
      const subject = subjectsStub[0]
      expect(classification.metadata.subjectSelectionState).to.be.ok()
      expect(classification.metadata.subjectSelectionState.already_seen).to.equal(subject.already_seen)
      expect(classification.metadata.subjectSelectionState.finished_workflow).to.equal(subject.finished_workflow)
      expect(classification.metadata.subjectSelectionState.retired).to.equal(subject.retired)
      expect(classification.metadata.subjectSelectionState.selection_state).to.equal(subject.selection_state)
      expect(classification.metadata.subjectSelectionState.user_has_finished_workflow).to.equal(subject.user_has_finished_workflow)
    })
  })

  describe('on complete classification', function () {
    let classifications
    let classificationWithAnnotation
    let subjectToBeClassified
    let event
    let feedback
    let subjectViewer
    let onComplete
    let feedbackStub
    let rootStore

    before(function () {
      feedbackStub = FeedbackFactory.build({ rules: feedbackRulesStub })

      rootStore = setupStores({
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        subjectViewer: {},
        tutorials: {},
        workflowSteps: {},
        userProjectPreferences: {}
      })

      sinon.stub(rootStore.feedback, 'createRules')
      sinon.stub(rootStore.feedback, 'update')
      sinon.stub(rootStore.feedback, 'reset')
      classifications = rootStore.classifications
      feedback = rootStore.feedback
      event = {
        preventDefault: sinon.stub()
      }
      onComplete = sinon.stub()
      classifications.setOnComplete(onComplete)
      subjectViewer = rootStore.subjectViewer
    })

    beforeEach(function () {
      subjectToBeClassified = rootStore.subjects.active
      classifications.addAnnotation(singleChoiceAnnotationStub.value, { type: 'single', taskKey: singleChoiceAnnotationStub.task })
      classificationWithAnnotation = classifications.active
      classifications.completeClassification(event)
    })

    afterEach(function () {
      onComplete.resetHistory()
      feedback.update.resetHistory()
    })

    after(function () {
      feedback.createRules.restore()
      feedback.update.restore()
      feedback.reset.restore()
    })

    it('should update feedback', function () {
      expect(feedback.update.withArgs(singleChoiceAnnotationStub)).to.have.been.calledOnce()
    })

    it('should call the onComplete callback with the classification and subject', function () {
      expect(onComplete.withArgs(classificationWithAnnotation.toJSON(), subjectToBeClassified.toJSON())).to.have.been.calledOnce()
    })

    describe('classification metadata', function () {
      let metadata

      before(function () {
        const activeFeedback = FeedbackFactory.build({ isActive: true, rules: feedbackRulesStub })
        // Classification completion adds feedback metadata if feedback is active and there are rules
        // So first we update the feedback store to have active feedback
        // Then call the classification complete event
        applySnapshot(feedback, activeFeedback)
        subjectViewer.onSubjectReady({
          target: {
            naturalHeight: 200,
            naturalWidth: 400
          }
        })
        classifications.completeClassification(event)
        const classification = classifications.active.toJSON()
        metadata = classification.metadata
      })

      it('should have a feedback key', function () {
        const { rules } = feedbackStub
        expect(metadata.feedback).to.deep.equal(rules)
      })

      it('should record subject dimensions', function () {
        expect(metadata.subjectDimensions).to.deep.equal(subjectViewer.dimensions.toJSON())
      })
    })
  })
})
