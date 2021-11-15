import { types } from 'mobx-state-tree'
import RectangleTool from '../RectangleTool'
import { RotateRectangle } from '../../marks'

const RotateRectangleTool = types
  .model('RotateRectangle', {
    marks: types.map(RotateRectangle),
    type: types.literal('rotateRectangle')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = RotateRectangle.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }
  }))

export default types.compose(
  'RotateRectangleTool',
  RectangleTool,
  RotateRectangleTool
)
