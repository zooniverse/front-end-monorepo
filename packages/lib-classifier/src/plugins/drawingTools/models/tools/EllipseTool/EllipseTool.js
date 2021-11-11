import { types } from 'mobx-state-tree'
import Tool from '../Tool'
import { Ellipse } from '../../marks'

const EllipseTool = types
  .model('Ellipse', {
    marks: types.map(Ellipse),
    type: types.literal('ellipse')
  })
  .actions((self) => {
    function createMark(mark) {
      const newMark = Ellipse.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark
    }
  })

export default types.compose('EllipseTool', Tool, EllipseTool)
