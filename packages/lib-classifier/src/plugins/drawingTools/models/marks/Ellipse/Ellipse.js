import { types } from 'mobx-state-tree'
import { Ellipse as EllipseComponent } from '../../../components/'

import Mark from '../Mark'

const BUFFER = 24
const DEFAULT_SQUASH = 0.5
const DELETE_BUTTON_ANGLE = -45
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
      const theta = DELETE_BUTTON_ANGLE * (Math.PI / 180)
      const dx = ((self.rx + BUFFER) / scale) * Math.cos(theta)
      const dy = ((self.ry + BUFFER) / scale) * Math.sin(theta)
      return {
        x: dx,
        y: dy
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
      initialDrag,
      initialPosition,
      move,
      setCoordinates
    }
  })

const Ellipse = types.compose('Ellipse', Mark, EllipseModel)

export default Ellipse
