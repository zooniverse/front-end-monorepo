import { types } from 'mobx-state-tree'
import countType from '../helpers/countType'

const SegmentedLineTool = types
  .model('SegmentedLineTool', {
    color: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    max: countType(),
    max_vertices: countType(),
    min: countType(0),
    min_vertices: countType(2),
    type: types.literal('SegmentedLine')
  })

export default SegmentedLineTool
