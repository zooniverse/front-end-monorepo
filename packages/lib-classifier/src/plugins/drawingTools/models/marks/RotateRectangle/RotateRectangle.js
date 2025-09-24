import { getParentOfType, types } from 'mobx-state-tree'
import { RotateRectangle as RotateRectangleComponent } from '../../../components/'
import { RotateRectangleTool } from '@plugins/drawingTools/models/tools'

import Rectangle from '../Rectangle'

const RotateRectangleModel = types
  .model('RotateRectangleModel', {
    angle: types.optional(types.number, 0)
  })
  .views((self) => ({
    get tool() {
      return getParentOfType(self, RotateRectangleTool)
    },

    get toolComponent() {
      return RotateRectangleComponent
    },

    get x_rotate() {
      return self.x_center
    },

    get y_rotate() {
      return self.y_center
    }
  }))
  .actions((self) => ({
    setCoordinates({ x_left, x_right, y_top, y_bottom, angle }) {
      self.x_center = (x_left + x_right) / 2
      self.y_center = (y_top + y_bottom) / 2
      self.width = Math.abs(x_right - x_left)
      self.height = Math.abs(y_bottom - y_top)
      self.angle = angle
    },

    /*
    Resize RotateRectangle mark by moving/dragging a corner

    Input:
    - dx: number, delta X. Indicates distance that mark was moved/dragged by the
        user, across the x-axis OF THE DRAWING CANVAS. (i.e. this is relative
        to the drawing canvas, not relative to the rotated axes of the
        RotateRectangle)
    - dy: number, delta Y. As above, but for x-axis OF THE DRAWING CANVAS.
    - corner: string indicating which corner (drag handle) of the RotateRectangle
        component is being moved/dragged by the user. Value is either
        'top left', 'top right', 'bottom right', or 'bottom left'.

    Effect:
    - Changes width, height, x_center, and y_center of this RotateRectangle.

    Output: 
    - none

    Resizing Behaviour:
    Given a rectangle with corners ABCD and origin/centre O...
      A-------B
      |   O   |
      D-------C
    ...when we resize the rectangle by dragging one corner, we want that resize
    action to be anchored to the OPPOSITE corner. e.g. if C goes ↘️, A stays
    static, B goes ➡️, D goes ⬇️, and O goes ↘️.

     */
    resizeByCorner({ dx = 0, dy = 0, corner = '' }) {
      if (dx === 0 && dy === 0) return
      if (!['top left', 'top right', 'bottom right', 'bottom left'].includes(corner)) return
      const angleOfResizeAction = Math.atan2(dy, dx)  // Radians
      const distanceOfResizeAction = Math.sqrt(dx * dx + dy * dy)

      const modifiedAngle = angleOfResizeAction - (self.angle * Math.PI / 180)  // Radians. self.angle is in degrees.
      const modifiedDx = Math.cos(modifiedAngle) * distanceOfResizeAction
      const modifiedDy = Math.sin(modifiedAngle) * distanceOfResizeAction

      switch (corner) {
        case 'top left':
          self.width = Math.max(self.width - modifiedDx, 1)
          self.height = Math.max(self.height - modifiedDy, 1)
          self.x_center += dx * 0.5
          self.y_center += dy * 0.5
          break
        case 'top right':
          self.width = Math.max(self.width + modifiedDx, 1)
          self.height = Math.max(self.height - modifiedDy, 1)
          self.x_center += dx * 0.5
          self.y_center += dy * 0.5
          break
        case 'bottom right':
          self.width = Math.max(self.width + modifiedDx, 1)
          self.height = Math.max(self.height + modifiedDy, 1)
          self.x_center += dx * 0.5
          self.y_center += dy * 0.5
          break
        case 'bottom left':
          self.width = Math.max(self.width - modifiedDx, 1)
          self.height = Math.max(self.height + modifiedDy, 1)
          self.x_center += dx * 0.5
          self.y_center += dy * 0.5
          break

      }
    }
  }))

const RotateRectangle = types.compose(
  'RotateRectangle',
  Rectangle,
  RotateRectangleModel
)

export default RotateRectangle
