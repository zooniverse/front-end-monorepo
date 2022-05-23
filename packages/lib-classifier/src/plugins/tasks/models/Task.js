import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Annotation from './Annotation'

const Task = types.model('Task', {
  // override annotation in individual task models with specific annotation types
  annotation: types.safeReference(Annotation),
  taskKey: types.identifier,
  required: types.maybe(types.union(types.string, types.boolean)), // text task required default = false
  strings: types.map(types.string),
  type: types.literal('default')
})
  .views(self => ({

    defaultAnnotation(id = cuid()) {
    // Override this in a real task
      return Annotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    },

    get help() {
      return self.strings.get('help')
    },

    isComplete(annotation) {
      return !self.required || !!annotation?.isComplete
    },

    get isValid() {
      return true
    }
  }))
  .actions(self => ({
    complete () {
      /*
      Override this with any actions that should run on task completion.
      */
    },

    createAnnotation () {
      const newAnnotation = self.defaultAnnotation()
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
    },

    validate () {
      /*
      Override this with any actions that should validate the task annotations, typically on task completion.
      */
    }
  }))

export default Task
