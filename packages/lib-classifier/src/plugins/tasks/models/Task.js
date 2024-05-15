import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Annotation from './Annotation'

const Task = types.model('Task', {
  // override annotation in individual task models with specific annotation types
  annotation: types.safeReference(Annotation),
  details: types.maybe(types.array(types.frozen())),
  taskKey: types.identifier,
  required: types.optional(types.boolean, false), // text task required default = false
  strings: types.map(types.string),
  type: types.literal('default')
})
  .preProcessSnapshot(snapshot => {
    if (typeof snapshot.required !== 'boolean') {
      const newSnapshot = { ...snapshot }
      // 'false' is a true value.
      if (snapshot.required === 'false') {
        newSnapshot.required = false
      }
      newSnapshot.required = Boolean(newSnapshot.required)
      return newSnapshot
    }
    return snapshot
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

    get instruction() {
      return self.strings.get('instruction')
    },

    get subtasks() {
      if (self.details && Array.isArray(self.details)) {
        return self.details.map((detail, index) => {
          const stringOverrides = {}
          self.strings.forEach((value, key) => {
            const detailsMatch = key.match(new RegExp(`^details\\.${index}\\.(.+)$`))
            if (detailsMatch) {
              stringOverrides[detailsMatch[1]] = value
            }
          })

          return {
            ...detail,
            ...stringOverrides,
            taskKey: `${self.taskKey}.details.${index}`,
            index
          }
        })
      }

      return []
    },

    hasSubtasks() {
      return self.subtasks.length > 0
    },

    get question() {
      return self.strings.get('question')
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
