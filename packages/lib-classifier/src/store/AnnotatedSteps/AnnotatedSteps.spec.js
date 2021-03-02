import { Factory } from 'rosie'
import sinon from 'sinon'

import AnnotatedSteps from './'

import RootStore from '@store'
import { SubjectFactory, WorkflowFactory, ProjectFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > AnnotatedSteps', function () {
  let store

  function setupMocks () {
    const singleChoiceTask = {
      answers: [{ label: 'yes' }, { label: 'no' }],
      next: 'T1',
      question: 'Is there a cat?',
      required: '',
      taskKey: 'T0',
      type: 'single'
    }
    const multipleChoiceTask = {
      answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
      question: 'What is/are the cat(s) doing?',
      required: '',
      taskKey: 'T1',
      type: 'multiple'
    }
    const workflowSnapshot = WorkflowFactory.build({
      id: 'tasksWorkflow',
      display_name: 'A test workflow',
      first_task: 'T0',
      tasks: {
        T0: singleChoiceTask,
        T1: multipleChoiceTask
      },
      version: '0.0'
    })
    const subjectSnapshot = SubjectFactory.build()
    const projectSnapshot = ProjectFactory.build()
    const { panoptes } = stubPanoptesJs({
      field_guides: [],
      projects: [projectSnapshot],
      subjects: Factory.buildList('subject', 10),
      tutorials: [],
      workflows: [workflowSnapshot]
    })
    const client = {
      caesar: { request: sinon.stub().callsFake(() => Promise.resolve({})) },
      panoptes,
      tutorials: {
        get: sinon.stub().callsFake(() =>
          Promise.resolve({ body: {
            tutorials: []
          }})
        )
      }
    }
    const rootStore = RootStore.create({
      projects: {
        active: projectSnapshot.id,
        resources: {
          [projectSnapshot.id]: projectSnapshot
        }
      },
      subjects: {
        active: subjectSnapshot.id,
        resources: {
          [subjectSnapshot.id]: subjectSnapshot
        }
      },
      workflows: {
        active: workflowSnapshot.id,
        resources: {
          [workflowSnapshot.id]: workflowSnapshot
        }
      }
    }, {
      authClient: {
        checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null)),
        checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null))
      },
      client
    })
    rootStore.workflows.setResources([workflowSnapshot])
    rootStore.workflows.setActive(workflowSnapshot.id)
    rootStore.subjects.setResources([subjectSnapshot])
    rootStore.subjects.advance()
    const classification = rootStore.classifications.active
    const activeStep = rootStore.workflowSteps.active
    activeStep.tasks.forEach(task => {
      classification.addAnnotation(task)
    })
    return rootStore
  }

  before(function () {
    store = setupMocks()
  })

  it('should exist', function () {
    expect(store.annotatedSteps).to.be.ok()
    expect(store.annotatedSteps).to.be.an('object')
  })

  describe('when the workflow starts', function () {
    it('should be empty', function () {
      expect(store.annotatedSteps.steps).to.be.empty()
    })

    it('should not have a latest step', function () {
      expect(store.annotatedSteps.latest).to.be.undefined()
    })

    it('should not be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.false()
    })
  })

  describe('after the first workflow step', function () {
    before(function () {
      const { annotatedSteps, classifications, workflowSteps } = store
      const step = workflowSteps.active
      const classification = classifications.active
      const annotations = step.tasks.map(task => classification.annotation(task))
      annotatedSteps.next({ step, annotations })
      workflowSteps.selectStep()
    })

    it('should have one step', function () {
      expect(store.annotatedSteps.steps.size).to.equal(1)
    })

    it('should store the first workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S1')
      const { step } = store.annotatedSteps.latest
      expect(step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { annotations } = store.annotatedSteps.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T0')
    })

    it('should be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.true()
    })

    describe('on undo', function () {
      before(function () {
        store.annotatedSteps.back()
      })

      it('should be empty', function () {
        expect(store.annotatedSteps.steps).to.be.empty()
      })

      it('should not have a latest step', function () {
        expect(store.annotatedSteps.latest).to.be.undefined()
      })

      it('should not be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.false()
      })
    })
  })

  describe('on reset', function () {
    before(function () {
      const { annotatedSteps, classifications, workflowSteps } = store
      const step = workflowSteps.active
      const classification = classifications.active
      const annotations = step.tasks.map(task => classification.annotation(task))
      annotatedSteps.next({ step, annotations })
      annotatedSteps.reset()
    })

    it('should be empty', function () {
      expect(store.annotatedSteps.steps).to.be.empty()
    })

    it('should not have a latest step', function () {
      expect(store.annotatedSteps.latest).to.be.undefined()
    })

    it('should not be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.false()
    })
  })
})
