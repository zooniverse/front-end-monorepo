import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'

const TranscriptionLineTool = types.model('TranscriptionLine', {
  marks: types.map(TranscriptionLine),
  type: types.literal('transcriptionLine')
})
  .actions(self => {
    function onPointerDown (mark, event) {
      const size = self.marks.size
      if (size) {
        const allMarks = Array.from(self.marks.values())
        console.log('there is a size', allMarks);
        const mostRecent = allMarks[size - 1]
        mostRecent.initialDrag(event)
        mostRecent.finish()
        return mostRecent
      }

      return createMark(mark)
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
