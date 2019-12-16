import { getRoot, types } from 'mobx-state-tree'
import createClient from '@zooniverse/auth'

const Auth = types
  .model('Auth')

  .volatile(() => ({
    client: null
  }))

  .actions(self => ({
    createClient () {
      const apiHostUrl = getRoot(self).config.apiHostUrl
      const clientAppID = getRoot(self).config.clientAppID
      self.client = createClient({
        hostUrl: apiHostUrl,
        clientAppID,
      })
    }
  }))

export default Auth
