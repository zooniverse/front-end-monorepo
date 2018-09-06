import { types } from 'mobx-state-tree'
import Task from './Task'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const MultipleChoice = types.model('MultipleChoice', {
  answers: types.array(types.frozen({
    _key: types.integer,
    label: types.string
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.boolean,
  type: types.literal('multiple')
})

const MultipleChoiceTask = types.compose('MultipleChoiceTask', Task, MultipleChoice)

export default MultipleChoiceTask