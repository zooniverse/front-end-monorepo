import { autorun, toJS } from 'mobx'
import {
  addDisposer,
  applySnapshot,
  getRoot,
  isValidReference,
  tryReference, 
  types 
} from 'mobx-state-tree'

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
    },

    get locale() {
      return getRoot(self).locale
    },

    get workflow() {
      return tryReference(() => getRoot(self).workflows?.active)
    }
  }))
  .actions(self => {
    function _onWorkflowChange() {
      if (self.workflow) {
        self.reset()
        self.setStepsAndTasks()
      }
    }

    function _onLocaleChange() {
      if (self.locale && self.workflow?.strings) {
        self.setTaskStrings()
      }
    }

    function afterAttach () {
      addDisposer(self, autorun(_onWorkflowChange))
      addDisposer(self, autorun(_onLocaleChange))
    }

    function getNextStepKey () {
      const validStepReference = isValidReference(() => self.active)
      const stepKeys = self.steps.keys()
      const stepKeysArray = Array.from(stepKeys)
      const [ firstStep ] = stepKeysArray
      if (validStepReference) {
        if (!!self.active.next) {
          return self.active.next
        } else {
          const currentStepIndex = stepKeysArray.indexOf(self.active.stepKey)
          return stepKeysArray[currentStepIndex + 1]
        }
      }

      return firstStep
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

    function setStepsAndTasks () {
      const { steps, tasks } = self.workflow
      self.setSteps(steps)
      self.setTasks(tasks)
    }

    function setSteps (steps) {
      steps.forEach(workflowStep => {
        const [ stepKey, step ] = workflowStep
        self.steps.put(Object.assign({}, step, { stepKey }))
      })
    }

    function setTasks (tasks) {
      self.steps.forEach(function (step) {
        step.taskKeys.forEach((taskKey) => {
          const taskToStore = { ...tasks[taskKey], taskKey }
          try {
            step.tasks.push(taskToStore)
          } catch (error) {
            console.error(`${taskKey} ${taskToStore.type} is not a supported task type`)
            console.error(error)
          }
        })
      })
    }

    function setTaskStrings() {
      const workflowStrings = self.workflow?.strings
      self.steps.forEach(function (step) {
        step.tasks.forEach((task) => {
          const prefix = `tasks.${task.taskKey}.`
          const strings = {}
          Object.entries(workflowStrings).forEach(([key, value]) => {
            if (key.startsWith(prefix)) {
              const newKey = key.slice(prefix.length)
              strings[newKey] = value
            }
          })
          try {
            applySnapshot(task.strings, strings)
          } catch (error) {
            console.error(`${taskKey} ${task.type}: could not apply language strings`)
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
      setStepsAndTasks,
      setSteps,
      setTasks,
      setTaskStrings
    }
  })

export default WorkflowStepStore
