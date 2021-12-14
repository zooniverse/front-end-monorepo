import sinon from 'sinon'
import { Factory } from 'rosie'
import RootStore from './RootStore'
import ClassificationStore from './ClassificationStore'
import { applySnapshot, tryReference } from 'mobx-state-tree'
import {
  FeedbackFactory,
  ProjectFactory,
  SingleChoiceAnnotationFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import helpers from './feedback/helpers'
import taskRegistry from '@plugins/tasks'
import { expect } from 'chai'

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
    store.projects.setResources([projectSnapshot])
    store.projects.setActive(projectSnapshot.id)
    store.workflows.setResources([workflowSnapshot])
    store.workflows.setActive(workflowSnapshot.id)
    store.subjects.setResources(subjectsSnapshot)
    store.subjects.advance()
    applySnapshot(store.feedback, stores.feedback)
    return store
  }

  it('should exist', function () {
    expect(ClassificationStore).to.be.ok()
    expect(ClassificationStore).to.be.an('object')
  })

  describe('when a subject advances', function () {
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
        subjectToBeClassified = tryReference(() => rootStore.subjects.active)
        const taskSnapshot = Object.assign({}, singleChoiceTaskSnapshot, { taskKey: singleChoiceAnnotationSnapshot.task })
        taskSnapshot.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationSnapshot)
        classifications.addAnnotation(taskSnapshot, singleChoiceAnnotationSnapshot.value)
        classificationWithAnnotation = tryReference(() => classifications.active)
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
        const { annotations } = classificationWithAnnotation
        expect(annotations.size).to.equal(1)
        annotations.forEach(annotation => {
          expect(feedback.update.withArgs(annotation)).to.have.been.calledOnce()
        })
      })

      it('should call the onComplete callback with the classification and subject', function () {
        expect(onComplete.withArgs(classificationWithAnnotation.toJSON(), subjectToBeClassified.toJSON())).to.have.been.calledOnce()
      })

      describe('classification metadata', function () {
        let metadata

        before(function () {
          metadata = classificationWithAnnotation.metadata
        })

        it('should have a feedback key', function () {
          expect(metadata.feedback).to.eql(feedbackRulesSnapshot)
        })

        it('should record subject dimensions', function () {
          expect(metadata.subjectDimensions).to.eql(subjectViewer.dimensions)
        })
      })
    })

    describe('with demo mode', function () {
      let classifications
      let rootStore
      let firstClassification

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

        sinon.spy(rootStore.classifications, 'submitClassification')
        classifications = rootStore.classifications
        const onComplete = sinon.stub()
        classifications.setOnComplete(onComplete)
        classifications.setDemoMode(true)

        // annotate a subject then finish the classification
        const taskSnapshot = Object.assign({}, singleChoiceTaskSnapshot, { taskKey: singleChoiceAnnotationSnapshot.task })
        taskSnapshot.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationSnapshot)
        classifications.addAnnotation(taskSnapshot, singleChoiceAnnotationSnapshot.value)
        firstClassification = classifications.active.toJSON()
        classifications.completeClassification({
          preventDefault: sinon.stub()
        })
      })

      it('should not call submitClassification', function () {
        expect(classifications.submitClassification).to.have.not.been.called()
      })

      it('should reset and create a new classification', function () {
        expect(classifications.active).to.not.deep.equal(firstClassification)
      })

      it('should track the already seen subject in session storage', function () {
        const alreadySeen = window.sessionStorage.getItem('subjectsSeenThisSession')
        const parsedSeen = JSON.parse(alreadySeen)
        expect(parsedSeen[0]).to.equal(`${firstClassification.links.workflow}/${firstClassification.links.subjects[0]}`)
        window.sessionStorage.removeItem('subjectsSeenThisSession')
      })
    })

    describe('without demo mode', function () {
      let subjectToBeClassified
      let workflow
      let classifications
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

        classifications = rootStore.classifications
        const onComplete = sinon.stub()
        classifications.setOnComplete(onComplete)

        // annotate a subject then finish the classification
        subjectToBeClassified = rootStore.subjects.active
        workflow = rootStore.workflows.active

        // Stubbing this because tests aren't setup to do the async testing
        sinon.stub(rootStore.classifications, 'submitClassification')
          .callsFake(() => rootStore.classifications.trackAlreadySeenSubjects(workflow.id, [subjectToBeClassified.id]))

        const taskSnapshot = Object.assign({}, singleChoiceTaskSnapshot, { taskKey: singleChoiceAnnotationSnapshot.task })
        taskSnapshot.createAnnotation = () => SingleChoiceAnnotation.create(singleChoiceAnnotationSnapshot)
        classifications.addAnnotation(taskSnapshot, singleChoiceAnnotationSnapshot.value)
        classifications.completeClassification({
          preventDefault: sinon.stub()
        })
      })

      it('should call submitClassification', function () {
        expect(classifications.submitClassification).to.have.been.calledOnce()
      })

      it('should track the already seen subject in session storage', function () {
        const alreadySeen = window.sessionStorage.getItem('subjectsSeenThisSession')
        const parsedSeen = JSON.parse(alreadySeen)
        expect(parsedSeen[0]).to.equal(`${workflow.id}/${subjectToBeClassified.id}`)
        window.sessionStorage.removeItem('subjectsSeenThisSession')
      })
    })
  })
})
