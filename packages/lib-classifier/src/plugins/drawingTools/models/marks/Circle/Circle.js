import { getParentOfType, types } from 'mobx-state-tree'
import { Circle as CircleComponent } from '@plugins/drawingTools/components/'
import { CircleTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'

const BUFFER = 12
const DELETE_BUTTON_ANGLE = -45
const MINIMUM_RADIUS = 5

const CircleModel = types
  .model('CircleModel', {
    x_center: types.maybe(types.number),
    y_center: types.maybe(types.number),
    r: types.optional(types.number, 0)
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.x_center,
        y: self.y_center
      }
    },

    deleteButtonPosition(scale) {
      const theta = DELETE_BUTTON_ANGLE * (Math.PI / 180)
      const dx = ((self.r + BUFFER) / scale) * Math.cos(theta)
      const dy = ((self.r + BUFFER) / scale) * Math.sin(theta)
      return {
        x: dx,
        y: dy
      }
    },

    get isValid() {
      return self.r >= MINIMUM_RADIUS
    },

    get tool() {
      return getParentOfType(self, CircleTool)
    },

    get toolComponent() {
      return CircleComponent
    },

    get x() {
      return self.x_center
    },

    get y() {
      return self.y_center
    }
  }))
  .actions((self) => ({
    initialDrag({ x, y }) {
      self.r = self.getDistance(self.x_center, self.y_center, x, y)
    },

    initialPosition({ x, y }) {
      self.x_center = x
      self.y_center = y
    },

    move({ x, y }) {
      self.x_center += x
      self.y_center += y
    },

    setCoordinates({ x, y, r }) {
      self.x_center = x
      self.y_center = y
      self.r = r
    }
  }))

const Circle = types.compose('Circle', Mark, CircleModel)

export default Circle
