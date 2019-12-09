import { types } from 'mobx-state-tree'
import { Mark } from '../../marks'
import SingleChoiceTask  from '@plugins/tasks/SingleChoiceTask'
import MultipleChoiceTask from '@plugins/tasks/MultipleChoiceTask'
import TextTask from '@plugins/tasks/TextTask'

const Tool = types.model('Tool', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  marks: types.map(Mark),
  max: types.optional(types.union(types.string, types.number), Infinity),
  min: types.optional(types.union(types.string, types.number), 0),
  tasks: types.array(types.union(
    SingleChoiceTask.TaskModel,
    MultipleChoiceTask.TaskModel,
    TextTask.TaskModel
  ))
})
  .views(self => ({
    get disabled () {
      return self.marks.size >= self.max
    },

    get hasCompletedTasks () {
      return self.tasks.reduce((isStepComplete, task) => isStepComplete && task.isComplete, true)
    },

    get isComplete () {
      return (self.marks.size >= self.min)
    }
  }))
  .actions(self => {
    function createMark (mark) {
      const newMark = Mark.create(mark)
      self.marks.put(newMark)
      return newMark
    }

    function deleteMark (mark) {
      self.marks.delete(mark.id)
    }

    return {
      createMark,
      deleteMark
    }
  })

export default Tool