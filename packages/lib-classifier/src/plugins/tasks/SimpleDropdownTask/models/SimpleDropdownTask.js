import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SimpleDropdownAnnotation from './SimpleDropdownAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const SimpleDropdown = types.model('SimpleDropdown', {
  allowCreate: types.optional(types.boolean, false),
  annotation: types.safeReference(SimpleDropdownAnnotation),
  help: types.optional(types.string, ''),
  instruction: types.optional(types.string, ''),
  options: types.array(types.string),
  type: types.literal('dropdown-simple'),
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
