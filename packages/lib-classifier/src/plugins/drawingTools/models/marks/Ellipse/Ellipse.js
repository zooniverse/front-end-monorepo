import { getParentOfType, types } from 'mobx-state-tree'
import { Ellipse as EllipseComponent } from '@plugins/drawingTools/components/'
import { EllipseTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'

// A handle nearer the centre reports a less precise angle, so it steers
// proportionally less, up to full authority at this distance in screen pixels.
const ANGLE_FRICTION_RADIUS = 40
const BUFFER = 24
const DEFAULT_AXIS_RATIO = 0.1
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
      const dx = (self.rx + BUFFER) * Math.cos(theta)
      const dy = (self.ry + BUFFER) * Math.sin(theta)
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
      self.rx = rx
      self.ry = rx * DEFAULT_AXIS_RATIO
      self.angle = self.getAngle(self.x_center, self.y_center, x, y)
    },

    initialPosition({ x, y }) {
      self.x_center = x
      self.y_center = y
    },

    move({ x, y }) {
      self.x_center += x
      self.y_center += y
    },

    resizeByAxis({ dx = 0, dy = 0, axis = 'major', scale = 1 }) {
      if (dx === 0 && dy === 0) return
      if (!['major', 'minor'].includes(axis)) return

      // Move the handle by the drag from where it sits, so an off-centre grab doesn't shift the axis.
      const quarterTurn = axis === 'major' ? 0 : -90
      const radius = axis === 'major' ? self.rx : self.ry
      const theta = (self.angle + quarterTurn) * (Math.PI / 180)
      const x = self.x_center + radius * Math.cos(theta) + dx
      const y = self.y_center + radius * Math.sin(theta) + dy

      const r = self.getDistance(self.x_center, self.y_center, x, y)
      const handleAngle = self.getAngle(self.x_center, self.y_center, x, y) - quarterTurn
      const friction = Math.min(1, r * scale / ANGLE_FRICTION_RADIUS)
      // Both wraps take the shorter way round, into the range getAngle returns.
      const turn = ((handleAngle - self.angle + 540) % 360) - 180

      if (axis === 'major') self.rx = r
      else self.ry = r
      self.angle = ((self.angle + turn * friction + 540) % 360) - 180
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
