import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SubjectGroup = types.model('SubjectGroup', {
  value: types.maybeNull(types.number)
})
  .views(self => ({
    get isComplete () {
      return self.value !== null
    }
  }))

const SubjectGroupAnnotation = types.compose('SubjectGroupAnnotation', Annotation, SubjectGroup)

export default SubjectGroupAnnotation
