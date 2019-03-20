import { types } from 'mobx-state-tree'
import Annotation from '../Annotation'

const Graph2dRangeX = types.model('Graph2dRangeX', {
  value: types.array(types.model({
    tool: types.number,
    x: types.number,
    width: types.number
  }))
})

const Graph2dRangeXAnnotation = types.compose('Graph2dRangeXAnnotation', Annotation, Graph2dRangeX)

export default Graph2dRangeXAnnotation
