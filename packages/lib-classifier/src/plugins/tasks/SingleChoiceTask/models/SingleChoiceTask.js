import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SingleChoiceAnnotation from './SingleChoiceAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const SingleChoice = types.model('SingleChoice', {
  answers: types.array(types.frozen({
    label: types.string,
    next: types.maybe(types.string)
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.maybe(types.boolean), // Should this be an optional type with the default to true?
  type: types.literal('single')
})
.views(self => ({
  get defaultAnnotation () {
    return SingleChoiceAnnotation.create({ task: self.taskKey })
  }
}))

const SingleChoiceTask = types.compose('SingleChoiceTask', Task, SingleChoice)

export default SingleChoiceTask
