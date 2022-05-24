import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import { legacyDropdownAdapter } from './helpers'
import Task from '../../models/Task'
import SimpleDropdownAnnotation from './SimpleDropdownAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const MIN_OPTIONS = 4
const MAX_OPTIONS = 20

const MenuOptions = types.refinement('MenuOptions',
  types.array(types.string),
  value => value.length >= MIN_OPTIONS && value.length <= MAX_OPTIONS
)

const SimpleDropdown = types.model('SimpleDropdown', {
  allowCreate: types.optional(types.boolean, false),
  annotation: types.safeReference(SimpleDropdownAnnotation),
  options: MenuOptions,
  type: types.literal('dropdown-simple'),
})
  .preProcessSnapshot(snapshot => {
    return legacyDropdownAdapter(snapshot)
  })
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return SimpleDropdownAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const SimpleDropdownTask = types.compose('SimpleDropdownTask', Task, SimpleDropdown)

export default SimpleDropdownTask
export { MIN_OPTIONS, MAX_OPTIONS }

