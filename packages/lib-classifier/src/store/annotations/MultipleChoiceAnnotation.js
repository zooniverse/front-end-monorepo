import { types } from 'mobx-state-tree'
import Annotation from './Annotation'

const MultipleChoice = types.model('MultipleChoice', {
  value: types.array(types.number)
})

const MultipleChoiceAnnotation = types.compose('MultipleChoiceAnnotation', Annotation, MultipleChoice)

export default MultipleChoiceAnnotation