import { getRoot, types } from 'mobx-state-tree'
import Annotation from './Annotation'

const Task = types.model('Task', {
  taskKey: types.identifier
})
  .views(self => ({
    get annotation () {
      const { currentAnnotations } = getRoot(self).classifications
      let currentAnnotation
      if (currentAnnotations && currentAnnotations.size > 0) {
        currentAnnotation = currentAnnotations.get(self.taskKey)
      }
      return currentAnnotation || self.defaultAnnotation
    },
    get defaultAnnotation () {
    // Override this in a real task
      return Annotation.create({ task: self.taskKey })
    }
  }))
  .actions(self => ({
    updateAnnotation (value) {
      const { addAnnotation } = getRoot(self).classifications
      addAnnotation(self, value)
    },
    createAnnotation () {
      const newAnnotation = self.defaultAnnotation
      return newAnnotation
    }
  }))

export default Task
