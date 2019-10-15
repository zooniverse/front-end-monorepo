import { types } from 'mobx-state-tree'

const TextAnnotation = types.model('TextAnnotation', {
  task: types.identifier,
  value: types.optional(types.string, '')
})

export default TextAnnotation
