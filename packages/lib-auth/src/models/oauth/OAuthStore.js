import { types } from 'mobx-state-tree'

import CredentialsStore from './CredentialsStore'
import UIStore from './UIStore'
import UserStore from './UserStore'

const OAuthStore = types
  .model('OAuthStore', {
    credentials: types.optional(CredentialsStore, {}),
    ui: types.optional(UIStore, {}),
    user: types.optional(UserStore, {})
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
