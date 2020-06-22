import { types } from 'mobx-state-tree'

const TextPreviousAnnotations = types.model('TextPreviousAnnotations', {
  id: types.identifier,
  taskKey: types.string,
  taskType: types.string,
  value: types.array(types.string)
})

export default TextPreviousAnnotations
