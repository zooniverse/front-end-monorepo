import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const presetOption = types.model('SimpleDropdownPresetOption', {
  selection: types.number,  // Index of the selection chosen by the user
  option: types.literal(true),
})

const otherOption = types.model('SimpleDropdownOtherOption', {
  selection: types.string,  // Free answer typed in by the user
  option: types.literal(false),
})

const SimpleDropdown = types.model('SimpleDropdown', {
  value: types.maybeNull(types.union(presetOption, otherOption), null),
})
  .views(self => ({
    get isComplete () {
      return (self.value?.option)
        ? self.value?.selection >= 0  // If preset option, any non-negative number is legit
        : self.value?.selection?.length > 0  // If 'other' option, check that it's a non-empty string. (This also catches instances when value is null)
    }
  }))

const SimpleDropdownAnnotation = types.compose('SimpleDropdownAnnotation', Annotation, SimpleDropdown)

export default SimpleDropdownAnnotation
