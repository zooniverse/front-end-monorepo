import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SubjectGroupComparisonAnnotation from './SubjectGroupComparisonAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const SubjectGroup = types.model('SubjectGroup', {
  annotation: types.safeReference(SubjectGroupComparisonAnnotation),
  help: types.optional(types.string, ''),
  question: types.string,
  type: types.literal('subjectGroup')
})
  .views(self => ({
    get defaultAnnotation () {
      return SubjectGroupComparisonAnnotation.create({
        id: cuid(),
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const SubjectGroupComparisonTask = types.compose('SubjectGroupComparisonTask', Task, SubjectGroup)

export default SubjectGroupComparisonTask
