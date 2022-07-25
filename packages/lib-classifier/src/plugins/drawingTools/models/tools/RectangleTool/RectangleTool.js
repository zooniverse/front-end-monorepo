import { types } from 'mobx-state-tree'
import Tool from '../Tool'
import { Rectangle } from '../../marks'

const RectangleTool = types
  .model('Rectangle', {
    marks: types.map(Rectangle),
    type: types.literal('rectangle')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = Rectangle.create(
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

export default types.compose('RectangleTool', Tool, RectangleTool)
