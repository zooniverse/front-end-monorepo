import { types } from 'mobx-state-tree'
import Task from './Task'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'
// TODO: Update MST to 3.0...
// {
//   _key: types,
//     label: types.string
// }
const MultipleChoice = types.model('MultipleChoice', {
  answers: types.array(types.frozen),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.boolean,
  type: types.literal('multiple')
})

export const MultipleChoiceTask = types.compose('MultipleChoiceTask', Task, MultipleChoice)