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
  .actions(self => ({
    updateAnnotation (value) {
      const { addAnnotation } = getRoot(self).classifications
      addAnnotation(value, self)
    }
  }))

export default TextTask
