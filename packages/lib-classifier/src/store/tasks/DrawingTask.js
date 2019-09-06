import { types } from 'mobx-state-tree'
import Task from './Task'
import { Line, Point } from './drawingTools'

// TODO: Need to define tool models

const Drawing = types.model('Drawing', {
  help: types.optional(types.string, ''),
  instruction: types.maybe(types.string),
  tools: types.array(types.union({
    dispatcher: (snapshot) => {
      switch (snapshot.type) {
        case 'line':
          return Line
        case 'point':
          return Point
        default:
          return types.model({})
      }
    }
  })),
  type: types.literal('drawing')
})

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
