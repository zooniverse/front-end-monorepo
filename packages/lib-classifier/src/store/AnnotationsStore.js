import { types, getType } from 'mobx-state-tree'
import { annotationModels } from '@plugins/tasks'

const AnnotationsStore = types
  .model('AnnotationsStore', {
    annotations: types.map(types.union(...annotationModels))
  })
  .actions(self => {
    function addAnnotation (task, annotationValue) {
      const annotation = self.annotations.get(task.taskKey) || task.createAnnotation()
      // new annotations must be added to this store before we can modify them
      self.annotations.put(annotation)
      if (annotationValue) {
        annotation.value = annotationValue
      }
    }

    return {
      addAnnotation
    }
  })

export default AnnotationsStore