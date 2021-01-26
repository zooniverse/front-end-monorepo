import { getRoot, tryReference, types } from 'mobx-state-tree'
import Resource from '../Resource'
import subjectViewers from '@helpers/subjectViewers'
import SingleImageSubject from '../SingleImageSubject'
import Subject from '../Subject'

const SubjectGroup = types
  .model('SubjectGroup', {
    subjectIds: types.array(types.string),
  })

  .preProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    newSnapshot.subjectIds = snapshot?.metadata['#group_subject_ids']?.split('-') || []
    return newSnapshot
  })

export default types.compose('SubjectGroup', Subject, SubjectGroup)
