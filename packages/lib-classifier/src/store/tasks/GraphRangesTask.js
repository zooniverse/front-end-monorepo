import { types } from 'mobx-state-tree'
import Task from './Task'

const GraphRanges = types.model('GraphRanges', {
  help: types.optional(types.string, ''),
  instruction: types.string,
  required: types.maybe(types.boolean), // Should this be an optional type with the default to true?
  type: types.literal('graphRanges')
})

const GraphRangesTask = types.compose('GraphRangesTask', Task, GraphRanges)

export default GraphRangesTask
