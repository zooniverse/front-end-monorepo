import { types } from 'mobx-state-tree'
import Tool from '../Tool'
import { Circle } from '../../marks'

const CircleTool = types
  .model('Circle', {
    marks: types.map(Circle),
    type: types.literal('circle')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = Circle.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }
  }))

export default types.compose('CircleTool', Tool, CircleTool)
