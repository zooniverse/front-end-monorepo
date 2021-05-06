import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const MultipleChoice = types.model('MultipleChoice', {
  taskType: types.literal('multiple'),
  value: types.optional(types.array(types.number), [])
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0
    }
  }))

const MultipleChoiceAnnotation = types.compose('MultipleChoiceAnnotation', Annotation, MultipleChoice)

export default MultipleChoiceAnnotation
