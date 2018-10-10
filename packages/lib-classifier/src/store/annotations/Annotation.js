import { types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  task: types.string
})

export default Annotation