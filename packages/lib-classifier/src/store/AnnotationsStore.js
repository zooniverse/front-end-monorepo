import { addDisposer, getParent, onAction, types } from 'mobx-state-tree'
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
    function afterAttach() {
      createClassificationObserver()
    }

    function createClassificationObserver() {
      const classificationsDisposer = autorun(() => {
        const classifications = getParent(self)
        onAction(classifications, (call) => {
          if (call.name === 'reset') self.reset()
        })
      }, { name: 'AnnotationsStore Classifications observer autorun' })
      addDisposer(self, classificationsDisposer)
    }

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

    function reset () {
      self.annotations.clear()
    }

    return {
      addAnnotation,
      afterAttach,
      removeAnnotation,
      reset
    }
  })

export default AnnotationsStore
