import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import * as tools from '@plugins/drawingTools/models/tools'
import * as markTypes from '@plugins/drawingTools/models/marks'
import DrawingAnnotation from './DrawingAnnotation'

const markModels = Object.values(markTypes)
const GenericMark = types.union(...markModels)
const toolModels = Object.values(tools)
const GenericTool = types.union(...toolModels)

export const Drawing = types.model('Drawing', {
  activeMark: types.safeReference(GenericMark),
  activeToolIndex: types.optional(types.number, 0),
  annotation: types.safeReference(DrawingAnnotation),
  help: types.optional(types.string, ''),
  instruction: types.string,
  subTaskMarkBounds: types.optional(types.frozen({}), undefined),
  subTaskVisibility: types.optional(types.boolean, false),
  tools: types.array(GenericTool),
  type: types.literal('drawing')
})
  .preProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    /*
    Create keys of the form 'T0.0' for each of this task's tools
    */
    newSnapshot.tools = []
    snapshot.tools?.forEach((tool, toolIndex) => {
      const toolKey = `${snapshot.taskKey}.${toolIndex}`
      const toolSnapshot = Object.assign({}, tool, { key: toolKey })
      newSnapshot.tools.push(toolSnapshot)
    })
    return newSnapshot
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
      self.activeToolIndex = 0
      self.subTaskVisibility = false
    }
    
    function setSubTaskVisibility (visible, drawingMarkNode) {
      self.subTaskVisibility = visible
      self.subTaskMarkBounds = (drawingMarkNode)
        ? drawingMarkNode.getBoundingClientRect()
        : undefined
    }

    return {
      complete,
      reset,
      setActiveMark,
      setActiveTool,
      setSubTaskVisibility
    }
  })

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
