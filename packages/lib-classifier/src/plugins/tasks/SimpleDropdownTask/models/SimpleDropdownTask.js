import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import { panoptesAdapter } from './helpers'
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
  help: types.optional(types.string, ''),
  instruction: types.optional(types.string, ''),
  options: MenuOptions,
  type: types.literal('dropdown-simple'),
})
  .preProcessSnapshot(snapshot => {
    return panoptesAdapter(snapshot)
  })
  .views(self => ({
    get defaultAnnotation () {
      return SimpleDropdownAnnotation.create({
        id: cuid(),
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const SimpleDropdownTask = types.compose('SimpleDropdownTask', Task, SimpleDropdown)

export default SimpleDropdownTask
export { MIN_OPTIONS, MAX_OPTIONS }

