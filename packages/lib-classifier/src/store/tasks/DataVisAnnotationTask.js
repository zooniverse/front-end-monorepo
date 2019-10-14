import { types } from 'mobx-state-tree'
import Task from './Task'
import { Graph2dRangeXTool } from './dataVisTools'
import { DataVisAnnotation } from '../annotations'

const DataVisTask = types.model('DataVisTask', {
  help: types.optional(types.string, ''),
  instruction: types.maybe(types.string),
  tools: types.array(types.union({
    dispatcher: (snapshot) => {
      if (snapshot.type === 'graph2dRangeX') return Graph2dRangeXTool
      return undefined
    }
  }, Graph2dRangeXTool)),
  type: types.literal('dataVisAnnotation')
})
.views(self => ({
  get defaultAnnotation () {
    return DataVisAnnotation.create({ task: self.taskKey })
  }
}))

const DataVisAnnotationTask = types.compose('DataVisAnnotationTask', Task, DataVisTask)

export default DataVisAnnotationTask
