import { types } from 'mobx-state-tree'

import Annotation from '@plugins/tasks/models/Annotation'
import HighlighterLabel from './HighlighterLabel'

const Highlight = types.model('Highlight', {
  start: types.optional(types.number, 0),
  end: types.optional(types.number, 0),
  text: types.optional(types.string, ''),
  labelInformation: types.optional(HighlighterLabel, { color: '', label: '' })
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
  .actions(self => ({
    deleteHighlight (index) {
      self.value.splice(index, 1)
    },
  }))

const HighlighterAnnotation = types.compose('HighlighterAnnotation', Annotation, Highlighter)
export default HighlighterAnnotation
