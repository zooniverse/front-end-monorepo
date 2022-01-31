import { types } from 'mobx-state-tree'
import Tool from '@plugins/drawingTools/models/tools/Tool'
import { Polygon } from '@plugins/drawingTools/models/marks'

const PolygonTool = types
  .model('Polygon', {
    marks: types.map(Polygon),
    type: types.literal('polygon')
  })
  .actions((self) => ({
    // 1st click only
    createMark(mark) {
      const newMark = Polygon.create(
        Object.assign({}, mark, {
          toolType: self.type
        })
      )
      self.marks.put(newMark)
      return newMark
    },
    // all additional clicks
    handlePointerDown(event, mark) {
      mark.appendPath(event)
    },
    handlePointerPosition(event, mark) {
      mark?.setGuideLine(event)
    },
    handlePointerMove(event, mark) {
      mark?.setGuideLine(event)
    },
    // prevents auto finish
    handlePointerUp(event, mark) {
      return
    }
  }))

export default types.compose('PolygonTool', Tool, PolygonTool)
