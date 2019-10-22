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
import helpers from './feedback/helpers'
import { SingleChoiceAnnotation } from './annotations'

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
const workflowStub = WorkflowFactory.build({ tasks: { T0: singleChoiceTaskStub } })
const projectStub = ProjectFactory.build({}, { activeWorkflowId: workflowStub.id })

describe('Model > ClassificationStore', function () {
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
      rootStore.subjects.setResource(subjectsStub[0])
      rootStore.subjects.setActive(subjectsStub[0].id)
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
    describe('with invalid feedback', function () {
      let classifications
      let rootStore
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
        const invalidFeedbackStub = {
          rules: {}
        }

        rootStore = setupStores({
          dataVisAnnotating: {},
          drawing: {},
          feedback: invalidFeedbackStub,
          fieldGuide: {},
          subjectViewer: {},
          tutorials: {},
          workflowSteps: {},
          userProjectPreferences: {}
        })

        classifications = rootStore.classifications
        classifications.setOnComplete(sinon.stub())
      })

      beforeEach(function () {
        const taskStub = Object.assign({}, singleChoiceTaskStub, { taskKey: singleChoiceAnnotationStub.task })
        taskStub.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationStub)
        classifications.addAnnotation(singleChoiceAnnotationStub.value, taskStub)
        classifications.completeClassification({
          preventDefault: sinon.stub()
        })
      })

      after(function () {
        helpers.isFeedbackActive.restore()
      })

      it('should not add feedback to classification metadata', function () {
        expect(classifications.active.metadata.feedback).to.be.empty()
      })
    })

    describe('with valid feedback', function () {
      let classifications
      let classificationWithAnnotation
      let subjectToBeClassified
      let feedback
      let subjectViewer
      let onComplete
      let rootStore

      before(function () {
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
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
        classifications = rootStore.classifications
        feedback = rootStore.feedback
        onComplete = sinon.stub()
        classifications.setOnComplete(onComplete)
        subjectViewer = rootStore.subjectViewer
      })

      beforeEach(function () {
        const activeFeedback = FeedbackFactory.build({ rules: feedbackRulesStub })
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

        subjectToBeClassified = rootStore.subjects.active
        const taskStub = Object.assign({}, singleChoiceTaskStub, { taskKey: singleChoiceAnnotationStub.task })
        taskStub.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationStub)
        classifications.addAnnotation(singleChoiceAnnotationStub.value, taskStub)
        classificationWithAnnotation = classifications.active
        classifications.completeClassification({
          preventDefault: sinon.stub()
        })
      })

      afterEach(function () {
        onComplete.resetHistory()
        feedback.update.resetHistory()
        subjectViewer.resetSubject()
      })

      after(function () {
        feedback.createRules.restore()
        feedback.update.restore()
        feedback.reset.restore()
        helpers.isFeedbackActive.restore()
      })

      // Why is this test here?
      // The observer is in the feedback store
      it('should update feedback', function () {
        expect(feedback.update.withArgs(singleChoiceAnnotationStub)).to.have.been.calledOnce()
      })

      it('should call the onComplete callback with the classification and subject', function () {
        expect(onComplete.withArgs(classificationWithAnnotation.toJSON(), subjectToBeClassified.toJSON())).to.have.been.calledOnce()
      })

      describe('classification metadata', function () {
        let metadata

        before(function () {
          metadata = classifications.active.metadata
        })

        it('should have a feedback key', function () {
          expect(metadata.feedback).to.eql(feedbackRulesStub)
        })

        it('should record subject dimensions', function () {
          expect(metadata.subjectDimensions).to.eql(subjectViewer.dimensions)
        })
      })
    })
  })
})
