import { types } from 'mobx-state-tree'

const numberString = types.refinement(
  types.string,
  value => /^\d+$/.test(value)
)

export default numberString
