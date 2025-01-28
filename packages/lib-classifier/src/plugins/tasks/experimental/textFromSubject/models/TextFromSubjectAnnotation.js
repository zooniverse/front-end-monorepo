import { types } from 'mobx-state-tree'

import Annotation from '@plugins/tasks/models/Annotation'

const TextFromSubject = types
  .model('TextFromSubject', {
    taskType: types.literal('textFromSubject'),
    value: types.optional(types.string, '')
  })
  .volatile((self) => ({
    initializedFromSubject: false
  }))
  .views(self => ({
    get isComplete () {
      return self.initializedFromSubject && self.value !== ''
    }
  }))
  .actions(self => {
    return {
      updateFromSubject (value) {
        self.initializedFromSubject = true
        self.value = value
      }
    }
  })

const TextFromSubjectAnnotation = types.compose(
  'TextFromSubjectAnnotation',
  Annotation,
  TextFromSubject
)

export default TextFromSubjectAnnotation
