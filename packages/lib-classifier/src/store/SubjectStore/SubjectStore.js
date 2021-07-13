import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, addMiddleware, flow, getRoot, getSnapshot, isValidReference, onPatch, tryReference, types } from 'mobx-state-tree'
import { getBearerToken } from '../utils'
import { subjectSelectionStrategy } from './helpers'
import { filterByLabel, filters } from '../../components/Classifier/components/MetaTools/components/Metadata/components/MetadataModal'
import ResourceStore from '../ResourceStore'
import Subject from '../Subject'
import SingleImageSubject from '../SingleImageSubject'
import SingleVideoSubject from '../SingleVideoSubject'
import SubjectGroup from '../SubjectGroup'

const MINIMUM_QUEUE_SIZE = 3

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


function openTalkPage (talkURL, newTab = false) {
  if (newTab) {
    const newTab = window.open()
    newTab.opener = null
    newTab.location = talkURL
    newTab.target = '_blank'
    newTab.focus()
  } else {
    window.location.assign(talkURL)
  }
}

const SubjectStore = types
  .model('SubjectStore', {
    active: types.safeReference(SubjectType),
    availableSubjects: types.array(SubjectType),
    resources: types.map(SubjectType),
    type: types.optional(types.string, 'subjects')
  })

  .views(self => ({
    get isThereMetadata () {
      const validSubjectReference = isValidReference(() => self.active)
      if (validSubjectReference) {
        const filteredMetadata = Object.keys(self.active.metadata)
          .filter((label) => filterByLabel(label, filters))
        return filteredMetadata.length > 0
      }

      return false
    },

    /** a helper to get the last subject in the queue */
    get last () {
      let lastSubject

      if ( self.resources.size > 0 ) {
        const activeSubjects = Array.from(self.resources.values())
        lastSubject = activeSubjects[self.resources.size - 1]
      }
      return lastSubject
    }
  }))

  .volatile(self => {
    return {
      onReset: () => null
    }
  })

  .actions(self => {
    function afterAttach () {
      createWorkflowObserver()
      createClassificationObserver()
      createSubjectMiddleware()
    }

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const workflow = tryReference(() => getRoot(self).workflows.active)
        const subjectSet = tryReference(() => workflow?.subjectSet)
        if (workflow || subjectSet) {
          self.reset()
          self.populateQueue(workflow.selectedSubjects)
        }
      }, { name: 'SubjectStore Workflow Observer autorun' })
      addDisposer(self, workflowDisposer)
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onPatch(getRoot(self), (patch) => {
          const { path, value } = patch
          if (path === '/classifications/loadingState' && value === 'posting') self.advance()
        })
      }, { name: 'SubjectStore Classification Observer autorun' })
      addDisposer(self, classificationDisposer)
    }

    function onSubjectAdvance (call, next, abort) {
      const root = getRoot(self)
      const validSubjectReference = isValidReference(() => self.active)
      if (validSubjectReference) {
        const subject = self.active
        const shouldShowFeedback = root.feedback.isActive && root.feedback.messages.length && !root.feedback.showModal
        if (!shouldShowFeedback && subject && subject.shouldDiscuss) {
          const { url, newTab } = subject.shouldDiscuss
          openTalkPage(url, newTab)
        }
      }
      next(call)
    }

    function createSubjectMiddleware () {
      const subjectMiddleware = autorun(() => {
        addMiddleware(self, (call, next, abort) => {
          if (call.name === 'advance') {
            onSubjectAdvance(call, next, abort)
          } else {
            next(call)
          }
        })
      }, { name: 'SubjectStore Middleware autorun' })
      addDisposer(self, subjectMiddleware)
    }

    async function _fetchAvailableSubjects(workflow) {
      const apiUrl = '/subjects/queued'
      const params = {
        page_size: 10,
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

    function advance () {
      const validSubjectReference = isValidReference(() => self.active)
      if (validSubjectReference) {
        const idToRemove = self.active.id
        self.resources.delete(idToRemove)
      }

      const nextSubject = self.resources.values().next().value
      self.active = nextSubject && nextSubject.id
      if (process.env.NODE_ENV !== 'test') console.log('Loading subject', nextSubject && nextSubject.id)

      if (self.resources.size < MINIMUM_QUEUE_SIZE) {
        console.log('Fetching more subjects')
        self.populateQueue()
      }
    }

    function append (newSubjects) {
      newSubjects.forEach(subject => {
        try {
          const existsInQueue = self.resources.get(subject.id)
          if (!existsInQueue) self.resources.put(subject)
        } catch (error) {
          console.error(`Subject ${subject.id} is not a valid subject.`)
          console.error(error)
        }
      })

      const validSubjectReference = isValidReference(() => self.active)
      if (!validSubjectReference && self.resources.size > 0) {
        self.advance()
      }
    }

    function clearQueue() {
      self.onReset()
      self.reset()
    }

    /** request exactly one unclassified subject from /subjects/queued */
    function * nextAvailable() {
      const root = getRoot(self)
      const workflow = tryReference(() => root.workflows.active)

      if (workflow) {
        try {
          if (self.availableSubjects.length === 0) {
            self.loadingState = asyncStates.loading
            const availableSubjects = yield _fetchAvailableSubjects(workflow)
            self.availableSubjects.replace(availableSubjects)
            self.loadingState = asyncStates.success
          }
          if (self.availableSubjects.length > 0) {
            self.reset()
            const newSubject = getSnapshot(self.availableSubjects[0])
            self.availableSubjects.shift()
            self.append([newSubject])
          }
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function * populateQueue (subjectIDs) {
      const root = getRoot(self)
      const workflow = tryReference(() => root.workflows.active)
      
      if (workflow) {
        try {
          const { apiUrl, params } = yield subjectSelectionStrategy(workflow, subjectIDs, self.last?.priority)

          self.loadingState = asyncStates.loading
          const subjects = yield _fetchSubjects({ apiUrl, params })
          self.loadingState = asyncStates.success
          if (subjects?.length > 0) {
            self.append(subjects)
          }
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        } 
      }
    }

    function reset () {
      self.resources.clear()
    }

    function setOnReset(callback) {
      self.onReset = callback
    }

    return {
      advance,
      afterAttach,
      append,
      clearQueue,
      nextAvailable: flow(nextAvailable),
      populateQueue: flow(populateQueue),
      reset,
      setOnReset
    }
  })

export default types.compose('SubjectResourceStore', ResourceStore, SubjectStore)
export { openTalkPage, MINIMUM_QUEUE_SIZE }
