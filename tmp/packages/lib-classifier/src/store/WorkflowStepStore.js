import { autorun } from 'mobx'
import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'

import Step from './Step'
import { DrawingTask, DataVisAnnotationTask, MultipleChoiceTask, SingleChoiceTask } from './tasks'

const WorkflowStepStore = types
  .model('WorkflowStepStore', {
    active: types.maybe(types.reference(Step)),
    steps: types.map(Step),
    tasks: types.map(types.union({ dispatcher: (snapshot) => {
      if (snapshot.type === 'drawing') return DrawingTask
      if (snapshot.type === 'multiple') return MultipleChoiceTask
      if (snapshot.type === 'single') return SingleChoiceTask
      if (snapshot.type === 'dataVisAnnotation') return DataVisAnnotationTask
    } }, DrawingTask, DataVisAnnotationTask, MultipleChoiceTask, SingleChoiceTask))
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
    },

    get isThereTaskHelp () {
      const tasks = self.activeStepTasks

      return tasks.some(task => task.help)
    },

    get shouldWeShowDoneAndTalkButton () {
      const isThereANextStep = self.isThereANextStep()
      const workflow = getRoot(self).workflows.active
      const classification = getRoot(self).classifications.active

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
      createClassificationObserver()
    }

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
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
      })
      addDisposer(self, workflowDisposer)
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
          if (call.name === 'completeClassification') self.resetSteps()
        })
      })
      addDisposer(self, classificationDisposer)
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

    function getPreviousStepKey () {
      const stepsKeys = Array.from(self.steps.keys())
      const currentStepIndex = stepsKeys.indexOf(self.active.stepKey)
      return stepsKeys[currentStepIndex - 1]
    }

    function resetSteps () {
      self.active = undefined
      self.selectStep()
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
      workflow.steps.forEach((entry) => {
        const newStep = Step.create({ stepKey: entry[0], taskKeys: entry[1].taskKeys, next: entry[1].next })
        self.steps.put(newStep)
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
