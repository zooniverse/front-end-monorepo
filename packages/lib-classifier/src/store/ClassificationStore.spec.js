import sinon from 'sinon'
import { Factory } from 'rosie'
import RootStore from './RootStore'
import ClassificationStore from './ClassificationStore'
import FeedbackStore from './FeedbackStore'
import Subject from './Subject'
import { ProjectFactory, WorkflowFactory } from '../../test/factories'
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
const workflowStub = WorkflowFactory.build()
const projectStub = ProjectFactory.build({}, { activeWorkflowId: workflowStub.id })

describe.only('Model > ClassificationStore', function () {
  function setupStores (stores) {
    const clientStub = stubPanoptesJs({ subjects: subjectsStub, workflows: workflowStub })
    const store = RootStore.create(stores, {
        client: clientStub,
        authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
    })
    store.projects.setResource(projectStub)
    store.projects.setActive(projectStub.id)
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

      // const clientStub = {
      //   panoptes: {
      //     post: sinon.stub().callsFake(() => Promise.resolve({
      //       ok: true,
      //       body: {
      //         classifications: []
      //       }
      //     }))
      //   }
      // }
      feedback = FeedbackStore.create(feedbackStub)
      sinon.stub(feedback, 'createRules')
      sinon.stub(feedback, 'update')
      sinon.stub(feedback, 'reset')
      const rootStore = setupStores({
        dataVisAnnotating: {},
        drawing: {},
        feedback,
        fieldGuide: {},
        subjectViewer: {},
        tutorials: {},
        workflowSteps: {},
        userProjectPreferences: {}
      })
      classifications = rootStore.classifications
      event = {
        preventDefault: sinon.stub()
      }
      onComplete = sinon.stub()
      classifications.setOnComplete(onComplete)
      subjectViewer = rootStore.subjectViewer
    })

    beforeEach(function () {
      subjectViewer.onSubjectReady({
        target: {
          naturalHeight: 200,
          naturalWidth: 400
        }
      })
      classifications.addAnnotation(0, { type: 'single', taskKey: 'T0' })
      classifications.completeClassification(event)
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
    })

    it('should update feedback', function () {
      const annotation = {
        task: 'T0',
        value: 0
      }
      expect(feedback.update.withArgs(annotation)).to.have.been.calledOnce()
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
