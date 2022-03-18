import { types } from 'mobx-state-tree'
import { Mark } from '../../marks'
import SingleChoiceTask from '@plugins/tasks/single'
import MultipleChoiceTask from '@plugins/tasks/multiple'
import TextTask from '@plugins/tasks/text'

const Tool = types
  .model('Tool', {
    color: types.optional(types.string, ''),
    details: types.array(types.frozen()),
    label: types.optional(types.string, ''),
    marks: types.map(Mark),
    max: types.optional(types.union(types.string, types.number), Infinity),
    min: types.optional(types.union(types.string, types.number), 0),
    tasks: types.array(
      types.union(
        SingleChoiceTask.TaskModel,
        MultipleChoiceTask.TaskModel,
        TextTask.TaskModel
      )
    ),
    type: types.literal('default')
  })
  .preProcessSnapshot((snapshot) => {
    const newSnapshot = Object.assign({}, snapshot)
    /*
    Create tasks from details if we have details but no tasks.
    */
    if (!snapshot.max) {
      newSnapshot.max = Infinity
    }
    if (!snapshot.min) {
      newSnapshot.min = 0
    }
    if (snapshot.details && !snapshot.tasks) {
      newSnapshot.tasks = []
      snapshot.details.forEach((detail, detailIndex) => {
        const toolKey = snapshot.key || 'subtask'
        const taskKey = `${toolKey}.${detailIndex}`
        const taskSnapshot = Object.assign({}, detail, { taskKey })
        newSnapshot.tasks.push(taskSnapshot)
      })
    }
    return newSnapshot
  })
  .views((self) => ({
    get disabled() {
      return self.marks.size >= self.max
    },

    get isComplete() {
      const allMarksComplete = Array.from(self.marks.values()).reduce(
        (allComplete, mark) => allComplete && mark.isComplete,
        true
      )
      return allMarksComplete && self.marks.size >= self.min
    },

    get isValid() {
      const allMarksValid = Array.from(self.marks.values()).reduce(
        (allValid, mark) => allValid && mark.isValid,
        true
      )
      return allMarksValid
    }
  }))
  .actions((self) => ({
    createMark(mark) {
      const newMark = Mark.create(
        Object.assign({}, mark, { toolType: self.type })
      )
      self.marks.put(newMark)
      return newMark
    },

    createTask(snapshot) {
      try {
        self.tasks.push(snapshot)
        return self.tasks[self.tasks.length - 1]
      } catch (e) {
        console.error(`${snapshot.taskKey} is not a valid drawing subtask`)
      }
    },

    deleteMark(mark) {
      self.marks.delete(mark.id)
    },

    handlePointerMove(event, mark) {
      mark.initialDrag(event)
    },

    // this outputs the mouse coords when not creating (ig: guideline for Polygon)
    // By default, this does nothing. Must be implemented in model/tool file (polygonTool.js)
    handlePointerPosition(event, mark) {},

    handlePointerUp(event, mark) {
      mark.finish()
    },

    reset() {
      self.marks.clear()
    },

    validate() {
      // if the needed validation action needs to vary,
      // then this can be moved to the tools that should delete on invalid mark
      // transcription line, ellipse
      self.marks.forEach((mark) => {
        if (!mark.isValid) {
          self.deleteMark(mark)
        }
      })
    }
  }))

export default Tool
