import sinon from 'sinon'
import ClassificationStore from './ClassificationStore'
import FeedbackStore from './FeedbackStore'
import RootStore from './RootStore'
import Subject from './Subject'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '../../test/factories'
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

const subjectStub = SubjectFactory.build()

const workflowStub = WorkflowFactory.build()
const projectStub = ProjectFactory.build({}, { activeWorkflowId: workflowStub.id })

describe.only('Model > ClassificationStore', function () {
  let classifications
  let rootStore

  function setupStores () {
    const clientStub = stubPanoptesJs({ workflows: workflowStub })
    const store = RootStore.create({
      dataVisAnnotating: {},
      drawing: {},
      feedback: {},
      fieldGuide: {},
      subjects: {},
      subjectViewer: {},
      tutorials: {},
      workflowSteps: {},
      userProjectPreferences: {}
    }, {
      client: clientStub,
      authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
    })

    store.projects.setResource(projectStub)
    store.projects.setActive(projectStub.id)
    return store
  }

  before(function () {
    rootStore = setupStores()
    classifications = rootStore.classifications
  })

  it('should exist', function () {
    expect(ClassificationStore).to.be.ok()
    expect(ClassificationStore).to.be.an('object')
  })

  it.only('should create an empty Classification with links to the Project, Workflow, and Subject', function () {
    classifications.createClassification(subjectStub, workflowStub, projectStub)

    const classification = classifications.active.toJSON()

    expect(classification).to.be.ok()
    expect(classification.links.project).to.equal(projectStub.id)
    expect(classification.links.workflow).to.equal(workflowStub.id)
    expect(classification.links.subjects[0]).to.equal(subjectStub.id)
  })

  it('should create an empty Classification with the correct Subject Selection metadata', function () {
    classifications.createClassification(subject)

    const classification = Array.from(classifications.resources.values())[0]

    expect(classification.metadata.subjectSelectionState).to.be.ok()
    expect(classification.metadata.subjectSelectionState.already_seen).to.equal(subjectStub.already_seen)
    expect(classification.metadata.subjectSelectionState.finished_workflow).to.equal(subjectStub.finished_workflow)
    expect(classification.metadata.subjectSelectionState.retired).to.equal(subjectStub.retired)
    expect(classification.metadata.subjectSelectionState.selection_state).to.equal(subjectStub.selection_state)
    expect(classification.metadata.subjectSelectionState.user_has_finished_workflow).to.equal(subjectStub.user_has_finished_workflow)
  })

  describe('on complete classification', function () {
    let classifications
    let event
    let feedback
    let subjectViewer
    let onComplete
    let feedbackStub

    before(function () {
      subject = Subject.create(subjectStub)
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

      const clientStub = {
        panoptes: {
          post: sinon.stub().callsFake(() => Promise.resolve({
            ok: true,
            body: {
              classifications: []
            }
          }))
        }
      }
      classifications = ClassificationStore.create({
        active: undefined,
        resources: {},
        type: 'classifications'
      })
      feedback = FeedbackStore.create(feedbackStub)
      sinon.stub(feedback, 'createRules')
      sinon.stub(feedback, 'update')
      sinon.stub(feedback, 'reset')
      const rootStore = RootStub.create(
        {
          classifications,
          feedback,
          projects: { active: projectStub },
          subjects: { active: subject },
          subjectViewer: {},
          workflows: { active: workflowStub }
        },
        {
          client: clientStub
        }
      )
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
      classifications.createClassification(subject)
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
      expect(feedback.update).to.have.been.calledOnceWith(annotation)
    })

    it('should call the onComplete callback with the classification and subject', function () {
      const classification = classifications.active
      expect(onComplete).to.have.been.calledOnceWith(classification.toJSON(), subject.toJSON())
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
