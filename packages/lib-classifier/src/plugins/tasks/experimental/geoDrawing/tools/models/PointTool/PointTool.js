import { types } from 'mobx-state-tree'
import countType from '../helpers/countType'

const PointTool = types
  .model('PointTool', {
    color: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    max: countType(0),
    min: countType(0),
    type: types.literal('Point'),
    uncertainty_circle: types.optional(types.boolean, false)
  })
  .views(self => ({
    get canCreate() {
      return self.max > 0
    }
  }))

export default PointTool
