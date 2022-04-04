import cuid from 'cuid'
import { types } from 'mobx-state-tree'

import Task from '../../../models/Task'
import TextFromSubjectAnnotation from './TextFromSubjectAnnotation'

const TextFromSubject = types.model('TextFromSubject', {
  annotation: types.safeReference(TextFromSubjectAnnotation),
  help: types.optional(types.string, ''),
  instruction: types.string,
  type: types.literal('textFromSubject')
})
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return TextFromSubjectAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const TextFromSubjectTask = types.compose('TextFromSubjectTask', Task, TextFromSubject)

export default TextFromSubjectTask
