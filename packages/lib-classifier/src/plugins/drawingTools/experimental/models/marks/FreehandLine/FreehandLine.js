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
        d: self.d
      }
    },

    deleteButtonPosition(scale) {
      const BUFFER = 16
      const d = self.d + BUFFER / scale
      return { d }
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
    function initialDrag({ d }) {
      self.d = d
    }

    function initialPosition({ d }) {
      self.d = d
    }

    // function setCoordinates: add condition?

    return {
      initialDrag,
      initialPosition
    }
  })

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
