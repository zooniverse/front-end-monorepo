import { types } from 'mobx-state-tree'
import { Point } from '../marks'

const PointTool = types.model('Point', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  marks: types.map(Point),
  max: types.optional(types.union(types.string, types.number), Infinity),
  min: types.optional(types.union(types.string, types.number), 0),
  size: types.optional(types.enumeration(['large', 'small']), 'large'),
  type: types.literal('point')
})
  .views(self => ({
    get disabled () {
      return self.marks.size >= self.max
    },

    get isComplete () {
      return (self.marks.size >= self.min)
    }
  }))
  .actions(self => {
    function createMark (mark) {
      const newMark = Point.create(mark)
      self.marks.put(newMark)
      return newMark
    }

    function deleteMark (mark) {
      self.marks.delete(mark.id)
    }

    return {
      createMark,
      deleteMark
    }
  })

export default PointTool
