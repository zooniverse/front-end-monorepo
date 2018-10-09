import { getEnv, types } from 'mobx-state-tree'
import Project from './Project'

const Store = types
  .model('Store', {
    foo: types.optional(types.string, 'bar')
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default Store
