import { types } from 'mobx-state-tree'
import { Tool } from '@plugins/drawingTools/models/tools'
import { FreehandLine } from '@plugins/drawingTools/models/marks'

const FreehandLineTool = types
  .model('FreehandLine', {
    marks: types.map(FreehandLine),
    type: types.literal('freehandLine')
  })
  .actions((self) => {
    return {
      createMark(mark, coors) {
        const newMark = FreehandLine.create(
          Object.assign({}, mark, { toolType: self.type })
        )
        newMark.initialize(coors);
        self.marks.put(newMark)
		
        return newMark
      },

      handlePointerMove(event, mark) {
        //mark.initialDrag(event)
      },

      handlePointerUp(event, mark) {
		console.log('handlePointerUp()')
        mark.finish(event)
      }
    }
  })

export default types.compose('FreehandLineTool', Tool, FreehandLineTool)
