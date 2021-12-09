import { getRoot, tryReference, types } from 'mobx-state-tree'
import Resource from '@store/Resource'
import subjectViewers from '@helpers/subjectViewers'
import SingleImageSubject from '../SingleImageSubject'
import Subject from '../Subject'

const SubjectGroup = types
  .model('SubjectGroup', {
    subjectIds: types.array(types.string),
  })

  .preProcessSnapshot(snapshot => {
    // The Subject Group LOOKS like a normal Subject, but consists of multiple
    // Subjects stitched together in the backend. The implicit construction of
    // the Subject Group can be derived from its metadata:
    // subject.metadata: {
    //   #group_subject_ids: array of constituent subject IDs, as a string, delimited by '-' 
    //   #subject_group_id: ID of this specific subject group
    // }
    const newSnapshot = Object.assign({}, snapshot)
    newSnapshot.subjectIds = snapshot?.metadata?.['#group_subject_ids']?.split('-') || []
    return newSnapshot
  })

export default types.compose('SubjectGroup', Subject, SubjectGroup)
