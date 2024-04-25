import { types } from 'mobx-state-tree'

const HighlighterLabel = types.model('HighlighterLabel', {
  color: types.string,
  label: types.string
})

export default HighlighterLabel
