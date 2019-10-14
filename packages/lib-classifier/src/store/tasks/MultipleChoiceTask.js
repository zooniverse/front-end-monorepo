import { types } from 'mobx-state-tree'
import Task from './Task'
import MultipleChoiceAnnotation from '../annotations/MultipleChoiceAnnotation'

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
  get annotation () {
    const { currentAnnotations } = getRoot(self).classifications
    let currentAnnotation
    if (currentAnnotations && currentAnnotations.size > 0) {
      currentAnnotation = currentAnnotations.get(self.taskKey)
    }
    return currentAnnotation || self.defaultAnnotation
  },
  get defaultAnnotation () {
    return MultipleChoiceAnnotation.create({ task: self.taskKey })
  }
}))
.actions(self => ({
  updateAnnotation (value) {
    const { addAnnotation } = getRoot(self).classifications
    addAnnotation(value, self)
  }
}))

const MultipleChoiceTask = types.compose('MultipleChoiceTask', Task, MultipleChoice)

export default MultipleChoiceTask
