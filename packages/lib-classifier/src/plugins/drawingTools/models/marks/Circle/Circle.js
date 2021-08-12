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
    radius: types.optional(types.number, 0)
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
      const dx = ((self.radius + BUFFER) / scale) * Math.cos(theta)
      const dy = ((self.radius + BUFFER) / scale) * Math.sin(theta)
      return {
        x: dx,
        y: dy
      }
    },

    get isValid() {
      return self.x_center - MINIMUM_RADIUS > 0
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
  .actions((self) => {
    function initialDrag({ x, y }) {
      self.radius = self.getDistance(self.x_center, self.y_center, x, y)
      // console.log('initialDragX: ', x)
      // console.log('initialDragY: ', y)
      // console.log('self.radius: ', self.radius)
      // This doesn't seem complete
    }

    function initialPosition({ x, y }) {
      self.x_center = x
      self.y_center = y
      console.log('initialPositionX: ', self.x_center)
      console.log('initialPositionY: ', self.y_center)
    }

    function move({ x, y }) {
      self.x_center += x
      self.y_center += y
    }

    function setCoordinates({ x, y, r }) {
      self.x_center = x
      self.y_center = y
      self.radius = r
    }

    return {
      initialDrag,
      initialPosition,
      move,
      setCoordinates
    }
  })

const Circle = types.compose('Circle', Mark, CircleModel)

export default Circle
