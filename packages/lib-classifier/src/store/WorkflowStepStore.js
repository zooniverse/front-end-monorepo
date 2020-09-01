import { autorun, toJS } from 'mobx'
import {
  addDisposer, 
  getRoot, 
  isValidReference, 
  onAction,
  tryReference, 
  types 
} from 'mobx-state-tree'
import { difference, isEqual } from 'lodash'

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
        return !step.isThereANextStep &&
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
            if (call.path.endsWith(singleChoiceTask?.annotation?.id) && call.name === 'update') {
              let nextStepKey
              const nextKey = singleChoiceTask.answers[call.args[0]].next
              if (nextKey?.startsWith('T')) {
                // Backwards compatibility
                self.steps.forEach(step => {
                  if (step.taskKeys.includes(nextKey)) {
                    nextStepKey = step.stepKey
                  }
                })
              } else {
                nextStepKey = nextKey
              }
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

      function getTaskKeysIncludedInComboTasks (tasks) {
        let taskKeys
        const comboTasks = Object.values(tasks).filter(task => task?.type === 'combo')
        taskKeys = comboTasks.map(combo => combo.tasks)
        return taskKeys.flat()
      }

      function isThereBranching (task) {
        return task?.answers.some((answer, index) => {
          if (task.answers.length > index + 1) {
            return answer.next !== task.answers[index + 1].next
          }
          return false
        })
      }

      const taskKeysIncludedInComboTasks = getTaskKeysIncludedInComboTasks(workflow.tasks)
      const taskKeysToConvertToSteps = difference(taskKeys, taskKeysIncludedInComboTasks)

      const { first_task } = workflow
      const firstTask = workflow.tasks[first_task]

      if (first_task) {
        let firstStep = {
          next: firstTask.next, // temporarily set next to task key, convert to step key once steps created
          stepKey: 'S0',
          taskKeys: [first_task]
        }

        if (firstTask.type === 'combo') {
          firstStep.taskKeys = firstTask.tasks
        }

        const isFirstSingleChoiceTaskNotBranching = firstTask.type === 'single' && !isThereBranching(firstTask)
        if (isFirstSingleChoiceTaskNotBranching) {
          firstStep.next = firstTask.answers[0]?.next
        }

        taskKeysToConvertToSteps.splice(taskKeysToConvertToSteps.indexOf(first_task), 1)

        self.steps.put(firstStep)
      }

      taskKeysToConvertToSteps.forEach((taskKey, index) => {
        const task = workflow.tasks[taskKey]
        if (task.type !== 'shortcut') {
          let stepTasks = [taskKey]
          if (task.type === 'combo') {
            stepTasks = task.tasks
          }

          let stepSnapshot = {
            next: task.next, // temporarily set next to task key, convert to step key once steps created
            previous: `S${index}`,
            stepKey: `S${index + 1}`,
            taskKeys: stepTasks
          }

          const isSingleChoiceTaskNotBranching = task.type === 'single' && !isThereBranching(task)
          if (isSingleChoiceTaskNotBranching) {
            stepSnapshot.next = task.answers[0]?.next
          }

          self.steps.put(stepSnapshot)
        }
      })

      function getStepKeyFromTaskKey(steps, taskKey) {
        let stepKey
        steps.forEach(step => {
          if (step.taskKeys.includes(taskKey)) {
            stepKey = step.stepKey
          }
        })
        return stepKey
      }

      // convert step.next from task key to step key
      self.steps.forEach(step => {
        if (Object.keys(workflow.tasks).includes(step.next)) {
          const stepKeyFromTaskKey = getStepKeyFromTaskKey(self.steps, step.next)
          if (!!stepKeyFromTaskKey) {
            step.setNext(stepKeyFromTaskKey)
          } else { // next task is combo task
            let nextStepKey
            const comboTask = workflow.tasks[step.next]
            self.steps.forEach(step => {
              if (isEqual(step.taskKeys, comboTask.tasks)) {
                nextStepKey = step.stepKey
              }
            })
            step.setNext(nextStepKey)
          }
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
