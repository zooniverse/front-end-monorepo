import { types } from 'mobx-state-tree'
import Task from './Task'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'
const SingleChoice = types.model('SingleChoice', {
  answers: types.array(types.frozen({
    label: types.string,
    next: types.maybe(types.string)
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.boolean,
  type: types.literal('single')
})

const SingleChoiceTask = types.compose(Task, SingleChoice)

export default SingleChoiceTask