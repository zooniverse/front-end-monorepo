import { types } from 'mobx-state-tree'

import Annotation from '@plugins/tasks/models/Annotation'

const Highlight = types.model('Highlight', {
  start: types.optional(types.number, 0),
  end: types.optional(types.number, 0),
  text: types.optional(types.string, ''),
  // labelInformation: types.safeReference(HighlighterLabel)
})

const Highlighter = types.model('Highlighter', {
  taskType: types.literal('highlighter'),
  value: types.optional(types.array(Highlight), [])
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0
    }
  }))

const HighlighterAnnotation = types.compose('HighlighterAnnotation', Annotation, Highlighter)
export default HighlighterAnnotation
