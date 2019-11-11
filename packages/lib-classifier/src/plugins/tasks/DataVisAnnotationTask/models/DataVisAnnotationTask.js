import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import { Graph2dRangeXTool } from './dataVisTools'
import DataVisAnnotation from './DataVisAnnotation'

const DataVisTaskModel = types.model('DataVisTaskModel', {
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

const DataVisAnnotationTask = types.compose('DataVisAnnotationTask', Task, DataVisTaskModel)

export default DataVisAnnotationTask
