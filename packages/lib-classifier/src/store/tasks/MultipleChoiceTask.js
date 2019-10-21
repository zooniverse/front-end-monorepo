import { types } from 'mobx-state-tree'
import Task from './Task'
import { MultipleChoiceAnnotation } from '../annotations'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const MultipleChoice = types.model('MultipleChoice', {
  answers: types.array(types.frozen({
    _key: types.integer,
    label: types.string
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.maybe(types.boolean),
  type: types.literal('multiple')
})
.views(self => ({
  get defaultAnnotation () {
    return MultipleChoiceAnnotation.create({ task: self.taskKey })
  }
}))

const MultipleChoiceTask = types.compose('MultipleChoiceTask', Task, MultipleChoice)

export default MultipleChoiceTask
