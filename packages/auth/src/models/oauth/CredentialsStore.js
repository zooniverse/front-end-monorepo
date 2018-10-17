import { applySnapshot, types } from 'mobx-state-tree'

const Credentials = types
  .model('Credentials', {
    expiresAt: types.optional(types.number, 0),
    token: types.maybeNull(types.string)
  })

  .actions(self => ({
    reset () {
      self.expiresAt = 0
      self.token = null
    },

    set (credentialsObject) {
      if (!credentialsObject.expiresAt || !credentialsObject.token) {
        throw new ReferenceError('You must pass an object with both an `expiresAt` and a `token` property')
      }
      applySnapshot(self, credentialsObject)
    }
  }))

export default Credentials
