import { toJS } from 'mobx'
import WorkflowStepStore from './WorkflowStepStore'
import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import WorkflowStore from './WorkflowStore'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory,
  ProjectFactory,
  SubjectFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'
import { convertMapToArray } from './utils'

const workflowWithSteps = WorkflowFactory.build({
  tasks: { T1: SingleChoiceTaskFactory.build(), T2: MultipleChoiceTaskFactory.build() },
  steps: [
    ['S1', { taskKeys: ['T1'] }],
    ['S2', { taskKeys: ['T2'] }]
  ]
})
const workflowWithoutSteps = WorkflowFactory.build({
  tasks: { T1: SingleChoiceTaskFactory.build(), T2: MultipleChoiceTaskFactory.build() }
})
const subject = SubjectFactory.build()

describe('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.exist
    expect(WorkflowStepStore).to.be.an('object')
  })

  describe('when the workflow has defined steps', function () {
    let clientStub
    let rootStore
    before(function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflowWithSteps.id })
      clientStub = stubPanoptesJs({
        projects: project,
        subjects: subject,
        workflows: workflowWithSteps
      })
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        workflows: WorkflowStore.create()
      }, { client: clientStub })
      rootStore.projects.setActive(project.id)
    })

    describe('should set the steps', function () {
      let storedSteps
      before(function () {
        const { workflowSteps } = rootStore
        // We convert the workflowSteps observables back to vanilla JS
        // We convert the JS output to an array of pairs
        // The default behavior in MobX is to convert maps to objects
        // However we will be storing the steps map as an array of pairs on Panoptes
        // to preserve step order
        const workflowStepsJSON = toJS(workflowSteps, { exportMapsAsObjects: false })
        storedSteps = convertMapToArray(workflowStepsJSON.steps, { pairs: true })
      })

      it('should have the expected steps set', function () {
        expect(storedSteps).to.have.lengthOf(workflowWithSteps.steps.length)
        storedSteps.forEach((step, index) => {
          expect(step[0]).to.equal(workflowWithSteps.steps[index][0])
        })
      })

      it('should have the expected taskKeys for each step', function () {
        storedSteps.forEach((step, stepIndex) => {
          expect(step[1].taskKeys).to.have.lengthOf(workflowWithSteps.steps[stepIndex][1].taskKeys.length)
          step[1].taskKeys.forEach((taskKey, taskIndex) => {
            expect(taskKey).to.equal(workflowWithSteps.steps[stepIndex][1].taskKeys[taskIndex])
          })
        })
      })
    })

    it('should set the tasks', function () {
      const { workflowSteps } = rootStore
      Object.keys(workflowWithSteps.tasks).forEach((taskKey) => {
        const storedTask = Object.assign({}, workflowSteps.tasks.toJSON()[taskKey])
        delete storedTask.taskKey // taskKey property is added from the original to be used by MST for serialization
        const originalTask = workflowWithSteps.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = rootStore
      const firstStep = workflowWithSteps.steps[0]
      const storedStep = workflowSteps.active.toJSON()
      expect(storedStep.stepKey).to.equal(firstStep[0])
      firstStep[1].taskKeys.forEach((taskKey, index) => {
        expect(taskKey).to.equal(firstStep[1].taskKeys[index])
      })
      expect(storedStep.next).to.equal(firstStep[1].next)
    })
  })

  describe('when the workflow does not have defined steps', function () {
    let clientStub
    let rootStore
    before(function () {
      workflowWithoutSteps.first_task = 'T1'
      const project = ProjectFactory.build({}, { activeWorkflowId: workflowWithoutSteps.id })
      clientStub = stubPanoptesJs({
        projects: project,
        subjects: subject,
        workflows: workflowWithoutSteps
      })
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        workflows: WorkflowStore.create()
      }, { client: clientStub })
      rootStore.projects.setActive(project.id)
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = rootStore

      const workflowStepsJSON = toJS(workflowSteps, { exportMapsAsObjects: false })
      const storedSteps = convertMapToArray(workflowStepsJSON.steps, { pairs: true })

      expect(storedSteps[0][1].taskKeys.includes(workflowWithoutSteps.first_task)).to.be.true
      expect(storedSteps[1][1].taskKeys.includes('T2')).to.be.true
    })

    it('should set the tasks', function () {
      const { workflowSteps } = rootStore
      Object.keys(workflowWithSteps.tasks).forEach((taskKey) => {
        const storedTask = Object.assign({}, workflowSteps.tasks.toJSON()[taskKey])
        delete storedTask.taskKey // taskKey property is added from the original to be used by MST for serialization
        const originalTask = workflowWithSteps.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = rootStore
      const storedStep = workflowSteps.active.toJSON()
      expect(storedStep.stepKey).to.equal('S0')
      storedStep.taskKeys.forEach((taskKey, index) => {
        expect(taskKey).to.equal(workflowWithoutSteps.first_task)
      })
    })
  })
})
