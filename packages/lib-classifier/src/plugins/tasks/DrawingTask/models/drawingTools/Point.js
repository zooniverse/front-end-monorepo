import { types } from 'mobx-state-tree'
import { Point as PointMark } from '../markings'

const Point = types.model('Point', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  marks: types.map(PointMark),
  max: types.maybe(types.union(types.string, types.number), ''),
  min: types.maybe(types.union(types.string, types.number), ''),
  size: types.maybe(types.enumeration(['large', 'small'])),
  type: types.literal('point')
})
.views(self => ({
  get isComplete () {
    return (self.marks.size >= self.min && self.marks.size <= self.max)
  }
}))
.actions(self => {
  function createMark (mark) {
    const newMark = PointMark.create(mark)
    self.marks.put(newMark)
    return newMark
  }
  return {
    createMark
  }
})

export default Point
