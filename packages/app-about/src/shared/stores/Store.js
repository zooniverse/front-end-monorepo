import { getEnv, types } from 'mobx-state-tree'

import Publications from './Publications'
import Team from './Team'
import User from './User'

const Store = types
  .model('Store', {
    publications: types.optional(Publications, {}),
    team: types.optional(Team, {}),
    user: types.optional(User, {})
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    },
    get contentfulClient () {
      return getEnv(self).contentfulClient
    }
  }))

export default Store
