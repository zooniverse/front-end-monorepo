import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SimpleDropdown = types.model('SimpleDropdown', {
  value: types.maybeNull(types.model({
    selection: types.union(types.number, types.string),  // Index of the selection chosen by the user
    option: types.boolean,  // i.e. is this value in the list of preset options?
  }), null),
})
  .views(self => ({
    get isComplete () {
      return self.value?.selection >= 0
    }
  }))

const SimpleDropdownAnnotation = types.compose('SimpleDropdownAnnotation', Annotation, SimpleDropdown)

export default SimpleDropdownAnnotation
