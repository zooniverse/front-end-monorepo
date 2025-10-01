import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SubjectGroupComparisonAnnotation from './SubjectGroupComparisonAnnotation'

const SubjectGroupComparison = types.model('SubjectGroupComparison', {
  annotation: types.safeReference(SubjectGroupComparisonAnnotation),
  type: types.literal('subjectGroupComparison')
})
  .views(self => ({
    defaultAnnotation(id = cuid()) {
      return SubjectGroupComparisonAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const SubjectGroupComparisonTask = types.compose('SubjectGroupComparisonTask', Task, SubjectGroupComparison)

export default SubjectGroupComparisonTask
