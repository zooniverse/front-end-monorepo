import { types } from 'mobx-state-tree'
import Annotation from '@plugins/tasks/models/Annotation'

const AnnotationsStore = types
  .model('AnnotationsStore', {
    annotations: types.map(Annotation)
  })
  .views(self => ({
    annotation (task) {
      let taskAnnotation
      self.annotations.forEach(annotation => {
        if (annotation.task === task.taskKey) {
          taskAnnotation = annotation
        }
      })
      return taskAnnotation
    }
  }))
  .actions(self => {
    function beforeDestroy() {
      self.reset()
    }

    function createAnnotation(task) {
      const taskAnnotation = task.createAnnotation()
      self.annotations.put(taskAnnotation)
      return taskAnnotation
    }

    function addAnnotation (task, value) {
      let annotation = self.annotation(task)
      if (!annotation) {
        annotation = createAnnotation(task)
      }
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

    function reset () {
      self.annotations.clear()
    }

    return {
      addAnnotation,
      beforeDestroy,
      removeAnnotation,
      reset
    }
  })

export default AnnotationsStore
