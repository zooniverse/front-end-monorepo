import { types } from 'mobx-state-tree'

import numberString from './types/numberString'

const TranslationStrings = types.map(types.maybeNull(types.string))

const Organization = types
  .model('Organization', {
    id: types.maybeNull(numberString),
    display_name: types.optional(types.string, ''),
    listed: types.optional(types.boolean, false),
    primary_language: types.optional(types.string, 'en'),
    slug: types.optional(types.string, ''),
    strings: TranslationStrings
  })

  .views(self => ({
    get title () {
      return self.strings.get('title')
    },
  }))

export default Organization
