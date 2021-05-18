import { getParentOfType, types } from 'mobx-state-tree'
import { RotateRectangle as RotateRectangleComponent } from '../../../components'
import { RotateRectangleTool } from '@plugins/drawingTools/models/tools'
import Rectangle from '../Rectangle'

const RotateRectangleModel = types
  .model('RotateRectangleModel', {
    angle: types.optional(types.number, 0)
  })
  .views((self) => ({
    get angle() {
      return self.angle
    },

    get tool() {
      return getParentOfType(self, RotateRectangleTool)
    },

    get toolComponent() {
      console.log(RotateRectangleComponent)
      return RotateRectangleComponent
    }
  }))
  .actions((self) => {
    // ToDo: set initialAngle here
    function setAngle(a) {
      self.angle = a
    }

    console.log('self: ', self)

    return {
      setAngle
    }
  })

const RotateRectangle = types.compose(
  'RotateRectangle',
  Rectangle,
  RotateRectangleModel
)

export default RotateRectangle
