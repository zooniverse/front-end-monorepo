import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'

const TranscriptionLineTool = types
  .model('TranscriptionLine', {
    marks: types.map(TranscriptionLine),
    type: types.literal('transcriptionLine')
  })
  .actions((self) => ({
    handlePointerDown(event, mark) {
      mark.initialDrag(event)
      mark.finish()
    },

    handlePointerMove(event, mark) {
      return
    },

    handlePointerUp(event, mark) {
      return
    },

    createMark(mark) {
      const newMark = TranscriptionLine.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    }
  }))

export default types.compose(
  'TranscriptionLineTool',
  Tool,
  TranscriptionLineTool
)
