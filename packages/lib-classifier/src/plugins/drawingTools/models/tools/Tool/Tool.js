import { types } from 'mobx-state-tree'
import { Mark } from '../../marks'
import SingleChoiceTask  from '@plugins/tasks/SingleChoiceTask'
import MultipleChoiceTask from '@plugins/tasks/MultipleChoiceTask'
import TextTask from '@plugins/tasks/TextTask'

const Tool = types.model('Tool', {
  color: types.optional(types.string, ''),
  details: types.array(types.frozen()),
  label: types.optional(types.string, ''),
  marks: types.map(Mark),
  max: types.optional(types.union(types.string, types.number), Infinity),
  min: types.optional(types.union(types.string, types.number), 0),
  tasks: types.array(types.union(
    SingleChoiceTask.TaskModel,
    MultipleChoiceTask.TaskModel,
    TextTask.TaskModel
  )),
  type: types.literal('default')
})
  .preProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    /*
    Create tasks from details if we have details but no tasks.
    */
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
  .views(self => ({
    get disabled () {
      return self.marks.size >= self.max
    },

    get isComplete () {
      const allMarksComplete = Array.from(self.marks.values())
        .reduce((allComplete, mark) => allComplete && mark.isComplete, true)
      return (allMarksComplete && self.marks.size >= self.min)
    }
  }))
  .actions(self => {
    function createMark (mark) {
      const newMark = Mark.create(Object.assign({}, mark, { toolType: self.type }))
      self.marks.put(newMark)
      return newMark
    }

    function createTask (snapshot) {
      try {
        self.tasks.push(snapshot)
        return self.tasks[self.tasks.length - 1]
      }
      catch (e) {
        console.error(`${snapshot.taskKey} is not a valid drawing subtask`)
      }
    }

    function deleteMark (mark) {
      self.marks.delete(mark.id)
    }

    function reset () {
      self.marks.clear()
    }

    return {
      createMark,
      createTask,
      deleteMark,
      reset
    }
  })

export default Tool
