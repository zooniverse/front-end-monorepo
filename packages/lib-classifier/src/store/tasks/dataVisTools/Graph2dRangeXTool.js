import { types } from 'mobx-state-tree'

const Graph2dRangeXTool = types.model('Graph2dRangeXTool', {
  help: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  max: types.maybe(types.number),
  type: types.literal('graph2dRangeX')
})

export default Graph2dRangeXTool
