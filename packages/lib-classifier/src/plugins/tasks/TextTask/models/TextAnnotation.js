import { types } from 'mobx-state-tree'
import { Annotation } from '@store/annotations'

const Text = types.model('Text', {
  value: types.optional(types.string, '')
})

const TextAnnotation = types.compose('TextAnnotation', Annotation, Text)
export default TextAnnotation
