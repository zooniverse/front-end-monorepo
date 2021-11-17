import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree'

import { getBearerToken } from '@store/utils'
import Subject from '../Subject'
import SingleImageSubject from '../SingleImageSubject'
import SingleVideoSubject from '../SingleVideoSubject'
import SubjectGroup from '../SubjectGroup'

const CACHE_SIZE = 10

/*
  see https://github.com/mobxjs/mobx-state-tree/issues/514
  for advice about using references with types.union.
*/

const SingleSubject = types.union(SingleImageSubject, SingleVideoSubject, Subject)
function subjectDispatcher (snapshot) {
  if (snapshot?.metadata?.['#subject_group_id']) {
    return SubjectGroup
  }
  return SingleSubject
}
const subjectModels = [ { dispatcher: subjectDispatcher }, SingleSubject, SubjectGroup ]
const SubjectType = types.union(...subjectModels)

export default types.model('AvailableSubjects', {
  subjects: types.array(SubjectType)
})

.actions(self => {
  async function _fetchAvailableSubjects(workflow) {
    const apiUrl = '/subjects/queued'
    const params = {
      page_size: CACHE_SIZE,
      workflow_id: workflow.id
    }
    if (workflow.grouped) {
      params.subject_set_id = workflow.subjectSetId
    }

    return await _fetchSubjects({ apiUrl, params })
  }

  async function _fetchSubjects({ apiUrl, params }) {
    const {
      authClient,
      client: {
        panoptes
      }
    } = getRoot(self)

    const authorization = await getBearerToken(authClient)
    const response = await panoptes.get(apiUrl, params, { authorization })

    if (response.body.subjects?.length > 0) {
      return response.body.subjects
    }
    return []
  }

  function clear() {
    self.subjects.clear()
  }

  function * next(workflow) {
    if (workflow) {
      try {
        if (self.subjects.length === 0) {
          const availableSubjects = yield _fetchAvailableSubjects(workflow)
          self.subjects.replace(availableSubjects)
        }
        if (self.subjects.length > 0) {
          const newSubject = getSnapshot(self.subjects[0])
          self.subjects.shift()
          return newSubject
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  return {
    clear,
    next: flow(next)
  }
})