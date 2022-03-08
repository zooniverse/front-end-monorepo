import { types } from 'mobx-state-tree'

import Annotation from '../../../models/Annotation'

const TextFromSubject = types.model('TextFromSubject', {
  taskType: types.literal('textFromSubject'),
  value: types.optional(types.string, '')
})
  .views(self => ({
    get isComplete () {
      return self.value !== ''
    }
  }))

const TextFromSubjectAnnotation = types.compose('TextFromSubjectAnnotation', Annotation, TextFromSubject)
export default TextFromSubjectAnnotation
