import { types } from 'mobx-state-tree'
import Annotation from './Annotation'
import { Graph2dRangeXAnnotation } from './DataVisToolAnnotations'

const DataVis = types.model('DataVis', {
  value: types.array(types.union({
    dispatcher: (snapshot) => {
      if (snapshot.toolType === 'graph2dRangeX') return Graph2dRangeXAnnotation
      return undefined
    }
  }, Graph2dRangeXAnnotation))
})

const DataVisAnnotation = types.compose('DataVisAnnotation', Annotation, DataVis)

export default DataVisAnnotation
