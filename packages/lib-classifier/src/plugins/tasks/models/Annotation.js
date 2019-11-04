import { types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  task: types.identifier
})

export default Annotation
