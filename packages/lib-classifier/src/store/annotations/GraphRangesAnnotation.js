import { types } from 'mobx-state-tree'
import Annotation from './Annotation'

const GraphRanges = types.model('GraphRanges', {
  value: types.optional(types.array(types.number))
})

const GraphRangesAnnotation = types.compose('GraphRangesAnnotation', Annotation, GraphRanges)

export default GraphRangesAnnotation
