import { autorun, toJS } from 'mobx'
import {
  addDisposer, 
  getRoot, 
  isValidReference, 
  onAction,
  tryReference, 
  types 
} from 'mobx-state-tree'

import { convertWorkflowToUseSteps } from './helpers'
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

    get isThereTaskHelp () {
      const tasks = self.activeStepTasks

      return tasks.some(task => task.help)
    },

    get shouldWeShowDoneAndTalkButton () {
      const workflow = tryReference(() => getRoot(self).workflows?.active)
      const classification = tryReference(() => getRoot(self).classifications?.active)
      const step = tryReference(() => self.active)

      if (workflow && step && classification) {
        const disableTalk = classification.metadata.subject_flagged
        const lastStep = !step.next
        return lastStep &&
        workflow.configuration.hide_classification_summaries && // Default in model is to hide
        !disableTalk // &&
        // !completed TODO: implement classification completed validations per task?
      }

      return false
    },

    findTasksByType (type) {
      const tasksByType = Array.from(self.steps).map(([stepKey, step]) => {
        if (step?.tasks && step.tasks.length > 0) {
          return step.tasks.filter(task => {
            return task.type === type
          })
        }
        
        return []
      })

      return tasksByType.flat()
    },

    get interactionTask () {
      const [activeDrawingTask] = self.activeStepTasks.filter(task => task.type === 'drawing')
      const [transcriptionTask] = self.findTasksByType('transcription')

      return activeDrawingTask || transcriptionTask  || {}
    },

    get activeInteractionTask () {
      const [activeInteractionTask] = self.activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')

      return activeInteractionTask || {}
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
          let steps = workflow.steps
          let tasks = workflow.tasks
          const workflowHasSteps = (steps &&
            steps.length > 0 &&
            Object.keys(tasks).length > 0)
          if (!workflowHasSteps) {
            // backwards compatibility
            ({ steps, tasks } = convertWorkflowToUseSteps(workflow))
          }
          _setStepsAndTasks({ steps, tasks })
        }
      }, { name: 'WorkflowStepStore Workflow Observer autorun' })
      addDisposer(self, workflowDisposer)
    }

    function getNextStepKey () {
      const validStepReference = isValidReference(() => self.active)
      const stepKeys = self.steps.keys()
      if (validStepReference) {
        if (!!self.active.next) {
          return self.active.next
        } else {
          const stepKeysArray = Array.from(stepKeys)
          const currentStepIndex = stepKeysArray.indexOf(self.active.stepKey)
          return stepKeysArray[currentStepIndex + 1]
        }
      }

      return stepKeys.next().value
    }

    function resetSteps () {
      self.active = undefined
      self.steps.forEach(step => step.reset())
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

    function _setStepsAndTasks ({ steps, tasks }) {
      self.setSteps(steps)
      self.setTasks(tasks)
    }

    function setSteps (steps) {
      steps.forEach(([ stepKey, step ], index) => {
        let next
        // checking for there being a next step without accessing it directly
        // mobx throws errors for undefined indices because you can't observe those
        if (steps.length > 0 && index + 2 <= steps.length) {
          const [nextStepKey] = steps[index + 1]
          next = nextStepKey
        }

        self.steps.put(Object.assign({}, step, { stepKey, next }))
      })
    }

    function setTasks (tasks) {
      self.steps.forEach(function (step) {
        step.taskKeys.forEach((taskKey) => {
          // Set tasks object as a MobX observable JS map in the store
          // put is a MST method, not native to ES Map
          // the key is inferred from the identifier type of the target model
          const taskToStore = Object.assign({}, tasks[taskKey], { taskKey })
          try {
            step.tasks.push(taskToStore)
          } catch (error) {
            console.error(`${taskKey} ${taskToStore.type} is not a supported task type`)
            console.error(error)
          }
        })
      })
    }

    return {
      afterAttach,
      getNextStepKey,
      reset,
      resetSteps,
      selectStep,
      setSteps,
      setTasks
    }
  })

export default WorkflowStepStore
