import { getRoot, types } from 'mobx-state-tree'
import TextAnnotation from './TextAnnotation'

const TextTask = types.model('TextTask', {
  help: types.optional(types.string, ''),
  instruction: types.string,
  required: types.optional(types.boolean, false),
  taskKey: types.identifier,
  text_tags: types.array(types.string),
  type: types.literal('text')
})
  .views(self => ({
    get annotation () {
      const { currentAnnotations } = getRoot(self).classifications
      if (currentAnnotations && currentAnnotations.size > 0) {
        return currentAnnotations.get(self.taskKey)
      }
      return TextAnnotation.create({ task: self.taskKey })
    }
  }))
  .actions(self => ({
    updateAnnotation (value) {
      const { addAnnotation } = getRoot(self).classifications
      addAnnotation(value, self)
    }
  }))

export default TextTask
