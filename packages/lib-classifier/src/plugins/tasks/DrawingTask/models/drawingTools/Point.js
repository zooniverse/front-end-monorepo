import { types } from 'mobx-state-tree'

const Point = types.model('Point', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  max: types.maybe(types.union(types.string, types.number), ''),
  min: types.maybe(types.union(types.string, types.number), ''),
  size: types.maybe(types.enumeration(['large', 'small'])),
  type: types.literal('point')
})

export default Point
