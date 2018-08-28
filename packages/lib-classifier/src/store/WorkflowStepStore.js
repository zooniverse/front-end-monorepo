import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import Step from './Step'
import { SingleChoiceTask, MultipleChoiceTask } from './Task'

const WorkflowStepStore = types
  .model('WorkflowStepStore', {
    active: types.maybe(types.reference(Step)),
    steps: types.maybe(types.map(Step)),
    tasks: types.maybe(types.map(types.union((snapshot) => {
      if (snapshot.type === 'SingleChoiceTask') return SingleChoiceTask;
      if (snapshot.type === 'MultipleChoiceTask') return MultipleChoiceTask;
    }, SingleChoiceTask, MultipleChoiceTask)))
  })
  .views(
    get activeStepTasks() {
      if (self.active) {
        return self.active.taskKeys.map((taskKey) => {
          self.tasks.get(taskKey)
        })
      }

      return []
    }
  )
  .actions(self => {
    function afterAttach() {
      createWorkflowObserver()
    }

    function reset() {
      self.active = null
      self.steps = null
      self.tasks = null
    }

    function setStepsAndTasks(workflow) {
      const taskKeys = Object.keys(workflow.tasks)
      self.steps = workflow.steps
      if (taskKeys.length > 0) {
        taskKeys.forEach((taskKey) => {
          // Set tasks object as a MobX observable JS map in the store
          self.tasks.set(taskKey, workflow.tasks[taskKey])
        })
      }

      self.selectStep()
    }

    function createWorkflowObserver() {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
        if (workflow) {
          self.reset()
          if (workflow.steps.size > 0) {
            self.setStepsAndTasks(workflow)
          } else {
            throw new Error('Current active workflow does not have any defined steps with tasks.')
          }
        }
      })
      addDisposer(self, workflowDisposer)
    }

    function getStepKey(index = 0) {
      const stepKeys = self.steps.keys()
      return stepKeys[index]
    }

    function setActive(step, tasks) {
      self.active = step
    }

    function selectStep(stepKey = getStepKey()) {
      const step = self.steps.get(stepKey)

      self.setActive(step)
    }

    return {
      afterAttach,
      getStepKey,
      selectStep
    }
  })

export default WorkflowStepStore
