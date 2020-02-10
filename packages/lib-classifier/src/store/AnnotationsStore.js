import { addDisposer, getParent, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
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
      createParentObserver()
    }

    function createParentObserver() {
      const parentNodeDisposer = autorun(() => {
        // grandparent can either be a Tool or the ClassificationStore
        // immediate parent is the map
        const parentNode = getParent(self, 2)
        onAction(parentNode, (call) => {
          if (call.name === 'reset') self.reset()
        })
      }, { name: 'AnnotationsStore parent node observer autorun' })
      addDisposer(self, parentNodeDisposer)
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
