import { types } from 'mobx-state-tree'
import Task from './Task'
import { Line, Point } from './drawingTools'

// TODO: Need to define tool models

const Drawing = types.model('Drawing', {
  answers: types.array(types.frozen({
    label: types.string,
    next: types.maybe(types.string)
  })),
  help: types.optional(types.string, ''),
  instruction: types.maybe(types.string),
  tools: types.array(types.union({
    dispatcher: (snapshot) => {
      switch (snapshot.type) {
        case 'line':
          return Line
        case 'point':
          return Point
      }
    }
  })),
  type: types.literal('drawing')
})

const DrawingTask = types.compose('DrawingTask', Task, Drawing)

export default DrawingTask
