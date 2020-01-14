import { getRoot, types } from 'mobx-state-tree'
import Annotation from './Annotation'

const Task = types.model('Task', {
  taskKey: types.identifier,
  required: types.maybe(types.boolean)
})
  .views(self => ({
    get annotation () {
      const currentAnnotation = getRoot(self).classifications.annotation(self)
      return currentAnnotation || self.defaultAnnotation
    },

    get defaultAnnotation () {
    // Override this in a real task
      return Annotation.create({ task: self.taskKey })
    },

    get isComplete () {
      return !self.required || self.annotation.isComplete
    }
  }))
  .actions(self => ({
    updateAnnotation (value) {
      const { addAnnotation } = getRoot(self).classifications
      addAnnotation(self, value)
    },

    complete () {
      // set an annotation for this task if there wasn't one already.
      const { value } = self.annotation
      self.updateAnnotation(value)
    },

    createAnnotation () {
      const newAnnotation = self.defaultAnnotation
      return newAnnotation
    },

    reset () {
      /*
      Override this to reset your task for a new annotation.
      */
    },

    start () {
      /*
      Override this with any setup actions for your task
      eg. setting the task value from a saved annotation
      */
    }
  }))

export default Task
