import { types } from 'mobx-state-tree'
import Annotation from './Annotation'

const GraphRanges = types.model('GraphRanges', {
  value: types.array(types.model({
    x: types.number,
    width: types.number
  }))
})

const GraphRangesAnnotation = types.compose('GraphRangesAnnotation', Annotation, GraphRanges)

export default GraphRangesAnnotation
