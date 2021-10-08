import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'

const FreehandLineModel = types
  .model('FreehandLineModel', {
    d: types.maybe(types.string)
  })
  .views((self) => ({
    get coords() {
      return {
        d: 'M 10,30 A 20,20 0,0,1 50,30'
      }
    },

    deleteButtonPosition(scale) {
      const BUFFER = 16
      // const d = self.d + BUFFER / scale
      return { x: 100, y: 100 }
    },

    // get isValid () ?

    // get length () ?

    get tool() {
      return getParentOfType(self, FreehandLineTool)
    },

    get toolComponent() {
      return FreehandLineComponent
    }
  }))
  .actions((self) => {
    function initialDrag({ x, y }) {
      console.log('initialDragX', x)
      console.log('initialDragY', y)
      // self.d = d
    }

    function initialPosition({ x, y }) {
      console.log('initialPositionX', x)
      console.log('initialPositionY', y)
      // self.d = d
    }

    function setCoordinates({ x, y }) {
      console.log('setCoordinatesX', x)
      console.log('setCoordinatesY', y)
      // self.d = d
    }

    return {
      initialDrag,
      initialPosition,
      setCoordinates
    }
  })

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
