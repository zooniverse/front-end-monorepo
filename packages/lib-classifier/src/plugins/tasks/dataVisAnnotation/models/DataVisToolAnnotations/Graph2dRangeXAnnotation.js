import { types } from 'mobx-state-tree'

const Graph2dRangeXAnnotation = types.model('Graph2dRangeXAnnotation', {
  tool: types.number,
  toolType: types.string,
  x: types.number,
  width: types.number,
  zoomLevelOnCreation: types.number
})

export default Graph2dRangeXAnnotation
