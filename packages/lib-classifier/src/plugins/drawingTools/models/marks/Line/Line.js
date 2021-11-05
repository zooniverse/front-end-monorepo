import { getParentOfType, types } from 'mobx-state-tree'
import { Line as LineComponent } from '../../../components/'
import { LineTool } from '@plugins/drawingTools/models/tools'
import Mark from '../Mark'

const MINIMUM_LENGTH = 5

const LineModel = types
  .model('LineModel', {
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
      const x =
        self.x1 > self.x2 ? self.x1 + BUFFER / scale : self.x1 - BUFFER / scale
      const y = self.y1
      // TODO: check for out of bounds coordinates
      return { x, y }
    },

    get length() {
      const { x1, y1, x2, y2 } = self
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    },

    get isValid() {
      return self.length - MINIMUM_LENGTH > 0
    },

    get tool() {
      return getParentOfType(self, LineTool)
    },

    get toolComponent() {
      return LineComponent
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

const Line = types.compose('Line', Mark, LineModel)

export default Line
