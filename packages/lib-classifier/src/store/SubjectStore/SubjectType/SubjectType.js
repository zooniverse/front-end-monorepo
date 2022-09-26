import { types } from 'mobx-state-tree'

import * as subjects from '@store/subjects'
const { SubjectGroup, ...singleSubjects } = subjects

/*
  see https://github.com/mobxjs/mobx-state-tree/issues/514
  for advice about using references with types.union.
*/

export const SingleSubject = types.union(...Object.values(singleSubjects))

export function subjectDispatcher (snapshot) {
  if (snapshot?.metadata?.['#subject_group_id']) {
    return SubjectGroup
  }
  return SingleSubject
}
export const subjectModels = [ { dispatcher: subjectDispatcher }, SingleSubject, SubjectGroup ]
export const SubjectType = types.union(...subjectModels)

export default SubjectType
