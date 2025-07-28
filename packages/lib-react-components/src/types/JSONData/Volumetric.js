import { types } from 'mobx-state-tree'

const Volumetric = types.model('Volumetric', {
  type: types.string,
  data: types.string
})

export default Volumetric
