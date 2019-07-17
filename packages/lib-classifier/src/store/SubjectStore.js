import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, addMiddleware, flow, getRoot, isValidReference, onPatch, types } from 'mobx-state-tree'
import { getBearerToken } from './utils'
import { filterByLabel, filters } from '../components/Classifier/components/MetaTools/components/Metadata/components/MetadataModal'
import ResourceStore from './ResourceStore'
import Subject from './Subject'

const MINIMUM_QUEUE_SIZE = 3

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
    active: types.safeReference(Subject),
    resources: types.map(Subject),
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
    }
  }))

  .actions(self => {
    function afterAttach () {
      createWorkflowObserver()
      createClassificationObserver()
      createSubjectMiddleware()
    }

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const validWorkflowReference = isValidReference(() => getRoot(self).workflows.active)
        if (validWorkflowReference) {
          self.reset()
          self.populateQueue()
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
        } else {
          next(call)
        }
      } else {
        next(call)
      }
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

    function advance() {
      const validSubjectReference = isValidReference(() => self.active)
      if (validSubjectReference) {
        const idToRemove = self.active.id
        self.resources.delete(idToRemove)
      }

      const nextSubject = self.resources.values().next().value
      self.active = nextSubject && nextSubject.id

      if (self.resources.size < MINIMUM_QUEUE_SIZE) {
        console.log('Fetching more subjects')
        self.populateQueue()
      }
    }

    function * populateQueue () {
      const root = getRoot(self)
      const client = root.client.panoptes
      const validWorkflowReference = isValidReference(() => root.workflows.active)
      if (validWorkflowReference) {
        const workflowId = root.workflows.active.id
        self.loadingState = asyncStates.loading

        try {
          const { authClient } = getRoot(self)
          const authorization = yield getBearerToken(authClient)
          const response = yield client.get(`/subjects/queued`, { workflow_id: workflowId }, { authorization })

          if (response.body.subjects && response.body.subjects.length > 0) {
            response.body.subjects.forEach(subject => {
              self.resources.put(subject)
            })

            const validSubjectReference = isValidReference(() => self.active)
            if (!validSubjectReference) {
              self.advance()
            }
          }

          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function reset () {
      self.resources.clear()
    }

    return {
      advance,
      afterAttach,
      populateQueue: flow(populateQueue),
      reset
    }
  })

export default types.compose('SubjectResourceStore', ResourceStore, SubjectStore)
export { openTalkPage, MINIMUM_QUEUE_SIZE }
