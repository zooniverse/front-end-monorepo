import { types } from 'mobx-state-tree'
import Task from './Task'
import { Graph2dRangeXTool } from './dataVisTools'

const DataVisAnnotation = types.model('DataVisAnnotation', {
  help: types.optional(types.string, ''),
  instruction: types.maybe(types.string),
  tools: types.array(types.union({
    dispatcher: (snapshot) => {
      if (snapshot.type === 'graph2dRangeX') return Graph2dRangeXTool
    }
  }, Graph2dRangeXTool)),
  type: types.literal('dataVisAnnotation')
})


const DataVisAnnotationTask = types.compose('DataVisAnnotationTask', Task, DataVisAnnotation)

export default DataVisAnnotationTask
