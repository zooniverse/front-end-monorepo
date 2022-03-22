import { flow, types } from 'mobx-state-tree'
import request from 'superagent'
import asyncStates from '@zooniverse/async-states'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'

const TextSubject = types
  .model('TextSubject', {
    content: types.maybeNull(types.string),
    contentLoadingState: types.optional(types.enumeration('contentLoadingState', asyncStates.values), asyncStates.initialized),
    error: types.maybeNull(types.frozen({}))
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

const SingleTextSubject = types
  .refinement(
    'SingleTextSubject',
    types.compose('SingleTextSubject', Subject, TextSubject),
    subject => {
      const counts = createLocationCounts(subject)
      return subject.locations.length === 1 && counts.text === 1
    })

export default SingleTextSubject
