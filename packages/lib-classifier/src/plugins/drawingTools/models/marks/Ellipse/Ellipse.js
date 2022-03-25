import { getParentOfType, types } from 'mobx-state-tree'
import { Ellipse as EllipseComponent } from '@plugins/drawingTools/components/'
import { EllipseTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'

const BUFFER = 24
const DELETE_BUTTON_ANGLE = -45
const MINIMUM_RADIUS = 5

const EllipseModel = types
  .model('EllipseModel', {
    x_center: types.maybe(types.number),
    y_center: types.maybe(types.number),
    rx: types.optional(types.number, 0),
    ry: types.optional(types.number, 0),
    angle: types.optional(types.number, 0)
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
      const dx = ((self.rx + BUFFER) / scale) * Math.cos(theta)
      const dy = ((self.ry + BUFFER) / scale) * Math.sin(theta)
      return {
        x: dx,
        y: dy
      }
    },

    get isValid() {
      return self.rx - MINIMUM_RADIUS > 0
    },

    get tool() {
      return getParentOfType(self, EllipseTool)
    },

    get toolComponent() {
      return EllipseComponent
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
      const rx = self.getDistance(self.x_center, self.y_center, x, y)
      const angle = self.getAngle(self.x_center, self.y_center, x, y)
      self.rx = rx
      self.ry = rx * 0.0001
      self.angle = angle
    },

    initialPosition({ x, y }) {
      self.x_center = x
      self.y_center = y
    },

    move({ x, y }) {
      self.x_center += x
      self.y_center += y
    },

    setCoordinates({ x, y, rx, ry, angle }) {
      self.x_center = x
      self.y_center = y
      self.rx = rx
      self.ry = ry
      self.angle = angle
    }
  }))

const Ellipse = types.compose('Ellipse', Mark, EllipseModel)

export default Ellipse
