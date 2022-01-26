import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, addMiddleware, flow, getRoot, isValidReference, tryReference, types } from 'mobx-state-tree'
import { getBearerToken } from '@store/utils'
import { getIndexedSubjects, subjectSelectionStrategy } from './helpers'
import { filterByLabel, filters } from '../../components/Classifier/components/MetaTools/components/Metadata/components/MetadataModal'
import ResourceStore from '@store/ResourceStore'
import Subject from './Subject'
import SingleImageSubject from './SingleImageSubject'
import SingleVideoSubject from './SingleVideoSubject'
import SubjectGroup from './SubjectGroup'
import AvailableSubjects from './AvailableSubjects'

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
    available: types.optional(AvailableSubjects, () => AvailableSubjects.create({})),
    queue: types.array(types.safeReference(SubjectType)),
    resources: types.map(SubjectType),
    type: types.optional(types.string, 'subjects')
  })

  .views(self => ({
    get classification() {
      const { classifications } = getRoot(self)
      const classification = tryReference(() => classifications.active)
      return classification
    },

    get isThereMetadata() {
      const validSubjectReference = isValidReference(() => self.active)
      if (validSubjectReference) {
        const filteredMetadata = Object.keys(self.active.metadata)
          .filter((label) => filterByLabel(label, filters))
        return filteredMetadata.length > 0
      }

      return false
    },
    /** a helper to get the first subject in the queue */
    get first() {
      const [ first ] = self.queue
      return first
    },
    /** a helper to get the last subject in the queue */
    get last() {
      let lastSubject

      if ( self.queue.length > 0 ) {
        lastSubject = self.queue[self.queue.length - 1]
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
    function _addMiddleware(call, next, abort) {
      if (call.name === 'advance') {
        _onSubjectAdvance(call, next, abort)
      } else {
        next(call)
      }
    }

    function _onClassificationChange() {
      const subject = tryReference(() => self.active)

      // start a new history for each new subject and classification.
      if (self.classification && subject) {
        subject.stepHistory.start()
      }
    }

    function _onSubjectAdvance(call, next, abort) {
      const root = getRoot(self)
      const validSubjectReference = isValidReference(() => self.active)
      if (validSubjectReference) {
        const subject = self.active
        if (!root.feedback.shouldShowFeedback && subject && subject.shouldDiscuss) {
          const { url, newTab } = subject.shouldDiscuss
          openTalkPage(url, newTab)
        }
      }
      next(call)
    }

    function _onWorkflowChange() {
      const workflow = tryReference(() => getRoot(self).workflows.active)
      const subjectSet = tryReference(() => workflow?.subjectSet)
      if (workflow || subjectSet) {
        self.reset()
        self.populateQueue(workflow.selectedSubjects)
      }
    }

    function afterAttach () {
      addDisposer(self, autorun(_onWorkflowChange))
      addDisposer(self, autorun(_onClassificationChange))
      addMiddleware(self, _addMiddleware)
    }

    async function _fetchPreviousSubjects(workflow, priority) {
      const ids = await getIndexedSubjects(workflow.subjectSetId, priority, 'lt', 'desc')
      if (ids.length > 0) {
        const apiUrl = '/subjects/selection'
        const params = {
          ids: ids.join(','),
          workflow_id: workflow.id
        }
        const newSubjects = await _fetchSubjects({ apiUrl , params })
        return newSubjects
      }
      return []
    }

    async function _fetchSubjects({ apiUrl, params }) {
      const {
        authClient,
        client: {
          panoptes
        }
      } = getRoot(self)

      try {
        const authorization = await getBearerToken(authClient)
        const response = await panoptes.get(apiUrl, params, { authorization })

        if (response.body.subjects?.length > 0) {
          return response.body.subjects
        }
      } catch (error) {
        console.error(error)
      }
      return []
    }

    function advance() {
      const workflow = tryReference(() => getRoot(self).workflows.active)
      const activeSubject = tryReference(() => self.active)

      if (workflow?.hasIndexedSubjects) {
        activeSubject?.markAsSeen()
        self.nextIndexed()
      } else {
        self.shift()
      }
    }

    function append (newSubjects) {
      newSubjects.forEach(subject => {
        try {
          const alreadyStored = self.resources.get(subject.id)
          if (!alreadyStored) {
            self.resources.put(subject)
          }
          self.queue.push(subject.id)
        } catch (error) {
          console.error(`Subject ${subject.id} is not a valid subject.`)
          console.error(error)
        }
      })

      const activeSubject = tryReference(() => self.active)
      if (!activeSubject && self.resources.size > 0) {
        self.advance()
      }
    }

    function * buildPreviousQueue(currentPriority) {
      const workflow = tryReference(() => getRoot(self).workflows.active)
      try {
        if (workflow?.hasIndexedSubjects) {
          self.loadingState = asyncStates.loading
          const newSubjects = yield _fetchPreviousSubjects(workflow, self.first.priority)
          self.loadingState = asyncStates.success
          self.prepend(newSubjects)
          const activeIndex = self.queue.findIndex(subject => subject.priority === currentPriority)
          if (activeIndex > 0) {
            const previousSubject = self.queue[activeIndex - 1]
            self.setActiveSubject(previousSubject.id)
          }
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function clearQueue() {
      self.onReset()
      self.reset()
    }
    /** Get the next subject, in an indexed, prioritised set, and make it the active subject */
    function nextIndexed() {
      const activeSubject = tryReference(() => self.active)
      const workflow = tryReference(() => getRoot(self).workflows.active)

      // In indexed, prioritised sets, the next subject may not be first in the queue
      if (workflow?.hasIndexedSubjects) {
        self.available.clear()
        let nextSubjects = self.queue
        if (activeSubject) {
          const activeIndex = self.queue.indexOf(activeSubject)
          nextSubjects = self.queue.slice(activeIndex + 1)
        }
        const nextSubject = nextSubjects[0]
        if (nextSubject) {
          self.setActiveSubject(nextSubject.id)
        }
        if (nextSubjects.length <= MINIMUM_QUEUE_SIZE) {
          console.log('Fetching more subjects')
          self.populateQueue()
        }
      }
    }
    /** request exactly one unclassified subject from /subjects/queued */
    function * nextAvailable() {
      const root = getRoot(self)
      const workflow = tryReference(() => root.workflows.active)

      if (workflow) {
        try {
          self.resources.clear()
          self.loadingState = asyncStates.loading
          const newSubject = yield self.available.next(workflow)
          self.loadingState = asyncStates.success
          if (newSubject) {
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
          const strategy = yield subjectSelectionStrategy(workflow, subjectIDs, self.last?.priority)

          if (strategy) {
            const { apiUrl, params } = strategy
            self.loadingState = asyncStates.loading
            const subjects = yield _fetchSubjects({ apiUrl, params })
            self.loadingState = asyncStates.success
            if (subjects?.length > 0) {
              self.append(subjects)
            }
          }
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }
    /** Insert new subjects into the queue but maintain priority ordering */
    function prepend(newSubjects = []) {
      if (newSubjects.length > 0) {
        newSubjects.forEach(subjectSnapshot => {
          try {
            self.resources.put(subjectSnapshot)
            self.queue.unshift(subjectSnapshot.id)
          } catch (error) {
            console.error(`Subject ${subject.id} is not a valid subject.`)
            console.error(error)
          }
        })
      }
    }
    /** Get the previous subject, in an indexed, prioritised set, and make it the active subject */
    function previousIndexed() {
      const root = getRoot(self)
      const workflow = tryReference(() => root.workflows.active)
      const activeSubject = tryReference(() => self.active)
      const currentPriority = activeSubject?.priority

      if (workflow?.hasIndexedSubjects) {
        self.available.clear()
        let previousSubjects = []
        if (activeSubject) {
          const activeIndex = self.queue.indexOf(activeSubject)
          previousSubjects = self.queue.slice(0, activeIndex)
        }
        if (previousSubjects.length > 0) {
          const previousSubject = previousSubjects[previousSubjects.length - 1]
          self.setActiveSubject(previousSubject.id)
        }
        if (previousSubjects.length <= MINIMUM_QUEUE_SIZE) {
          self.buildPreviousQueue(currentPriority)
        }
      }
    }

    function reset () {
      self.resources.clear()
      self.available.clear()
    }

    function setActiveSubject(subjectID) {
      self.active = subjectID
      if (process.env.NODE_ENV !== 'test') console.log('Loading subject', subjectID)
    }

    function setOnReset(callback) {
      self.onReset = callback
    }

    function setResources(subjects = []) {
      if (subjects.length > 0) {
        try {
          subjects.forEach(subject => {
            if (subject) {
              self.resources.put(subject)
              self.queue.push(subject.id)
            }
          })
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
        }
      }
    }
    /** Shift the subject queue by one subject, so that the active subject is always the first subject. */
    function shift() {
      const subject = tryReference(() => self.active)

      if (subject) {
        self.resources.delete(subject.id)
      }
      if (self.resources.size < MINIMUM_QUEUE_SIZE) {
        console.log('Fetching more subjects')
        self.populateQueue()
      }
      if (self.first) {
        self.setActiveSubject(self.first.id)
      }
    }

    return {
      advance,
      afterAttach,
      append,
      buildPreviousQueue: flow(buildPreviousQueue),
      clearQueue,
      nextIndexed,
      nextAvailable: flow(nextAvailable),
      prepend,
      populateQueue: flow(populateQueue),
      previousIndexed,
      reset,
      setActiveSubject,
      setOnReset,
      setResources,
      shift
    }
  })

export default types.compose('SubjectResourceStore', ResourceStore, SubjectStore)
export { openTalkPage, MINIMUM_QUEUE_SIZE }
