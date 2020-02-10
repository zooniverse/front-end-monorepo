import { types, getType } from 'mobx-state-tree'
import Annotation from '@plugins/tasks/models/Annotation'

const AnnotationsStore = types
  .model('AnnotationsStore', {
    annotations: types.map(Annotation)
  })
  .views(self => ({
    annotation (task) {
      let taskAnnotation = task.createAnnotation()
      self.annotations.forEach(annotation => {
        if (annotation.task === task.taskKey) {
          taskAnnotation = annotation
        }
      })
      return taskAnnotation
    }
  }))
  .actions(self => {
    function addAnnotation (task, value) {
      const annotation = self.annotation(task)
      // new annotations must be added to this store before we can modify them
      self.annotations.put(annotation)
      if (value !== undefined) {
        annotation.update(value)
      }
      return annotation
    }

    function removeAnnotation (taskKey) {
      let taskAnnotation
      self.annotations.forEach(annotation => {
        if (annotation.task === taskKey) {
          taskAnnotation = annotation
        }
      })
      taskAnnotation && self.annotations.delete(taskAnnotation.id)
    }

    return {
      addAnnotation,
      removeAnnotation
    }
  })

export default AnnotationsStore
