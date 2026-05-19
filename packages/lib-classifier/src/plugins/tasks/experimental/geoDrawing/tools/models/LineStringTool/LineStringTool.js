import { types } from 'mobx-state-tree'

const LineStringTool = types
  .model('LineStringTool', {
    color: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    type: types.literal('LineString')
  })

export default LineStringTool
