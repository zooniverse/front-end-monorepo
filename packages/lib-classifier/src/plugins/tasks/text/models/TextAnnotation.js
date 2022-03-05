import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const Text = types.model('Text', {
  taskType: types.literal('text'),
  value: types.optional(types.string, '')
})
  .views(self => ({
    get isComplete () {
      return self.value !== ''
    }
  }))

const TextAnnotation = types.compose('TextAnnotation', Annotation, Text)
export default TextAnnotation
