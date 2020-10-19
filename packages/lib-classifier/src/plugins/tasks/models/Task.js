import cuid from 'cuid'
import { tryReference, types } from 'mobx-state-tree'
import Annotation from './Annotation'

const Task = types.model('Task', {
  // override annotation in individual task models with specific annotation types
  annotation: types.safeReference(Annotation),
  taskKey: types.identifier,
  required: types.maybe(types.union(types.string, types.boolean)), // text task required default = false
  type: types.literal('default')
})
  .views(self => ({

    get defaultAnnotation () {
    // Override this in a real task
      return Annotation.create({
        id: cuid(),
        task: self.taskKey,
        taskType: self.type
      })
    },

    get isComplete () {
      const annotation = tryReference(() => self.annotation)
      return !self.required || !!annotation?.isComplete
    }
  }))
  .actions(self => ({
    complete () {
      /*
      Override this with any actions that should run on task completion.
      */
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

    setAnnotation (annotation) {
      self.annotation = annotation
    },

    start () {
      /*
      Override this with any setup actions for your task
      eg. setting the task value from a saved annotation
      */
    }
  }))

export default Task
