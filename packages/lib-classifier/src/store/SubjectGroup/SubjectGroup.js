import { types } from 'mobx-state-tree'
import Resource from '../Resource'
import SingleImageSubject from '../SingleImageSubject'

const SubjectGroup = types
  .model('SubjectGroup', {
    subjects: types.array(SingleImageSubject)
  })

  

export default types.compose('SubjectGroup', Resource, SubjectGroup)
