import { types } from 'mobx-state-tree'

const BaseAnnotation = types.model('BaseAnnotation', {
  frame: types.optional(types.number, 0),
  tool: types.optional(types.number, 0)
})

export default BaseAnnotation
