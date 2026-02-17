import cuid from 'cuid'
import { autorun } from 'mobx'
import { addDisposer, applySnapshot, getSnapshot, types } from 'mobx-state-tree'
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
  // This array contains the ID of every mark when the "Show Previous Marks" option is toggled. This will then be used to filter out which marks should be shown or hidden on the Subject Viewer
  hiddenMarkIds: types.optional(types.array(types.string), []), 
  tools: types.array(GenericTool),
  type: types.literal('drawing')
})
  .preProcessSnapshot(snapshot => {
    const newSnapshot = { ...snapshot }
    /*
    Create keys of the form 'T0.0' for each of this task's tools
    */
    newSnapshot.tools = []
    snapshot.tools?.forEach((tool, toolIndex) => {
      const toolKey = `${snapshot.taskKey}.${toolIndex}`
      const toolSnapshot = { ...tool, key: toolKey }
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

    function _onLocaleChange() {
      const stringsSnapshot = getSnapshot(self.strings)
      self.setToolTaskStrings(stringsSnapshot)
    }

    function _onToolChange() {
      if (self.activeToolIndex > -1) {
        self.validate()
        self.setActiveMark(undefined)
      }
    }

    return ({
      afterCreate() {
        addDisposer(self, autorun(_onLocaleChange))
        addDisposer(self, autorun(_onToolChange))
      },

      setActiveMark(mark) {
        self.activeMark = mark?.id
      },

      setActiveTool(toolIndex) {
        self.activeToolIndex = toolIndex
      },

      complete(annotation) {
        self.subTaskVisibility = false
      },

      reset() {
        self.tools.forEach(tool => tool.reset())
        self.activeToolIndex = 0
        self.subTaskVisibility = false
        if (self.shownMarks === SHOWN_MARKS.NONE) {
          self.hiddenMarkIds.clear()
          self.shownMarks = SHOWN_MARKS.ALL
        }
      },

      setToolTaskStrings(stringsSnapshot) {
        const stringEntries = Object.entries(stringsSnapshot)
        self.tools.forEach((tool, toolIndex) => {
          const toolPrefix = `tools.${toolIndex}`
          tool.tasks.forEach((task, taskIndex) => {
            const prefix = `${toolPrefix}.details.${taskIndex}.`
            const taskStrings = stringEntries.filter(([key, value]) => key.startsWith(prefix))
            const taskStringsSnapshot = {}
            taskStrings.forEach(([key, value]) => {
              const newKey = key.slice(prefix.length)
              taskStringsSnapshot[newKey] = value
            })
            try {
              applySnapshot(task.strings, taskStringsSnapshot)
            } catch (error) {
              console.error(`${task.taskKey} ${task.type}: could not apply language strings`)
              console.error(error)
            }
          })
        })
      },

      togglePreviousMarks() {
        self.shownMarks = self.shownMarks === SHOWN_MARKS.ALL ? SHOWN_MARKS.NONE : SHOWN_MARKS.ALL
        if (self.shownMarks === SHOWN_MARKS.NONE) {
          self.hiddenMarkIds.replace(self.marks.map(mark => mark.id))
        } else {
          self.hiddenMarkIds.clear()
        }
      },

      validate() {
        self.tools.forEach(tool => tool.validate())
      }
    })
  })

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
