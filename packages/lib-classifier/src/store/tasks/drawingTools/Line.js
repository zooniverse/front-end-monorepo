import { types } from 'mobx-state-tree'

const Line = types.model('Line', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  max: types.maybe(types.union(types.string, types.number), ''),
  min: types.maybe(types.union(types.string, types.number), ''),
  type: types.literal('line')
})

export default Line
