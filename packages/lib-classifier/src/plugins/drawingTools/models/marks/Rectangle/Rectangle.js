import {
  addDisposer,
  getRoot,
  getParentOfType,
  isValidReference,
  types
} from 'mobx-state-tree'
import { Rectangle as RectangleComponent } from '../../../components/'
import { RectangleTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'

const MINIMUM_SIZE = 5

const RectangleModel = types
  .model('RectangleModel', {
    x_center: types.maybe(types.number),
    y_center: types.maybe(types.number),
    width: types.maybe(types.number),
    height: types.maybe(types.number)
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.x_center,
        y: self.y_center
      }
    },

    deleteButtonPosition(scale) {
      const BUFFER = 16
      const x = self.x_center + self.width / 2 + BUFFER / scale
      const y = self.y_center - self.height / 2
      // TODO: check for out of bounds coordinates
      return { x, y }
    },

    get isValid() {
      return self.width - MINIMUM_SIZE > 0 && self.height - MINIMUM_SIZE > 0
    },

    get tool() {
      return getParentOfType(self, RectangleTool)
    },

    get toolComponent() {
      return RectangleComponent
    }
  }))
  .actions((self) => ({
    initialDrag({ x, y }) {
      const x_left = x < self.x_center ? x : self.x_center - self.width / 2
      const x_right = x > self.x_center ? x : self.x_center + self.width / 2
      const y_top = y < self.y_center ? y : self.y_center - self.height / 2
      const y_bottom = y > self.y_center ? y : self.y_center + self.height / 2

      self.width = x_right - x_left
      self.height = y_bottom - y_top
      self.x_center = (x_left + x_right) / 2
      self.y_center = (y_top + y_bottom) / 2
    },

    initialPosition({ x, y }) {
      self.x_center = x
      self.y_center = y
      self.width = 0
      self.height = 0
    },

    move({ x, y }) {
      self.x_center += x
      self.y_center += y
    },

    setCoordinates({ x_left, x_right, y_top, y_bottom }) {
      self.x_center = (x_left + x_right) / 2
      self.y_center = (y_top + y_bottom) / 2
      self.width = Math.abs(x_right - x_left)
      self.height = Math.abs(y_bottom - y_top)
    }
  }))

const Rectangle = types.compose('Rectangle', Mark, RectangleModel)

export default Rectangle
