import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SimpleDropdown = types.model('SimpleDropdown', {
  value: types.optional(types.frozen({
    value: types.string,  // Value selected by the user
    option: types.boolean,  // i.e. is this value in the list of preset options, or is it a custom "other" value from the user?
  }), null),
})
  .views(self => ({
    get isComplete () {
      return !!(self.value && self.value.value && self.value.value.length > 0)
    }
  }))

const SimpleDropdownAnnotation = types.compose('SimpleDropdownAnnotation', Annotation, SimpleDropdown)

export default SimpleDropdownAnnotation
