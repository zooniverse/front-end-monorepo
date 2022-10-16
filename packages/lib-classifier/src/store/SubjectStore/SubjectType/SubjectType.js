import { types } from 'mobx-state-tree'

import * as subjects from '@store/subjects'
const { SubjectGroup, ...singleSubjects } = subjects

/*
  see https://github.com/mobxjs/mobx-state-tree/issues/514
  for advice about using references with types.union.
*/

const SingleSubject = types.union(...Object.values(singleSubjects))

function subjectDispatcher (snapshot) {
  if (snapshot?.metadata?.['#subject_group_id']) {
    return SubjectGroup
  }
  return SingleSubject
}

const SubjectType = types.union({ dispatcher: subjectDispatcher }, SingleSubject, SubjectGroup)

export default SubjectType
