import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SubjectGroupComparisonAnnotation from './SubjectGroupComparisonAnnotation'

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'

const SubjectGroupComparison = types.model('SubjectGroupComparison', {
  annotation: types.safeReference(SubjectGroupComparisonAnnotation),
  question: types.string,
  type: types.literal('subjectGroupComparison')
})
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return SubjectGroupComparisonAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const SubjectGroupComparisonTask = types.compose('SubjectGroupComparisonTask', Task, SubjectGroupComparison)

export default SubjectGroupComparisonTask
