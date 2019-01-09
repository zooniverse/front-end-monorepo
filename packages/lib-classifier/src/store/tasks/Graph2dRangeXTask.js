import { types } from 'mobx-state-tree'
import Task from './Task'

const Graph2dRangeX = types.model('Graph2dRangeX', {
  help: types.optional(types.string, ''),
  instruction: types.string,
  required: types.maybe(types.boolean), // Should this be an optional type with the default to true?
  type: types.literal('graph2dRangeX')
})

const Graph2dRangeXTask = types.compose('Graph2dRangeXTask', Task, Graph2dRangeX)

export default Graph2dRangeXTask