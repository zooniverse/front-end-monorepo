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

    resizeByCorner({ dx, dy }) {
      if (dx === 0 && dy === 0) return
      const angleOfResizeAction = Math.atan2(dy, dx)  // Radians
      const distanceOfResizeAction = Math.sqrt(dx * dx + dy * dy)

      const modifiedAngle = angleOfResizeAction - (self.angle * Math.PI / 180)  // Radians. self.angle is in degrees.
      const modifiedDx = Math.cos(modifiedAngle) * distanceOfResizeAction
      const modifiedDy = Math.sin(modifiedAngle) * distanceOfResizeAction

      // console.log('+++ ',
      //   `${(angleOfResizeAction * 180 / Math.PI).toFixed(1)}º => ${(modifiedAngle * 180 / Math.PI).toFixed(1)}º \n`,
      //   `${dx.toFixed(1)}, ${dy.toFixed(1)} => ${modifiedDx.toFixed(1)}, ${modifiedDy.toFixed(1)}`
      // )

      self.width += modifiedDx
      self.height += modifiedDy
      self.x_center += dx * 0.5
      self.y_center += dy * 0.5
    }
  }))

const RotateRectangle = types.compose(
  'RotateRectangle',
  Rectangle,
  RotateRectangleModel
)

export default RotateRectangle
