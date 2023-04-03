import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { FreehandLine } from '@plugins/drawingTools/models/marks'

const FreehandLineTool = types
  .model('FreehandLine', {
    marks: types.map(FreehandLine),
    type: types.literal('freehandLine')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = FreehandLine.create(
        { ...mark, toolType: self.type }
      )

      // points assumes [{ x, y }, { x, y }]
      let points = mark.points || []

      if (mark.pathX && mark.pathY) {
        points = mark.pathX.map((x, i) => {
          return { x: mark.pathX[i], y: mark.pathY[i] }
        })
      }

      newMark.initialize(points)
      self.marks.put(newMark)

      return newMark
    },

    handlePointerMove(event, mark) {
      mark.initialDrag({ x: event.x, y: event.y })
    },

    handlePointerUp(event, mark) {
      mark.finish()
    }
  }))

export default types.compose('FreehandLineTool', Tool, FreehandLineTool)
