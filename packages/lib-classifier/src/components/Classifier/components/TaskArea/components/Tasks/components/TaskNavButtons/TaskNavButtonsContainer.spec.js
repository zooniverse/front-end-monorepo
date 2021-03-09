import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'mobx-state-tree'
import { Factory } from 'rosie'
import sinon from 'sinon'
import TaskNavButtonsContainer from './TaskNavButtonsContainer'

import RootStore from '@store'
import Step from '@store/WorkflowStepStore/Step'
import { SubjectFactory, WorkflowFactory, ProjectFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('TaskNavButtonsContainer', function () {
  function setupMocks () {
    const singleChoiceTask = {
      answers: [{ label: 'yes', next: 'T1' }, { label: 'no' }],
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
    const subjectSnapshot = SubjectFactory.build({
      id: 'subject',
      metadata: {}
    })
    const projectSnapshot = ProjectFactory.build({
      id: 'project'
    })
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
    return rootStore
  }

  describe('when it renders', function () {
    let wrapper

    before(function () {
      const classifierStore = setupMocks()
      const store = { classifierStore }
      wrapper = shallow(<TaskNavButtonsContainer store={store} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render TaskNavButtons', function () {
      expect(wrapper.find('TaskNavButtons')).to.have.lengthOf(1)
    })
  })

  describe('#goToNextStep', function () {
    let wrapper
    let classifierStore

    beforeEach(function () {
      classifierStore = setupMocks()
      const store = { classifierStore }
      wrapper = shallow(<TaskNavButtonsContainer store={store} />)
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      wrapper.instance().goToNextStep()
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      step.tasks.forEach((task) => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should select the next step', function () {
      // set an answer to the branching task question, so that step.next is set.
      const classification = classifierStore.classifications.active
      const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
      singleChoiceAnnotation.update(0)
      wrapper.instance().goToNextStep()
      const step = classifierStore.workflowSteps.active
      expect(step.stepKey).to.equal('S1')
    })
  })

  describe('#goToPreviousStep', function () {
    let wrapper
    let classifierStore

    before(function () {
      classifierStore = setupMocks()
      const store = { classifierStore }
      wrapper = shallow(<TaskNavButtonsContainer store={store} />)
    })

    it('should not go back if there is not a previous step', function () {
      let activeStep = classifierStore.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S0')
      wrapper.instance().goToPreviousStep()
      activeStep = classifierStore.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S0')
    })

    describe('when there is a previous step', function () {
      before(function() {
        // set an answer to the branching task question, so that step.next is set.
        const classification = classifierStore.classifications.active
        const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
        singleChoiceAnnotation.update(0)
        // push the first task to the history stack
        wrapper.instance().goToNextStep()
        wrapper.instance().goToPreviousStep()
      })

      it('should undo the most recent step', function () {
        const { latest, steps} = classifierStore.annotatedSteps
        expect(steps.size).to.equal(1)
        expect(latest.step.stepKey).to.equal('S0')
      })

      it('should select the previous step', function () {
        const activeStep = classifierStore.workflowSteps.active
        expect(activeStep.stepKey).to.equal('S0')
      })

      it('should remove annotations for the current task', function () {
        const { annotations, steps } = classifierStore.annotatedSteps
        expect(steps.size).to.equal(1)
        const [annotation] = annotations.filter(annotation => annotation.task === 'T1')
        expect(annotation).to.be.undefined()
      })
    })
  })

  describe('#onSubmit', function () {
    let wrapper
    let classifierStore
    const preventDefaultSpy = sinon.spy()

    before(function () {
      classifierStore = setupMocks()
      const store = { classifierStore }
      sinon.stub(classifierStore.classifications, 'completeClassification')

      wrapper = shallow(<TaskNavButtonsContainer store={store} />)
    })

    afterEach(function () {
      classifierStore.classifications.completeClassification.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    after(function () {
      classifierStore.classifications.completeClassification.restore()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      step.tasks.forEach((task) => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should prevent the event default', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should call complete the classification', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(classifierStore.classifications.completeClassification).to.have.been.calledOnce()
    })
  })
})
