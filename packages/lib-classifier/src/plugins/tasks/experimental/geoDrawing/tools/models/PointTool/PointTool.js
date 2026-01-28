import { types } from 'mobx-state-tree'

const PointTool = types
  .model('PointTool', {
    color: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    type: types.literal('Point'),
    uncertainty_circle: types.optional(types.boolean, false)
  })

export default PointTool
