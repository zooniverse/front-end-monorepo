import { types } from 'mobx-state-tree'
import Tool from '@plugins/drawingTools/models/tools/Tool'
import { Polygon } from '@plugins/drawingTools/models/marks'

const PolygonTool = types
  .model('Polygon', {
    marks: types.map(Polygon),
    type: types.literal('polygon')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = Polygon.create(
        Object.assign({}, mark, {
          toolType: self.type
        })
      )
      self.marks.put(newMark)
      return newMark
    },
    handlePointerPosition(event, mark) {
      mark?.setGuideLine(event)
    },
    handlePointerMove(event, mark) {
      mark?.setGuideLine(event)
    }
  }))

export default types.compose('PolygonTool', Tool, PolygonTool)
