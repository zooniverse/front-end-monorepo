import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SubjectGroupAnnotation from './SubjectGroupAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const SubjectGroup = types.model('SubjectGroup', {
  annotation: types.safeReference(SubjectGroupAnnotation),
  answers: types.array(types.frozen({
    label: types.string,
    next: types.maybe(types.string)
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  type: types.literal('single')
})
  .views(self => ({
    get defaultAnnotation () {
      return SubjectGroupAnnotation.create({
        id: cuid(),
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const SubjectGroupTask = types.compose('SubjectGroupTask', Task, SubjectGroup)

export default SubjectGroupTask
