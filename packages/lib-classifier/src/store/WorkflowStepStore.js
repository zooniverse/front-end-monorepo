import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import Step from './Step'
import { SingleChoiceTask, MultipleChoiceTask } from './tasks'

const WorkflowStepStore = types
  .model('WorkflowStepStore', {
    active: types.maybe(types.reference(Step)),
    steps: types.map(Step),
    tasks: types.map(types.union({ dispatcher: (snapshot) => {
      if (snapshot.type === 'SingleChoiceTask') return SingleChoiceTask
      if (snapshot.type === 'MultipleChoiceTask') return MultipleChoiceTask
    }}, SingleChoiceTask, MultipleChoiceTask))
  })
  .views(self => ({
    get activeStepTasks() {
      if (self.active) {
        return self.active.taskKeys.map((taskKey) => {
          self.tasks.get(taskKey)
        })
      }

      return []
    }
  }))
  .actions(self => {
    function afterAttach() {
      createWorkflowObserver()
    }

    function reset() {
      self.active = undefined
      self.steps.clear()
      self.tasks.clear()
    }

    function setStepsAndTasks(workflow) {
      const taskKeys = Object.keys(workflow.tasks)
      const stepEntries = workflow.steps.entries()
      stepEntries.forEach((entry) => {
        const newStep = Step.create(entry[1])
        self.steps.put(Object.assign({}, newStep, { stepKey: entry[0] }))
      })
      taskKeys.forEach((taskKey) => {
        // Set tasks object as a MobX observable JS map in the store
        // put is a MST method, not native to ES Map
        // the key is inferred from the identifier type of the target model
        self.tasks.put(Object.assign({}, workflow.tasks[taskKey], { taskKey }))
      })

      self.selectStep()
    }

    function createWorkflowObserver() {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
        if (workflow) {
          self.reset()
          if (workflow.steps &&
              workflow.steps.size > 0 && 
              Object.keys(workflow.tasks).length > 0)
          {
            self.setStepsAndTasks(workflow)
          }
        }
      })
      addDisposer(self, workflowDisposer)
    }

    function getStepKey(index = 0) {
      const stepKeys = self.steps.keys()
      return stepKeys[index]
    }

    function selectStep(stepKey = getStepKey()) {
      const step = self.steps.get(stepKey)

      if (step) {
        self.active = stepKey
      }
    }

    return {
      afterAttach,
      getStepKey,
      selectStep
    }
  })

export default WorkflowStepStore
