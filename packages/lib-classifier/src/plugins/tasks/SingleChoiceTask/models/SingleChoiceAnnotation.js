import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SingleChoice = types.model('SingleChoice', {
  value: types.maybeNull(types.number)
})

const SingleChoiceAnnotation = types.compose('SingleChoiceAnnotation', Annotation, SingleChoice)

export default SingleChoiceAnnotation
