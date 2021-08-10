import { getParentOfType, types } from 'mobx-state-tree'
import { Circle as CircleComponent } from '@plugins/drawingTools/components/'
import { CircleTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'

const BUFFER = 24
const DELETE_BUTTON_ANGLE = -45
const MINIMUM_RADIUS = 5

const CircleModel = types
  .model('CircleModel', {
    x: types.maybe(types.number),
    y: types.maybe(types.number),
    r: types.maybe(types.number)
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.x,
        y: self.y
      }
    },

    deleteButtonPosition(scale) {
      const theta = DELETE_BUTTON_ANGLE * (Math.PI / 180)
      const dx = ((self.x + BUFFER) / scale) * Math.cos(theta)
      const dy = ((self.y + BUFFER) / scale) * Math.sin(theta)
      return {
        x: dx,
        y: dy
      }
    },

    get isValid() {
      return self.x - MINIMUM_RADIUS > 0
    },

    get tool() {
      return getParentOfType(self, CircleTool)
    },

    get toolComponent() {
      return CircleComponent
    },

    get x() {
      return self.x
    },

    get y() {
      return self.y
    }
  }))
  .actions((self) => {
    function initialDrag({ x, y }) {
      self.radius = self.getDistance(self.x, self.y, x, y)
      // This doesn't seem complete
    }

    function initialPosition({ x, y }) {
      self.x = x
      self.y = y
    }

    function move({ x, y }) {
      self.x += x
      self.y += y
    }

    function setCoordinates({ x, y, r }) {
      self.x = x
      self.y = y
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
