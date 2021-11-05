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
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }
  }))

export default types.compose('FreehandLineTool', Tool, FreehandLineTool)
