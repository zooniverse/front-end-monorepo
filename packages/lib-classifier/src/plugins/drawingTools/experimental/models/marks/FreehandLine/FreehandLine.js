import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'

const singleCoord = types.model({
  x: types.maybe(types.number),
  y: types.maybe(types.number)
})

const FreehandLineModel = types
  .model('FreehandLineModel', {
    path: types.maybe(types.array(singleCoord))
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.x,
        y: self.y
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
  .actions((self) => ({
    initialDrag({ x, y }) {
      self.x = x
      self.y = y
    },

    initialPosition({ x, y }) {
      self.x = x
      self.y = y
    },

    setCoordinates({ x, y }) {
      self.x = x
      self.y = y
    }
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
