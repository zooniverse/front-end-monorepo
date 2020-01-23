import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'

const TranscriptionLineTool = types.model('TranscriptionLine', {
  marks: types.map(TranscriptionLine),
  type: types.literal('transcriptionLine')
})
  .actions(self => {
    function createMark (mark) {
      const newMark = TranscriptionLine.create(Object.assign({}, mark, { toolType: self.type }))
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark
    }
  })

export default types.compose('TranscriptionLineTool', Tool, TranscriptionLineTool)
