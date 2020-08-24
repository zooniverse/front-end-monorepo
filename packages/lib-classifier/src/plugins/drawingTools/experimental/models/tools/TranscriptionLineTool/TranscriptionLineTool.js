import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'

const TranscriptionLineTool = types.model('TranscriptionLine', {
  marks: types.map(TranscriptionLine),
  type: types.literal('transcriptionLine')
})
  .actions(self => {
    function handlePointerDown (mark) {
      const allMarks = Array.from(self.marks.values())
      const mostRecent = allMarks[allMarks.length - 1]
      mostRecent.initialDrag(mark)
      mostRecent.finish()
      return mostRecent
    }

    function createMark (mark) {
      const newMark = TranscriptionLine.create(Object.assign({}, mark, { toolType: self.type }))
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark,
      handlePointerDown
    }
  })

export default types.compose('TranscriptionLineTool', Tool, TranscriptionLineTool)
