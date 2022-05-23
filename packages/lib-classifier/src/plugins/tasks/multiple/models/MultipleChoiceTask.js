import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import MultipleChoiceAnnotation from './MultipleChoiceAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const MultipleChoice = types.model('MultipleChoice', {
  annotation: types.safeReference(MultipleChoiceAnnotation),
  answers: types.array(types.frozen({
    label: types.string
  })),
  question: types.string,
  type: types.literal('multiple')
})
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return MultipleChoiceAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const MultipleChoiceTask = types.compose('MultipleChoiceTask', Task, MultipleChoice)

export default MultipleChoiceTask
