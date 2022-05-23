import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import { Graph2dRangeXTool } from './dataVisTools'
import DataVisAnnotation from './DataVisAnnotation'

const DataVisTaskModel = types.model('DataVisTaskModel', {
  activeToolIndex: types.optional(types.number, 0),
  annotation: types.safeReference(DataVisAnnotation),
  tools: types.array(types.union({
    dispatcher: (snapshot) => {
      if (snapshot.type === 'graph2dRangeX') return Graph2dRangeXTool
      return undefined
    }
  }, Graph2dRangeXTool)),
  type: types.literal('dataVisAnnotation')
})
  .views(self => ({
    get activeTool () {
      return self.tools[self.activeToolIndex]
    },

    get instruction() {
      return self.strings.get('instruction')
    },

    defaultAnnotation (id = cuid()) {
      return DataVisAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

  .actions(self => {
    function setActiveTool (toolIndex) {
      self.activeToolIndex = toolIndex
    }

    function reset () {
      self.activeToolIndex = 0
    }

    return {
      reset,
      setActiveTool
    }
  })

const DataVisAnnotationTask = types.compose('DataVisAnnotationTask', Task, DataVisTaskModel)

export default DataVisAnnotationTask
