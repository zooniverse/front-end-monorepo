import { autorun, toJS } from 'mobx'
import {
  addDisposer, 
  getRoot, 
  isValidReference, 
  onAction,
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

      if (workflow && classification) {
        const disableTalk = classification.metadata.subject_flagged
        return !self.active.isThereANextStep &&
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
      createAnnotationObserver()
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

    function createAnnotationObserver () {
      const annotationDisposer = autorun(() => {
        if (self.active?.isThereBranching) {
          // presumes one single choice task per step
          const [singleChoiceTask] = self.activeStepTasks.filter(task => task.type === 'single')
          onAction(getRoot(self), (call) => {
            if (call.path.endsWith(singleChoiceTask.annotation?.id) && call.name === 'update') {
              let nextStepKey
              const singleChoiceTaskAnswers = toJS(singleChoiceTask.answers)
              const nextTaskKey = singleChoiceTaskAnswers[call.args[0]].next
              self.steps.forEach(step => {
                if (step.taskKeys.includes(nextTaskKey)) {
                  nextStepKey = step.stepKey
                }
              })
              self.active.setNext(nextStepKey)
            }
          })
        }
        
      }, { name: 'Annotation Observer autorun' })
      addDisposer(self, annotationDisposer)
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
      const firstTask = workflow.tasks[first_task]

      function getStepTasksFromCombo (task) {
        task.tasks.forEach(function (taskKey) {
          taskKeys.splice(taskKeys.indexOf(taskKey), 1)
        })
        return task.tasks
      }

      function isThereBranching (task) {
        if (task.type === 'single') {
          return task.answers.some((answer, index) => {
            return answer.next && answer[index + 1]?.next && answer[index + 1].next !== answer.next
          })
        }

        return false
      }

      if (first_task) {
        let firstStep = {
          stepKey: 'S0',
          taskKeys: [first_task]
        }

        if (firstTask.type === 'combo') {
          const combo = firstTask
          firstStep.taskKeys = getStepTasksFromCombo(combo)
        }

        // next is set only when an answer is chosen
        if (!isThereBranching(firstTask)) {
          firstStep.next = firstTask.next
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

          let stepSnapshot = {
            previous: `S${index}`,
            stepKey: `S${index + 1}`,
            taskKeys: stepTasks
          }

          // next is set only when an answer is chosen
          if (!isThereBranching(task)) {
            stepSnapshot.next = `S${index + 2}`
          }

          self.steps.put(stepSnapshot)
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
