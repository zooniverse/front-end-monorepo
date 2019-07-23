import sinon from 'sinon'
import { Factory } from 'rosie'
import RootStore from './RootStore'
import ClassificationStore from './ClassificationStore'
import FeedbackStore from './FeedbackStore'
import Subject from './Subject'
import { ProjectFactory, SingleChoiceAnnotationFactory, SingleChoiceTaskFactory, WorkflowFactory } from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

// import { getEnv, types } from 'mobx-state-tree'

// const RootStub = types
//   .model('RootStore', {
//     classifications: ClassificationStore,
//     feedback: FeedbackStore,
//     projects: types.frozen(),
//     subjects: types.frozen(),
//     subjectViewer: SubjectViewerStore,
//     workflows: types.frozen()
//   })
//   .views(self => ({
//     get client () {
//       return getEnv(self).client
//     }
//   }))

const subjectsStub = Factory.buildList('subject', 10)
const singleChoiceTaskStub = SingleChoiceTaskFactory.build()
const singleChoiceAnnotationStub = SingleChoiceAnnotationFactory.build()
const workflowStub = WorkflowFactory.build({ tasks: { T0: singleChoiceTaskStub }})
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

  describe.only('on complete classification', function () {
    let classifications
    let event
    let feedback
    let subject
    let subjectViewer
    let onComplete
    let feedbackStub
    let rootStore

    before(function () {
      subject = subjectsStub[0]
      feedbackStub = {
        isActive: true,
        rules: {
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
      }

      rootStore = setupStores({
        dataVisAnnotating: {},
        drawing: {},
        feedback: feedbackStub,
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
      event = {
        preventDefault: sinon.stub()
      }
      onComplete = sinon.stub()
      classifications.setOnComplete(onComplete)
      subjectViewer = rootStore.subjectViewer
    })

    beforeEach(function () {
      // console.log(rootStore.toJSON())
      subjectViewer.onSubjectReady({
        target: {
          naturalHeight: 200,
          naturalWidth: 400
        }
      })
      classifications.addAnnotation(singleChoiceAnnotationStub.value, { type: 'single', taskKey: singleChoiceAnnotationStub.task })
      classifications.completeClassification(event)
    })

    afterEach(function () {
      onComplete.resetHistory()
      rootStore.feedback.update.resetHistory()
      subjectViewer.resetSubject()
    })

    after(function () {
      rootStore.feedback.createRules.restore()
      rootStore.feedback.update.restore()
      rootStore.feedback.reset.restore()
    })

    it('should update feedback', function () {
      expect(rootStore.feedback.update.withArgs(singleChoiceAnnotationStub)).to.have.been.calledOnce()
    })

    it('should call the onComplete callback with the classification and subject', function () {
      const classification = classifications.active
      expect(onComplete.withArgs(classification.toJSON(), subject.toJSON())).to.have.been.calledOnce()
    })

    describe('classification metadata', function () {
      let metadata

      before(function () {
        metadata = classifications.active.metadata
      })

      it('should have a feedback key', function () {
        const { rules } = feedbackStub
        expect(metadata.feedback).to.eql(rules)
      })

      it('should record subject dimensions', function () {
        expect(metadata.subjectDimensions).to.eql(subjectViewer.dimensions)
      })
    })
  })
})
