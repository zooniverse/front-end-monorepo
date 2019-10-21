import { getRoot, types } from 'mobx-state-tree'
import TextAnnotation from './TextAnnotation'
import { Task } from '../../../../store/tasks'

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
    },
    get annotation () {
      const { currentAnnotations } = getRoot(self).classifications
      let currentAnnotation
      if (currentAnnotations && currentAnnotations.size > 0) {
        currentAnnotation = currentAnnotations.get(self.taskKey)
      }
      return currentAnnotation || self.defaultAnnotation
    }
  }))

const TextTask = types.compose('TextTask', Task, Text)

export default TextTask
