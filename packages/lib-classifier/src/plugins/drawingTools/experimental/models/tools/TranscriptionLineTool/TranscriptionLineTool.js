import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'

const TranscriptionLineTool = types.model('TranscriptionLine', {
  marks: types.map(TranscriptionLine),
  type: types.literal('transcriptionLine')
})
  .actions(self => {
    function onPointerDown (mark) {
      const size = self.marks.size
      if (size) {
        const allMarks = Array.from(self.marks.values())
        const mostRecent = allMarks[size - 1]
        if (!mostRecent.finished) {
          mostRecent.finish()
          return mostRecent
        }
      }

      return self.createMark(mark)
    }

    function createMark (mark) {
      const newMark = TranscriptionLine.create(Object.assign({}, mark, { toolType: self.type }))
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark,
      onPointerDown
    }
  })

export default types.compose('TranscriptionLineTool', Tool, TranscriptionLineTool)
