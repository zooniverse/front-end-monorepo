import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SubjectGroup = types.model('SubjectGroup', {
  value: types.optional(types.array(types.number), [])
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0
    }
  }))

const SubjectGroupAnnotation = types.compose('SubjectGroupAnnotation', Annotation, SubjectGroup)

export default SubjectGroupAnnotation
