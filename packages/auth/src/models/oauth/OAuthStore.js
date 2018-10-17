import { types } from 'mobx-state-tree'

import CredentialsStore from './CredentialsStore'
import UIStore from './UIStore'

const OAuthStore = types
  .model('OAuthStore', {
    credentials: types.optional(CredentialsStore, CredentialsStore.create()),
    ui: types.optional(UIStore, UIStore.create())
  })

  .views(self => ({
    get tokenObject () {
      const { expiresAt, token } = self.credentials
      return (expiresAt && token)
        ? { expiresAt, token }
        : null
    }
  }))

export default OAuthStore
