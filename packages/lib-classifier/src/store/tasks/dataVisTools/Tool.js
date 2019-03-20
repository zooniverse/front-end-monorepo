import { types } from 'mobx-state-tree'

const Tool = types.model('Tool', {
  index: types.identifier
})

export default Tool