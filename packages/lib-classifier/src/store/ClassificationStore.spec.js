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
  SubjectFactory,
  WorkflowFactory
} from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import helpers from './feedback/helpers'
import taskRegistry from '@plugins/tasks'

describe('Model > ClassificationStore', function () {
  const { AnnotationModel: SingleChoiceAnnotation } = taskRegistry.get('single')

  const feedbackRulesSnapshot = {
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
  const subjectsSnapshot = Factory.buildList('subject', 10)
  const singleChoiceTaskSnapshot = SingleChoiceTaskFactory.build()
  const singleChoiceAnnotationSnapshot = SingleChoiceAnnotationFactory.build()
  const workflowSnapshot = WorkflowFactory.build({ tasks: { T0: singleChoiceTaskSnapshot } })
  const projectSnapshot = ProjectFactory.build({}, { activeWorkflowId: workflowSnapshot.id })

  function setupStores (stores) {
    const clientSnapshot = stubPanoptesJs({ classifications: [], subjects: subjectsSnapshot })
    const store = RootStore.create(stores, {
      client: clientSnapshot,
      authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
    })
    store.projects.setResource(projectSnapshot)
    store.projects.setActive(projectSnapshot.id)
    store.workflows.setResource(workflowSnapshot)
    store.workflows.setActive(workflowSnapshot.id)
    store.subjects.setResource(subjectsSnapshot[0])
    store.subjects.setActive(subjectsSnapshot[0].id)
    store.subjectViewer.onSubjectReady({
      target: {
        naturalHeight: 200,
        naturalWidth: 400
      }
    })
    /*
      onSubjectReady resets the feedback store so
      apply any feedback rules manually for now.
    */
    applySnapshot(store.feedback, stores.feedback)
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
      const subject = subjectsSnapshot[0]
      expect(classification).to.be.ok()
      expect(classification.links.project).to.equal(projectSnapshot.id)
      expect(classification.links.workflow).to.equal(workflowSnapshot.id)
      expect(classification.links.subjects[0]).to.equal(subject.id)
    })

    it('should create an empty Classification with the correct Subject Selection metadata', function () {
      const classification = classifications.active.toJSON()
      const subject = subjectsSnapshot[0]
      expect(classification.metadata.subjectSelectionState).to.be.ok()
      expect(classification.metadata.subjectSelectionState.already_seen).to.equal(subject.already_seen)
      expect(classification.metadata.subjectSelectionState.finished_workflow).to.equal(subject.finished_workflow)
      expect(classification.metadata.subjectSelectionState.retired).to.equal(subject.retired)
      expect(classification.metadata.subjectSelectionState.selection_state).to.equal(subject.selection_state)
      expect(classification.metadata.subjectSelectionState.user_has_finished_workflow).to.equal(subject.user_has_finished_workflow)
    })
  })

  describe('on new subject', function () {
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
      rootStore.subjects.advance()
      rootStore.subjectViewer.onSubjectReady({
        target: {
          naturalHeight: 200,
          naturalWidth: 400
        }
      })
    })

    afterEach(function () {
      rootStore = null
      classifications = null
    })

    it('should reset and create a new classification', function () {
      const firstClassificationId = classifications.active.id
      expect(classifications.active.toJSON()).to.ok()
      rootStore.subjects.setResource(subjectsSnapshot[1])
      rootStore.subjects.setActive(subjectsSnapshot[1].id)
      rootStore.subjectViewer.onSubjectReady()
      expect(classifications.active.id).to.not.equal(firstClassificationId)
    })
  })

  describe('on complete classification', function () {
    describe('with invalid feedback', function () {
      let classifications
      let rootStore
      before(function () {
        sinon.stub(helpers, 'isFeedbackActive').callsFake(() => true)
        const invalidFeedbackSnapshot = {
          rules: {}
        }

        rootStore = setupStores({
          dataVisAnnotating: {},
          drawing: {},
          feedback: invalidFeedbackSnapshot,
          fieldGuide: {},
          subjectViewer: {
            dimensions: [{
              clientHeight: 100,
              clientWidth: 300,
              naturalHeight: 200,
              naturalWidth: 600
            }]
          },
          tutorials: {},
          workflowSteps: {},
          userProjectPreferences: {}
        })

        classifications = rootStore.classifications
        classifications.setOnComplete(sinon.stub())
      })

      beforeEach(function () {
        const taskSnapshot = Object.assign({}, singleChoiceTaskSnapshot, { taskKey: singleChoiceAnnotationSnapshot.task })
        taskSnapshot.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationSnapshot)
        classifications.addAnnotation(taskSnapshot, singleChoiceAnnotationSnapshot.value)
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
        // mock a store with feedback rules
        const activeFeedback = FeedbackFactory.build({ rules: feedbackRulesSnapshot })
        rootStore = setupStores({
          dataVisAnnotating: {},
          drawing: {},
          feedback: activeFeedback,
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

        // annotate a subject then finish the classification
        subjectToBeClassified = rootStore.subjects.active
        const taskSnapshot = Object.assign({}, singleChoiceTaskSnapshot, { taskKey: singleChoiceAnnotationSnapshot.task })
        taskSnapshot.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationSnapshot)
        classifications.addAnnotation(taskSnapshot, singleChoiceAnnotationSnapshot.value)
        classificationWithAnnotation = classifications.active
        classifications.completeClassification({
          preventDefault: sinon.stub()
        })
      })

      after(function () {
        onComplete.resetHistory()
        feedback.update.resetHistory()
        subjectViewer.resetSubject()

        feedback.createRules.restore()
        feedback.update.restore()
        feedback.reset.restore()
        helpers.isFeedbackActive.restore()
      })

      /* 
        Why is this test here?
        The observer is in the root store.
        I'm not sure why these are here either. (JOD)
        The RootStore tests could be updated to test that feedback
        is added to classifications on classificationComplete.
        The tests for invalid feedback would have to be moved too.
      */
      it('should update feedback', function () {
        expect(feedback.update.withArgs(singleChoiceAnnotationSnapshot)).to.have.been.calledOnce()
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
          expect(metadata.feedback).to.eql(feedbackRulesSnapshot)
        })

        it('should record subject dimensions', function () {
          expect(metadata.subjectDimensions).to.eql(subjectViewer.dimensions)
        })
      })
    })
  })
})
