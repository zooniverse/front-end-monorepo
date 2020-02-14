import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import * as tools from '@plugins/drawingTools/models/tools'
import * as markTypes from '@plugins/drawingTools/models/marks'
import DrawingAnnotation from './DrawingAnnotation'

const markModels = Object.values(markTypes)
const markReferenceTypes = markModels.map(markType => types.safeReference(markType))
const toolModels = Object.values(tools)

const Drawing = types.model('Drawing', {
  activeMark: types.union(...markReferenceTypes),
  activeToolIndex: types.optional(types.number, 0),
  annotation: types.safeReference(DrawingAnnotation),
  help: types.optional(types.string, ''),
  instruction: types.string,
  subTaskVisibility: types.optional(types.boolean, true),  // TODO: change to false
  tools: types.array(types.union(...toolModels)),
  type: types.literal('drawing')
})
  .views(self => ({
    get activeTool () {
      return self.tools[self.activeToolIndex]
    },

    get defaultAnnotation () {
      return DrawingAnnotation.create({
        id: cuid(),
        task: self.taskKey,
        taskType: self.type
      })
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
    function afterCreate () {
      loadSubtasks()
    }

    function loadSubtasks () {
      self.tools.forEach((tool, toolIndex) => {
        const toolKey = `${self.taskKey}.${toolIndex}`
        tool.details.forEach((detail, detailIndex) => {
          const taskKey = `${toolKey}.${detailIndex}`
          const taskSnapshot = Object.assign({}, detail, { taskKey })
          tool.createTask(taskSnapshot)
        })
      })
    }

    function setActiveMark (mark) {
      self.activeMark = mark
    }

    function setActiveTool (toolIndex) {
      self.activeToolIndex = toolIndex
    }

    function complete () {
      self.updateAnnotation(self.marks)
    }

    function reset () {
      self.tools.forEach(tool => tool.reset())
    }
    
    function setSubTaskVisibility (visible) {
      self.subTaskVisibility = visible
    }

    return {
      afterCreate,
      complete,
      reset,
      setActiveMark,
      setActiveTool,
      setSubTaskVisibility
    }
  })

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
