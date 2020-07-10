import { types } from 'mobx-state-tree'

const TextPreviousAnnotationValues = types.model('TextPreviousAnnotationValues', {
  taskKey: types.identifier,
  taskType: types.literal('text'),
  values: types.array(types.string)
})

export default TextPreviousAnnotationValues
