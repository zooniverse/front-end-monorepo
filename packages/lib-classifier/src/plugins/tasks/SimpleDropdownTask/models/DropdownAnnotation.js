import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const Dropdown = types.model('Dropdown', {
  value: types.array(types.frozen({
    value: types.optional(types.string, ''),  // Value selected by the user
    option: types.optional(types.boolean, false),  // i.e. is this value in the list of preset options, or is it a custom "other" value from the user?
  })),
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0
    }
  }))

const DropdownAnnotation = types.compose('DropdownAnnotation', Annotation, Dropdown)

export default DropdownAnnotation
