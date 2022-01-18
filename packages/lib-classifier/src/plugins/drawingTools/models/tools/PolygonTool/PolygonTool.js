import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { Polygon } from '@plugins/drawingTools/models/marks'

const PolygonTool = types
  .model('Polygon', {
    marks: types.map(Polygon),
    type: types.literal('polygon')
  })
  .actions((self) => ({
    createMark(mark) {
      const newMark = Polygon.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }
  }))

export default types.compose('PolygonTool', Tool, PolygonTool)
