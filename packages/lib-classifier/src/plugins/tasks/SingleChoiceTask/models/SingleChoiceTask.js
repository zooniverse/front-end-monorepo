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
  type: types.literal('single')
})
  .views(self => ({
    get defaultAnnotation () {
      return SingleChoiceAnnotation.create({ task: self.taskKey, taskType: self.type })
    }
  }))

const SingleChoiceTask = types.compose('SingleChoiceTask', Task, SingleChoice)

export default SingleChoiceTask
