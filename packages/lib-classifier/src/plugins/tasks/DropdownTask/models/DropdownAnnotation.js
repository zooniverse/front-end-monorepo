import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const Dropdown = types.model('Dropdown', {
  value: types.maybeNull(types.number)
})
  .views(self => ({
    get isComplete () {
      return self.value !== null
    }
  }))

const DropdownAnnotation = types.compose('DropdownAnnotation', Annotation, Dropdown)

export default DropdownAnnotation
