import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import DropdownAnnotation from './DropdownAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const DropdownOptions = types.model('DropdownOptions', {
  label: types.string,
  value: types.string,
})

const Dropdown = types.model('Dropdown', {
  allowCreate: types.boolean,
  annotation: types.safeReference(DropdownAnnotation),
  help: types.optional(types.string, ''),
  instruction: types.optional(types.string, ''),
  options: types.array(types.string),
  type: types.literal('dropdown-simple'),
})
  .views(self => ({
    get defaultAnnotation () {
      return DropdownAnnotation.create({
        id: cuid(),
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const DropdownTask = types.compose('DropdownTask', Task, Dropdown)

export default DropdownTask
