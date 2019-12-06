import { types } from 'mobx-state-tree'
import { Ellipse as EllipseComponent } from '../../../components/'

import Mark from '../Mark'

const BUFFER = 16
const DEFAULT_SQUASH = 0.5
const DELETE_BUTTON_ANGLE = 45
const MINIMUM_RADIUS = 5

const EllipseModel = types
  .model('EllipseModel', {
    x: types.maybe(types.number),
    y: types.maybe(types.number),
    rx: types.optional(types.number, 0),
    ry: types.optional(types.number, 0),
    angle: types.optional(types.number, 0)
  })
  .views(self => ({
    get coords () {
      return {
        x: self.x,
        y: self.y
      }
    },

    deleteButtonPosition (scale) {
      const theta = (DELETE_BUTTON_ANGLE - self.angle) * (Math.PI / 180)
      const dx = (self.rx + (BUFFER / scale)) * Math.cos(theta)
      const dy = (self.ry + (BUFFER / scale)) * Math.sin(theta)
      return {
        x: self.x + dx,
        y: self.y - dy
      };
    },

    get isValid () {
      return self.rx - MINIMUM_RADIUS > 0
    },

    get toolComponent () {
      return EllipseComponent
    }
  }))
  .actions(self => {
    function getAngle(x1, y1, x2, y2) {
      const deltaX = x2 - x1
      const deltaY = y2 - y1
      return Math.atan2(deltaY, deltaX) * (-180 / Math.PI)
    }

    function getDistance(x1, y1, x2, y2) {
      const aSquared = Math.pow(x2 - x1, 2)
      const bSquared = Math.pow(y2 - y1, 2)
      return Math.sqrt(aSquared + bSquared)
    }

    function initialDrag ({ x, y }) {
      const rx = self.getDistance(self.x, self.y, x, y)
      const angle = self.getAngle(self.x, self.y, x, y)
      self.rx = rx
      self.ry = rx * DEFAULT_SQUASH
      self.angle = angle
    }

    function initialPosition ({ x, y }) {
      self.x = x
      self.y = y
    }

    function move ({ x, y }) {
      self.x += x
      self.y += y
    }

    function setCoordinates ({ x, y, rx, ry, angle }) {
      self.x = x
      self.y = y
      self.rx = rx
      self.ry = ry
      self.angle = angle
    }

    return {
      getDistance,
      getAngle,
      initialDrag,
      initialPosition,
      move,
      setCoordinates
    }
  })

const Ellipse = types.compose('Ellipse', Mark, EllipseModel)

export default Ellipse
