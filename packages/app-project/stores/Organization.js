import { types } from 'mobx-state-tree'

import numberString from './types/numberString'

const Organization = types
  .model('Organization', {
    id: types.maybeNull(numberString),
    primary_language: types.optional(types.string, 'en'),
    slug: types.optional(types.string, ''),
    strings: types.frozen({}),
  })

  .views(self => ({
    get title () {
      return self.strings?.title
    },
  }))

export default Organization
