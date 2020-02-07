import cuid from 'cuid'
import { getParent, types } from 'mobx-state-tree'
import SingleChoiceTask  from '@plugins/tasks/SingleChoiceTask'
import MultipleChoiceTask from '@plugins/tasks/MultipleChoiceTask'
import TextTask from '@plugins/tasks/TextTask'
import AnnotationsStore from '@store/AnnotationsStore'

const BaseMark = types.model('BaseMark', {
  id: types.identifier,
  annotations: types.map(types.union(
    SingleChoiceTask.AnnotationModel,
    MultipleChoiceTask.AnnotationModel,
    TextTask.AnnotationModel
  )),
  frame: types.optional(types.number, 0),
  toolIndex: types.optional(types.number, 0),
  toolType: types.string
})
  .preProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    // generate mark IDs, if not present
    newSnapshot.id = snapshot.id || cuid()
    // convert any subtask annotations arrays to a map
    if (snapshot.annotations && Array.isArray(snapshot.annotations)) {
      const annotations = {}
      snapshot.annotations.forEach(annotation => {
        annotation.id = annotation.id || cuid()
        annotations[annotation.id] = annotation
      })
      newSnapshot = Object.assign({}, newSnapshot, { annotations })
    }
    return newSnapshot
  })
  .postProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    // remove mark IDs
    delete newSnapshot.id
    // convert subtask annotations to an array
    newSnapshot.annotations = Object.values(snapshot.annotations)
    return newSnapshot
  })
  .views(self => ({
    getAngle (x1, y1, x2, y2) {
      const deltaX = x2 - x1
      const deltaY = y2 - y1
      return Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    },

    getDistance (x1, y1, x2, y2) {
      const aSquared = Math.pow(x2 - x1, 2)
      const bSquared = Math.pow(y2 - y1, 2)
      return Math.sqrt(aSquared + bSquared)
    },

    get isComplete () {
      // Return false after the first incomplete task, true otherwise.
      let isMarkComplete = true
      self.tasks.forEach(task => {
        if (isMarkComplete) {
          isMarkComplete = !task.required || self.annotation(task).isComplete
        }
      })
      return isMarkComplete
    },

    get isValid () {
      return true
    },

    get tool () {
      /*
        A mark's parent is the marks map.
        Its grandparent is the tool that created it.
      */
      return getParent(self, 2)
    },

    get tasks () {
      return self.tool.tasks
    }
  }))

export default types.compose('Mark', AnnotationsStore, BaseMark)
