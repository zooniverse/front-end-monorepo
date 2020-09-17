import { types } from 'mobx-state-tree'
import Resource from '../../Resource'

const SubjectSet = types
  .model('SubjectSet', {
    display_name: types.string,
    links: types.frozen({}),
    set_member_subjects_count: types.number
  })

export default types.compose('SubjectSetResource', Resource, SubjectSet)
