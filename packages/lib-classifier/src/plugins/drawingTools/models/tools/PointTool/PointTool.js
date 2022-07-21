import { types } from 'mobx-state-tree'
import Tool from '../Tool'
import { Point } from '../../marks'

const PointTool = types
  .model('Point', {
    marks: types.map(Point),
    size: types.optional(types.enumeration(['large', 'small']), 'large'),
    type: types.literal('point')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = Point.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    },

    handlePointerMove(event, mark) {
      mark.initialDrag(event)
    },

    handlePointerUp(event, mark) {
      mark.finish()
    }
  }))

export default types.compose('PointTool', Tool, PointTool)
