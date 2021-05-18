import { types } from 'mobx-state-tree'
import Tool from '../Tool'
// import RectangleTool from '../RectangleTool'
import { RotateRectangle } from '../../marks'

const RotateRectangleTool = types
  .model('RotateRectangle', {
    marks: types.map(RotateRectangle),
    type: types.literal('rotateRectangle')
  })
  .actions((self) => {
    function createMark(mark) {
      const newMark = RotateRectangle.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark
    }
  })

export default types.compose('RotateRectangleTool', Tool, RotateRectangleTool)
