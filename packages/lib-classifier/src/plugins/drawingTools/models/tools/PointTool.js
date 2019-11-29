import { types } from 'mobx-state-tree'
import Tool from './Tool'
import { Point } from '../marks'

const PointTool = types.model('Point', {
  marks: types.map(Point),
  size: types.optional(types.enumeration(['large', 'small']), 'large'),
  type: types.literal('point')
})
  .actions(self => {
    function createMark (mark) {
      const newMark = Point.create(mark)
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark
    }
  })

export default types.compose('PointTool', Tool, PointTool)
