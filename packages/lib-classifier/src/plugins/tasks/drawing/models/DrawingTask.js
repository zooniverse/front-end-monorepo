import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SHOWN_MARKS from '@helpers/shownMarks'
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
  shownMarks: types.optional(types.enumeration(Object.keys(SHOWN_MARKS)), SHOWN_MARKS.ALL),
  hidingIndex: types.maybeNull(types.number),
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

    defaultAnnotation (id = cuid()) {
      return DrawingAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    },

    isComplete () {
      return self.tools.reduce((isTaskComplete, tool) => isTaskComplete && tool.isComplete, true)
    },

    get isValid () {
      return self.tools.reduce((isTaskValid, tool) => isTaskValid && tool.isValid, true)
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

    function complete(annotation) {
      self.subTaskVisibility = false
    }

    function reset () {
      self.tools.forEach(tool => tool.reset())
      self.activeToolIndex = 0
      self.subTaskVisibility = false
    }

    function togglePreviousMarks () {
      self.shownMarks = self.shownMarks === SHOWN_MARKS.ALL ? SHOWN_MARKS.NONE : SHOWN_MARKS.ALL
      self.hidingIndex = self.shownMarks === SHOWN_MARKS.NONE ? self.marks.length : 0
    }

    function validate () {
      self.tools.forEach(tool => tool.validate())
    }

    return {
      complete,
      reset,
      setActiveMark,
      setActiveTool,
      togglePreviousMarks,
      validate
    }
  })

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
