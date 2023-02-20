import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { FreehandLine } from '@plugins/drawingTools/models/marks'

const FreehandLineTool = types
  .model('FreehandLine', {
    marks: types.map(FreehandLine),
    type: types.literal('freehandLine')
  })
  .actions((self) => ({
    createMark(mark, points) {
      const newMark = FreehandLine.create(
        Object.assign({}, mark, { toolType: self.type })
      )

      newMark.initialize(points);
      self.marks.put(newMark)

      return newMark
    },

    handlePointerMove(event, mark) {
      mark.initialDrag({ x: event.x, y: event.y })
    },

    handlePointerUp(event, mark) {
      mark.finish(event)
    }
  }))

export default types.compose('FreehandLineTool', Tool, FreehandLineTool)
