import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import MultipleChoiceAnnotation from './MultipleChoiceAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const MultipleChoice = types.model('MultipleChoice', {
  answers: types.array(types.frozen({
    _key: types.integer,
    label: types.string
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  type: types.literal('multiple')
})
  .views(self => ({
    get defaultAnnotation () {
      return MultipleChoiceAnnotation.create({ task: self.taskKey })
    }
  }))

const MultipleChoiceTask = types.compose('MultipleChoiceTask', Task, MultipleChoice)

export default MultipleChoiceTask
