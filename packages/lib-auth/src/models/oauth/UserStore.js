import { flow, getRoot, getType, types } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'
import { forOwn } from 'lodash'

import UserResource from './UserResource'

const UserStore = types
  .model('UserStore', {
    active: types.maybe(types.reference(UserResource)),
    loadingState: types.optional(types.enumeration('loadingState', asyncStates.values), asyncStates.initialized),
    resources: types.map(UserResource),
    type: types.optional(types.string, 'users')
  })

  .actions(self => {
    function * fetchResource (token) {
      console.log('Getting user')

      if (token) {
        const { type } = self
        self.loadingState = asyncStates.loading
        try {
          const response = yield panoptes.get('/me', {}, `Bearer ${token}`)
          const user = response.body[type][0]

          if (user) {
            self.setUser(user)
            self.loadingState = asyncStates.success
            return user
          }
          console.log('Got user', user.display_name, user.id)
        } catch (error) {
          console.error('Could not get user:', error)
          console.log('Resetting auth store and localStorage')
          getRoot(self).credentials.reset()
          self.loadingState = asyncStates.error
        }
      }
    }

    function reset () {
      self.active = undefined
      self.loadingState = asyncStates.initialized
      self.resources.clear()
    }

    function setUser (user) {
      const clonedUser = Object.assign({}, user)

      // We need to convert some values to fit the model
      forOwn(clonedUser, (value, key) => {
        const modelProperty = UserResource.properties[key]
        if (modelProperty && modelProperty.name === 'boolean') {
          clonedUser[key] = !!value
        }

        if (modelProperty && modelProperty.name === 'string' && !value) {
          clonedUser[key] = ''
        }
      })

      self.resources.put(clonedUser)
      self.active = clonedUser.id
    }

    return {
      fetchResource: flow(fetchResource),
      reset,
      setUser
    }
  })

export default UserStore
