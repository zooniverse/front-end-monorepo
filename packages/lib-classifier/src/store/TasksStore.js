import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import Task from './Task'

const TasksStore = types
  .model('TasksStore', {
    tasks: types.optional(types.map(Task), {}),
    active: types.maybe(types.reference(Task)),
  })

  .actions(self => ({
    afterAttach () {
      self.createWorkflowObserver()
    },

    createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
        if (workflow) {
          self.reset()
          self.populateTasks(workflow)
        }
      })
      addDisposer(self, workflowDisposer)
    },

    next () {
      self.setActive(self.active.next)
    },

    populateTasks (workflow) {
      const { tasks } = workflow
      for (const key in tasks) {
        console.info(tasks[key])
        if (tasks.hasOwnProperty(key)) {
          const task = Object.assign({}, tasks[key])
          task.id = key
          self.tasks.set(key, task)
        }
      }
      self.setActive(workflow.first_task)
    },

    setActive (id) {
      self.active = id
    },

    reset () {
      self.active = null
      self.tasks.clear()
    }
  }))

export default TasksStore
