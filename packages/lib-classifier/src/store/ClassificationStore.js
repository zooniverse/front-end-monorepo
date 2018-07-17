import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'

import Annotation from './Annotation'

const ClassificationStore = types
  .model('ClassificationStore', {
    active: types.maybe(types.reference(Annotation)),
    annotations: types.optional(types.map(Annotation), {})
  })

  .actions(self => ({
    afterAttach () {
      self.createTaskObserver()
    },

    createTaskObserver () {
      const taskDisposer = autorun(() => {
        const task = getRoot(self).tasks.active
        if (task) {
          self.setActive(task.id)
        }
      })
      addDisposer(self, taskDisposer)
    },

    setActive (taskId) {
      if (!self.annotations.get(taskId)) {
        const newAnnotation = Annotation.create({ taskId })
        self.annotations.set(taskId, newAnnotation)
      }
      self.active = taskId
    }
  }))

export default ClassificationStore
