import { types } from 'mobx-state-tree'
import SubjectSet from '../SubjectSet'
import ResourceStore from '../../ResourceStore'

const SubjectSetStore = types
  .model('SubjectSetStore', {
    active: types.safeReference(SubjectSet),
    resources: types.map(SubjectSet),
    type: types.optional(types.string, 'subject_sets')
  })

export default types.compose('SubjectSetResourceStore', ResourceStore, SubjectSetStore)