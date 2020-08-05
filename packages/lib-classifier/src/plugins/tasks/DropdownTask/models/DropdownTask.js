import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import DropdownAnnotation from './DropdownAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const Dropdown = types.model('Dropdown', {
  annotation: types.safeReference(DropdownAnnotation),
  answers: types.array(types.frozen({
    label: types.string,
    next: types.maybe(types.string)
  })),
  help: types.optional(types.string, ''),
  type: types.literal('dropdown'),
  selects: types.array(types.frozen({
    id: types.string,
    title: types.string,
    options: types.frozen({}),    
  }))
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
