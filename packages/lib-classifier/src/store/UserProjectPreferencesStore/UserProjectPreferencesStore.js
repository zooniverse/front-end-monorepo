import merge from 'lodash/merge'
import { autorun } from 'mobx'
import { addDisposer, getRoot, getSnapshot, isValidReference, tryReference, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'

import ResourceStore from '@store/ResourceStore'
import UserProjectPreferences from './UserProjectPreferences'
import { getBearerToken } from '@store/utils'

const UserProjectPreferencesStore = types
  .model('UserProjectPreferencesStore', {
    active: types.safeReference(UserProjectPreferences),
    resources: types.map(UserProjectPreferences),
    type: types.optional(types.string, 'project_preferences')
  })

  // TODO: move some of these req into panoptes.js helpers
  .actions(self => {
    function clear() {
      self.resources.clear()
      self.loadingState = asyncStates.success
    }

    function * fetchUPPById (id = '') {
      const { type } = self
      const uppId = id || self.active.id
      const client = getRoot(self).client.panoptes
      const { authClient } = getRoot(self)
      const authorization = yield getBearerToken(authClient)
      const headers = {
        authorization
      }
      try {
        const response = yield client.get(`/${type}/${uppId}`, null, headers)
        const resource = response.body[type][0]
        if (resource) {
          self.setHeaders(response.headers)
          self.setUPP(resource)
          return resource
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
        return null
      }
      return null
    }

    function * updateUPP (changes) {
      const upp = tryReference(() => self.active)
      if (upp) {
        const uppSnapshot = getSnapshot(upp)
        try {
          if (self.headers.etag) {
            const mergedUPP = merge({}, uppSnapshot, changes)
            self.setUPP(mergedUPP)
            yield self.putUPP(mergedUPP)
          } else {
            // We re-request for the upp to get a usable etag header
            const currentUPP = yield self.fetchUPPById(upp.id)
            const mergedUPP = merge({}, currentUPP, changes)
            self.setUPP(mergedUPP)
            yield self.putUPP(mergedUPP)
          }
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function * putUPP (upp) {
      const { type } = self
      const client = getRoot(self).client.panoptes
      const { authClient } = getRoot(self)
      const authorization = yield getBearerToken(authClient)

      if (upp && self.headers.etag) {
        const headers = {
          authorization,
          etag: self.headers.etag
        }
        const { id, preferences } = upp
        try {
          self.loadingState = asyncStates.putting
          const response = yield client.put(`/${type}/${id}`, { [type]: { preferences } }, headers)
          if (response.body[type][0]) {
            self.headers = response.headers
            const updatedUPP = response.body[type][0]
            self.setUPP(updatedUPP)
          }

          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function setHeaders(headers) {
      self.headers = headers
    }

    function setUPP (userProjectPreferences) {
      self.setResources([userProjectPreferences])
      self.setActive(userProjectPreferences.id)
      self.loadingState = asyncStates.success
    }

    return {
      clear,
      fetchUPPById: flow(fetchUPPById),
      putUPP: flow(putUPP),
      setHeaders,
      setUPP,
      updateUPP: flow(updateUPP)
    }
  })

export default types.compose('UserProjectPreferencesResourceStore', ResourceStore, UserProjectPreferencesStore)
