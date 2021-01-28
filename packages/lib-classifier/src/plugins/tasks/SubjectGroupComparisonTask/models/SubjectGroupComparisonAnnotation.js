import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SubjectIndexPair = types.model('SubjectIndexPair', {
  index: types.number,
  subject: types.string,
})

const SubjectGroupComparison = types.model('SubjectGroupComparison', {
  value: types.array(SubjectIndexPair),
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0
    }
  }))

const SubjectGroupComparisonAnnotation = types.compose('SubjectGroupComparisonAnnotation', Annotation, SubjectGroupComparison)

export default SubjectGroupComparisonAnnotation
