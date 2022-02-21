import { types } from 'mobx-state-tree'
import Resource from '@store/Resource'

const Tutorial = types
  .model('Tutorial', {
    display_name: types.optional(types.string, ''),
    kind: types.maybeNull(types.enumeration(['mini-course', 'tutorial'])),
    language: types.maybe(types.string),
    steps: types.array(types.frozen({
      content: types.maybe(types.string),
      media: types.maybe(types.string)
    }))
  })

export default types.compose('TutorialResource', Resource, Tutorial)
