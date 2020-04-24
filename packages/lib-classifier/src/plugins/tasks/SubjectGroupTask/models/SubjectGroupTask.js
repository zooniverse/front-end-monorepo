import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SubjectGroupAnnotation from './SubjectGroupAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const SubjectGroup = types.model('SubjectGroup', {
  annotation: types.safeReference(SubjectGroupAnnotation),
  help: types.optional(types.string, ''),
  question: types.string,
  type: types.literal('subjectGroup')
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
