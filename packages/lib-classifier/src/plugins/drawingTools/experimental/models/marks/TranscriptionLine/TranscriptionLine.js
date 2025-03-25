import { getParentOfType, types } from 'mobx-state-tree'
import { TranscriptionLine as TranscriptionLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { TranscriptionLineTool } from '@plugins/drawingTools/models/tools'

// Change this to 'before' to place the delete button at the beginning of the text.
const deleteButtonPlacement = 'after'

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
      const dx = self.x2 - self.x1
      const dy = self.y2 - self.y1
      const BUFFER = 20 // NB. WCAG 2.5.8 requires a minumum target size of 24 CSS pixels.
      const xBuffer = dx ? BUFFER * (dx / self.length) : BUFFER
      const yBuffer = dy ? BUFFER * (dy / self.length) : 0
      const x = deleteButtonPlacement === 'before'
        ? self.x1 - xBuffer / scale // Before the start point.
        : self.x2 + xBuffer / scale // After the end point.
      const y = deleteButtonPlacement === 'before'
        ? self.y1 - yBuffer / scale // Before the start point.
        : self.y2 + yBuffer / scale // After the end point.
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
  .actions((self) => ({
    initialDrag({ x, y }) {
      self.x2 = x
      self.y2 = y
    },

    initialPosition({ x, y }) {
      self.x1 = x
      self.y1 = y
      self.x2 = x
      self.y2 = y
    },

    move({ x, y }) {
      self.x1 += x
      self.x2 += x
      self.y1 += y
      self.y2 += y
    },

    setCoordinates({ x1, y1, x2, y2 }) {
      self.x1 = x1
      self.y1 = y1
      self.x2 = x2
      self.y2 = y2
    }
  }))

const TranscriptionLine = types.compose(
  'TranscriptionLine',
  Mark,
  TranscriptionLineModel
)

export default TranscriptionLine
