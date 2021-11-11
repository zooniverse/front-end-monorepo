import { getParentOfType, types } from 'mobx-state-tree'
import { TranscriptionLine as TranscriptionLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { TranscriptionLineTool } from '@plugins/drawingTools/models/tools'

const TranscriptionLineModel = types
  .model('TranscriptionLineModel', {
    x1: types.maybe(types.number),
    y1: types.maybe(types.number),
    x2: types.maybe(types.number),
    y2: types.maybe(types.number)
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.x1,
        y: self.y1
      }
    },

    deleteButtonPosition(scale) {
      const BUFFER = 16
      const x = self.x1 + BUFFER / scale
      const y = self.y1
      return { x, y }
    },

    get isValid() {
      return self.x1 !== self.x2 || self.y1 !== self.y2
    },

    get length() {
      const { x1, y1, x2, y2 } = self
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    },

    get tool() {
      return getParentOfType(self, TranscriptionLineTool)
    },

    get toolComponent() {
      return TranscriptionLineComponent
    }
  }))
  .actions((self) => {
    function initialDrag({ x, y }) {
      self.x2 = x
      self.y2 = y
    }

    function initialPosition({ x, y }) {
      self.x1 = x
      self.y1 = y
      self.x2 = x
      self.y2 = y
    }

    function move({ x, y }) {
      self.x1 += x
      self.x2 += x
      self.y1 += y
      self.y2 += y
    }

    function setCoordinates({ x1, y1, x2, y2 }) {
      self.x1 = x1
      self.y1 = y1
      self.x2 = x2
      self.y2 = y2
    }

    return {
      initialDrag,
      initialPosition,
      move,
      setCoordinates
    }
  })

const TranscriptionLine = types.compose(
  'TranscriptionLine',
  Mark,
  TranscriptionLineModel
)

export default TranscriptionLine
