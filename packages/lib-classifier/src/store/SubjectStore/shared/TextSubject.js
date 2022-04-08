import { flow, types } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'

const TextSubject = types
  .model('TextSubject', {
    content: types.maybeNull(types.string),
    contentLoadingState: types.optional(types.enumeration('contentLoadingState', asyncStates.values), asyncStates.initialized),
    error: types.optional(types.maybeNull(types.frozen({})), null)
  })
  .actions(self => {
    function afterAttach () {
      if (self.contentLoadingState === asyncStates.initialized) {
        self.fetchContent()
      }
    }

    function getSubjectUrl () {
      // Find locations that have a text/plain MIME type.
      const textLocation = self.locations.find(l => l['text/plain']) || {}
      const url = Object.values(textLocation)[0]
      if (url) {
        return url
      } else {
        throw new Error('No text url found for this subject')
      }
    }

    function * fetchContent () {
      self.contentLoadingState = asyncStates.loading

      try {
        const url = getSubjectUrl()
        const response = yield fetch(url)
        if (!response.ok) {
          const error = new Error(response.statusText)
          error.status = response.status
          throw error
        }
        self.content = yield response.text()
        self.contentLoadingState = asyncStates.success
      } catch (error) {
        self.contentLoadingState = asyncStates.error
        self.error = error
      }
    }

    return {
      afterAttach,
      fetchContent: flow(fetchContent)
    }
  })

export default TextSubject
