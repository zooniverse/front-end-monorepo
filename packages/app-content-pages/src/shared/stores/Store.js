import { getEnv, types } from 'mobx-state-tree'

import User from './User'

const Store = types
  .model('Store', {
    user: types.optional(User, {})
  })

  .views(self => ({
    get panoptesClient () {
      return getEnv(self).panoptesClient
    }
  }))

export default Store
