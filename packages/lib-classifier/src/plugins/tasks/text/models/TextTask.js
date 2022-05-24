import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import TextAnnotation from './TextAnnotation'

const Text = types.model('Text', {
  annotation: types.safeReference(TextAnnotation),
  required: types.maybe(types.union(types.string, types.boolean)),
  text_tags: types.array(types.string),
  type: types.literal('text')
})
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return TextAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const TextTask = types.compose('TextTask', Task, Text)

export default TextTask
