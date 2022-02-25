import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SingleChoice = types.model('SingleChoice', {
  taskType: types.literal('single'),
  value: types.maybeNull(types.number)
})
  .views(self => ({
    get isComplete () {
      return self.value !== null
    }
  }))

const SingleChoiceAnnotation = types.compose('SingleChoiceAnnotation', Annotation, SingleChoice)

export default SingleChoiceAnnotation
