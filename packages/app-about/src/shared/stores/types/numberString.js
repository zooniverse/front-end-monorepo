import { types } from 'mobx-state-tree'

const numberString = types.refinement(
  'numberString',
  types.string,
  value => /^\d+$/.test(value)
)

export default numberString
