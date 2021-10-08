import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { FreehandLine } from '@plugins/drawingTools/models/marks'

const FreehandLineTool = types
  .model('FreehandLine', {
    marks: types.map(FreehandLine),
    type: types.literal('freehandLine')
  })
  .actions((self) => {
    function handlePointerDown(event, mark) {
      mark.initialDrag(event)
      mark.finish()
    }

    function handlePointerMove(event, mark) {
      return
    }

    function handlePointerUp(event, mark) {
      return
    }

    function createMark(mark) {
      console.log('A', mark)
      const newMark = FreehandLine.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      console.log('B', mark)
      self.marks.put(newMark)
      return newMark
    }

    return {
      createMark,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp
    }
  })

export default types.compose('FreehandLineTool', Tool, FreehandLineTool)
