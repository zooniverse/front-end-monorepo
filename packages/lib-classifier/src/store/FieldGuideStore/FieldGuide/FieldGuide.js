import { types } from 'mobx-state-tree'
import Resource from '@store/Resource'

const FieldGuide = types
  .model('FieldGuide', {
    items: types.array(types.maybe(types.frozen({
      content: types.optional(types.string, ''),
      icon: types.optional(types.string, ''),
      title: types.optional(types.string, '')
    }))),
    language: types.optional(types.string, 'en')
  })

export default types.compose('FieldGuideResource', Resource, FieldGuide)
