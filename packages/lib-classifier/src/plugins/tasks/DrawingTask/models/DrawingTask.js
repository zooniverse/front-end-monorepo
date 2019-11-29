import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import * as tools from '@plugins/drawingTools/models/tools'
import DrawingAnnotation from './DrawingAnnotation'

const toolModels = Object.values(tools)

const Drawing = types.model('Drawing', {
  activeToolIndex: types.optional(types.number, 0),
  help: types.optional(types.string, ''),
  instruction: types.maybe(types.string),
  tools: types.array(types.union(...toolModels)),
  type: types.literal('drawing')
})
  .views(self => ({
    get activeTool () {
      return self.tools[self.activeToolIndex]
    },
    get defaultAnnotation () {
      return DrawingAnnotation.create({ task: self.taskKey })
    }
  }))
  .actions(self => {
    function setActiveTool (toolIndex) {
      self.activeToolIndex = toolIndex
    }
    return {
      setActiveTool
    }
  })

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
