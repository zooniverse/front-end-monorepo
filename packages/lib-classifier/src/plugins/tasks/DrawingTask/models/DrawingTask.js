import { clone, detach, tryReference, types } from 'mobx-state-tree'
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
    },

    get isComplete () {
      return self.tools.reduce((isTaskComplete, tool) => isTaskComplete && tool.isComplete, true)
    },

    get marks () {
      return self.tools.reduce(function flattenMarks (allMarks, tool) {
        const toolMarks = Array.from(tool.marks.values())
        return allMarks.concat(toolMarks)
      }, [])
    }
  }))
  .actions(self => {
    function setActiveTool (toolIndex) {
      self.activeToolIndex = toolIndex
    }

    function complete () {
      const newValue = self.marks.map(mark => detach(mark))
      self.updateAnnotation(newValue)
    }

    function start () {
      const activeMarks = self.annotation.value
      activeMarks.forEach(function addMarksToTools (mark) {
        const newMark = clone(mark)
        const tool = tryReference(() => self.tools[newMark.toolIndex])
        tool && tool.marks.put(newMark)
      })
      self.updateAnnotation([])
    }

    return {
      complete,
      setActiveTool,
      start
    }
  })

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
