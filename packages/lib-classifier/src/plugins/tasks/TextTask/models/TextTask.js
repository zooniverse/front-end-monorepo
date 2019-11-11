import { getRoot, types } from 'mobx-state-tree'
import Task from '../../models/Task'
import TextAnnotation from './TextAnnotation'

const Text = types.model('Text', {
  help: types.optional(types.string, ''),
  instruction: types.string,
  required: types.optional(types.boolean, false),
  text_tags: types.array(types.string),
  type: types.literal('text')
})
  .views(self => ({
    get defaultAnnotation () {
      return TextAnnotation.create({ task: self.taskKey })
    }
  }))

const TextTask = types.compose('TextTask', Task, Text)

export default TextTask
