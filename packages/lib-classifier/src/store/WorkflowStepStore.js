import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, tryReference, types } from 'mobx-state-tree'

import Step from './Step'

const WorkflowStepStore = types
  .model('WorkflowStepStore', {
    active: types.safeReference(Step),
    steps: types.map(Step)
  })
  .views(self => ({
    get activeStepTasks () {
      const validStepReference = isValidReference(() => self.active)
      if (validStepReference) {
        return self.active.tasks
      }

      return []
    },

    isThereANextStep () {
      const nextStep = self.getNextStepKey()
      return nextStep && nextStep !== 'summary'
    },

    isThereAPreviousStep () {
      const validStepReference = isValidReference(() => self.active)
      if (validStepReference) {
        const firstStep = self.steps.keys().next()
        return self.active.stepKey !== 'summary' && self.active.stepKey !== firstStep.value
      }

      return false
    },

    get isThereTaskHelp () {
      const tasks = self.activeStepTasks

      return tasks.some(task => task.help)
    },

    get shouldWeShowDoneAndTalkButton () {
      const isThereANextStep = self.isThereANextStep()
      const workflow = tryReference(() => getRoot(self).workflows?.active)
      const classification = tryReference(() => getRoot(self).classifications?.active)

      if (workflow && classification) {
        const disableTalk = classification.metadata.subject_flagged
        return !isThereANextStep &&
        workflow.configuration.hide_classification_summaries && // TODO: we actually want to reverse this logic
        !disableTalk // &&
        // !completed TODO: implement classification completed validations per task?
      }

      return false
    }
  }))
  .actions(self => {
    function afterAttach () {
      createWorkflowObserver()
    }

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const workflow = tryReference(() => getRoot(self).workflows?.active)
        if (workflow) {
          self.reset()
          if (workflow.steps &&
            workflow.steps.length > 0 &&
            Object.keys(workflow.tasks).length > 0) {
            self.setStepsAndTasks(workflow)
          } else {
            // backwards compatibility
            self.convertWorkflowToUseSteps(workflow)
            self.setTasks(workflow)
          }
        }
      }, { name: 'WorkflowStepStore Workflow Observer autorun' })
      addDisposer(self, workflowDisposer)
    }

    function getNextStepKey () {
      const validStepReference = isValidReference(() => self.active)
      const stepKeys = self.steps.keys()
      if (validStepReference) {
        const stepKeysArray = Array.from(stepKeys)
        const currentStepIndex = stepKeysArray.indexOf(self.active.stepKey)
        return stepKeysArray[currentStepIndex + 1]
      }

      return stepKeys.next().value
    }

    function getPreviousStepKey () {
      const validStepReference = isValidReference(() => self.active)
      if (validStepReference) {
        const stepsKeys = Array.from(self.steps.keys())
        const currentStepIndex = stepsKeys.indexOf(self.active.stepKey)
        return stepsKeys[currentStepIndex - 1]
      }
      return undefined
    }

    function resetSteps () {
      self.active = undefined
      self.steps.forEach(step => step.reset())
      self.selectStep()
    }

    function reset () {
      self.steps.clear()
    }

    function selectStep (stepKey = getNextStepKey()) {
      const step = self.steps.get(stepKey)
      if (step) {
        self.active = stepKey
        self.activeStepTasks.forEach(task => task.start())
      }
    }

    function setStepsAndTasks (workflow) {
      self.setSteps(workflow)
      self.setTasks(workflow)
      self.selectStep()
    }

    function setSteps (workflow) {
      workflow.steps.forEach(([ stepKey, step ]) => {
        self.steps.put(Object.assign({}, step, { stepKey }))
      })
    }

    function setTasks (workflow) {
      self.steps.forEach(function (step) {
        step.taskKeys.forEach((taskKey) => {
          // Set tasks object as a MobX observable JS map in the store
          // put is a MST method, not native to ES Map
          // the key is inferred from the identifier type of the target model
          const taskToStore = Object.assign({}, workflow.tasks[taskKey], { taskKey })
          try {
            step.tasks.push(taskToStore)
          } catch (error) {
            console.error(`${taskKey} ${taskToStore.type} is not a supported task type`)
            console.error(error)
          }
        })
      })
    }

    function convertWorkflowToUseSteps (workflow) {
      const taskKeys = Object.keys(workflow.tasks)
      const { first_task } = workflow

      function getStepTasksFromCombo (task) {
        task.tasks.forEach(function (taskKey) {
          taskKeys.splice(taskKeys.indexOf(taskKey), 1)
        })
        return task.tasks
      }

      if (first_task) {
        let firstStep = {
          stepKey: 'S0',
          taskKeys: [first_task]
        }

        if (workflow.tasks[first_task].type === 'combo') {
          const combo = workflow.tasks[first_task]
          firstStep.taskKeys = getStepTasksFromCombo(combo)
        }

        taskKeys.splice(taskKeys.indexOf(first_task), 1)
        self.steps.put(firstStep)
      }

      taskKeys.forEach((taskKey, index) => {
        const task = workflow.tasks[taskKey]
        if (task.type !== 'shortcut') {
          let stepTasks = [taskKey]
          if (task.type === 'combo') {
            stepTasks = getStepTasksFromCombo(task)
          }
          self.steps.put({
            stepKey: `S${index + 1}`,
            taskKeys: stepTasks
          })
        }
      })

      self.selectStep()
    }

    return {
      afterAttach,
      convertWorkflowToUseSteps,
      getNextStepKey,
      getPreviousStepKey,
      reset,
      resetSteps,
      selectStep,
      setSteps,
      setStepsAndTasks,
      setTasks
    }
  })

export default WorkflowStepStore
