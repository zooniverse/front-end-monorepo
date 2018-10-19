import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'

import Step from './Step'
import { DrawingTask, MultipleChoiceTask, SingleChoiceTask } from './tasks'

const WorkflowStepStore = types
  .model('WorkflowStepStore', {
    active: types.maybe(types.reference(Step)),
    steps: types.map(Step),
    tasks: types.map(types.union({ dispatcher: (snapshot) => {
      if (snapshot.type === 'drawing') return DrawingTask
      if (snapshot.type === 'multiple') return MultipleChoiceTask
      if (snapshot.type === 'single') return SingleChoiceTask
    }}, DrawingTask, MultipleChoiceTask, SingleChoiceTask))
  })
  .views(self => ({
    get activeStepTasks () {
      if (self.active) {
        return self.active.taskKeys.map((taskKey) => {
          return self.tasks.get(taskKey)
        })
      }

      return []
    },

    isThereANextStep () {
      const nextStep = self.getNextStepKey()
      return nextStep && nextStep !== 'summary'
    },

    isThereAPreviousStep () {
      const firstStep = self.steps.keys().next()
      return self.active.stepKey !== 'summary' && self.active.stepKey !== firstStep.value
    }
  }))
  .actions(self => {
    function afterAttach () {
      createWorkflowObserver()
    }

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
        if (workflow) {
          self.reset()
          if (workflow.steps &&
              workflow.steps.size > 0 &&
              Object.keys(workflow.tasks).length > 0) {
            self.setStepsAndTasks(workflow)
          } else {
            // backwards compatibility
            self.convertWorkflowToUseSteps(workflow)
            self.setTasks(workflow)
          }
        }
      })
      addDisposer(self, workflowDisposer)
    }

    function getNextStepKey () {
      const stepKeys = self.steps.keys()
      if (self.active) {
        const stepKeysArray = Array.from(stepKeys)
        const currentStepIndex = stepKeysArray.indexOf(self.active.stepKey)
        return stepKeysArray[currentStepIndex + 1]
      }

      return stepKeys.next().value
    }

    function reset () {
      self.active = undefined
      self.steps.clear()
      self.tasks.clear()
    }

    function selectStep (stepKey = getNextStepKey()) {
      const step = self.steps.get(stepKey)
      if (step) {
        self.active = stepKey
      }
    }

    function setStepsAndTasks (workflow) {
      self.setSteps(workflow)
      self.setTasks(workflow)
      self.selectStep()
    }

    function setSteps (workflow) {
      const stepEntries = workflow.steps.entries()
      stepEntries.forEach((entry) => {
        const newStep = Step.create(entry[1])
        self.steps.put(Object.assign({}, newStep, { stepKey: entry[0] }))
      })
    }

    function setTasks (workflow) {
      const taskKeys = Object.keys(workflow.tasks)

      taskKeys.forEach((taskKey) => {
        // Set tasks object as a MobX observable JS map in the store
        // put is a MST method, not native to ES Map
        // the key is inferred from the identifier type of the target model
        const taskToStore = Object.assign({}, workflow.tasks[taskKey], { taskKey })
        self.tasks.put(taskToStore)
      })
    }

    function convertWorkflowToUseSteps (workflow) {
      const taskKeys = Object.keys(workflow.tasks)

      if (workflow.first_task) {
        const firstStep = {
          stepKey: 'S0',
          taskKeys: [workflow.first_task]
        }

        self.steps.put(firstStep)
      }

      taskKeys.forEach((taskKey, index) => {
        if (taskKey !== workflow.first_task &&
            (workflow.tasks[taskKey].type !== 'combo' ||
            workflow.tasks[taskKey].type !== 'shortcut')) {
          self.steps.put({
            stepKey: `S${index + 1}`,
            taskKeys: [taskKey]
          })
        }
      })

      self.selectStep()
    }

    return {
      afterAttach,
      convertWorkflowToUseSteps,
      getNextStepKey,
      reset,
      selectStep,
      setSteps,
      setStepsAndTasks,
      setTasks
    }
  })

export default WorkflowStepStore
