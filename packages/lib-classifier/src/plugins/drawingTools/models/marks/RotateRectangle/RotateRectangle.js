import {
  addDisposer,
  getRoot,
  getParentOfType,
  isValidReference,
  types
} from 'mobx-state-tree'
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
    }
  }))
// .actions((self) => {

//   return {

//   }
// })

const RotateRectangle = types.compose(
  'RotateRectangle',
  Rectangle,
  RotateRectangleModel
)

export default RotateRectangle
