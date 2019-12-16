import { types } from 'mobx-state-tree'

const Config = types
  .model('Config', {
    apiHostUrl: types.optional(types.string, ''),
    clientAppID: types.optional(types.string, ''),
  })

export default Config
