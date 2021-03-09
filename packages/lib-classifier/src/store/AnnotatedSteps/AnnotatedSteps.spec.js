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
      answers: [
        {
          label: 'yes',
          next: 'T1'
        },
        {
          label: 'no',
          next: 'T2'
        }
      ],
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
    const alternativeTask = {
      answers: [{ label: 'oranges' }, { label: 'apples' }, { label: 'bananas' }],
      question: 'Favourite fruit?',
      required: '',
      taskKey: 'T2',
      type: 'multiple'
    }
    const workflowSnapshot = WorkflowFactory.build({
      id: 'tasksWorkflow',
      display_name: 'A test workflow',
      first_task: 'T0',
      tasks: {
        T0: singleChoiceTask,
        T1: multipleChoiceTask,
        T2: alternativeTask
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
    it('should have one step', function () {
      expect(store.annotatedSteps.steps.size).to.equal(1)
    })

    it('should store the first workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S0')
      const { step } = store.annotatedSteps.latest
      expect(step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { annotations } = store.annotatedSteps.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T0')
    })

    it('should not be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.false()
    })
  })

  describe('after moving to the second step', function () {
    before(function () {
      const [ branchingQuestionAnnotation ] = store.annotatedSteps.latest.annotations
      // answer Yes to the branching question.
      branchingQuestionAnnotation.update(0)
      store.annotatedSteps.next()
      const [ multipleChoiceAnnotation ] = store.annotatedSteps.latest.annotations
      // answer the T1 question so we can test redo.
      multipleChoiceAnnotation.update([0,1])
    })

    it('should have two steps', function () {
      expect(store.annotatedSteps.steps.size).to.equal(2)
    })

    it('should store the second workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S1')
      const { step } = store.annotatedSteps.latest
      expect(step.stepKey).to.equal('S1')
    })

    it('should store the second step\'s annotations', function () {
      const { annotations } = store.annotatedSteps.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T1')
    })

    it('should be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.true()
    })

    describe('on undo', function () {
      before(function () {
        store.annotatedSteps.back()
      })

      it('should store the first workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S0')
        const { step } = store.annotatedSteps.latest
        expect(step.stepKey).to.equal('S0')
      })

      it('should store the first step\'s annotations', function () {
        const { annotations } = store.annotatedSteps.latest
        const [ annotation ] = annotations
        expect(annotations.length).to.equal(1)
        expect(annotation.task).to.equal('T0')
      })

      it('should not be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.false()
      })
    })

    describe('on redo', function () {
      before(function () {
        store.annotatedSteps.next()
      })

      it('should return to the second workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S1')
        const { step } = store.annotatedSteps.latest
        expect(step.stepKey).to.equal('S1')
      })

      it('should remember the second step\'s annotations', function () {
        const { annotations } = store.annotatedSteps.latest
        const [ annotation ] = annotations
        expect(annotations.length).to.equal(1)
        expect(annotation.task).to.equal('T1')
        expect(annotation.value).to.deep.equal([0,1])
      })

      it('should be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.true()
      })
    })

    describe('on going back and choosing a different branch', function () {
      before(function () {
        store.annotatedSteps.back()
        const [ branchingQuestionAnnotation ] = store.annotatedSteps.latest.annotations
        // answer No to the branching question.
        branchingQuestionAnnotation.update(1)
        store.annotatedSteps.next()
      })

      it('should load a new workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S2')
        const { step } = store.annotatedSteps.latest
        expect(step.stepKey).to.equal('S2')
      })

      it('should clear the second step\'s annotations from history', function () {
        const classification = store.classifications.active
        const annotation = classification.annotation('T1')
        expect(annotation).to.be.undefined()
      })

      it('should be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.true()
      })
    })
  })

  describe('on subject advance', function () {

    before(function () {
      store = setupMocks()
      const [ branchingQuestionAnnotation ] = store.annotatedSteps.latest.annotations
      // answer Yes to the branching question.
      branchingQuestionAnnotation.update(0)
      store.annotatedSteps.next()
      store.subjects.advance()
    })

    it('should store the first workflow step', function () {
      const { latest } = store.annotatedSteps
      expect(store.workflowSteps.active.stepKey).to.equal('S0')
      expect(latest.step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { latest } = store.annotatedSteps
      expect(latest.annotations.length).to.equal(1)
      const [ annotation ] = latest.annotations
      expect(annotation.task).to.equal('T0')
    })

    it('should not be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.false()
    })
  })
})
