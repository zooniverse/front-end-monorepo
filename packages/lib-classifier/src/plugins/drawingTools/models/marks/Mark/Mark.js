import cuid from 'cuid'
import { getParent, types } from 'mobx-state-tree'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'
import MultipleChoiceTask from '@plugins/tasks/MultipleChoiceTask'
import TextTask from '@plugins/tasks/TextTask'
import AnnotationsStore from '@store/AnnotationsStore'

const BaseMark = types
  .model('BaseMark', {
    id: types.identifier,
    annotations: types.map(
      types.union(
        SingleChoiceTask.AnnotationModel,
        MultipleChoiceTask.AnnotationModel,
        TextTask.AnnotationModel
      )
    ),
    frame: types.optional(types.number, 0),
    subTaskPreviousAnnotationValues: types.map(
      TextTask.PreviousAnnotationValuesModel
    ),
    toolIndex: types.optional(types.number, 0),
    toolType: types.string
  })
  .preProcessSnapshot((snapshot) => {
    const newSnapshot = Object.assign({}, snapshot)
    // generate mark IDs, if not present
    newSnapshot.id = snapshot.id || cuid()
    // convert any subtask annotations arrays to a map
    if (snapshot.annotations && Array.isArray(snapshot.annotations)) {
      const annotations = {}
      snapshot.annotations.forEach((annotation) => {
        annotation.id = annotation.id || cuid()
        annotations[annotation.id] = annotation
      })
      newSnapshot = Object.assign({}, newSnapshot, { annotations })
    }
    return newSnapshot
  })
  .postProcessSnapshot((snapshot) => {
    const newSnapshot = Object.assign({}, snapshot)
    // remove mark IDs
    delete newSnapshot.id
    delete newSnapshot.subTaskPreviousAnnotationValues
    // convert subtask annotations to an array
    newSnapshot.annotations = Object.values(snapshot.annotations)
    return newSnapshot
  })
  .volatile((self) => ({
    finished: false,
    // we may be able to move this to be local component state
    subTaskMarkBounds: undefined,
    subTaskVisibility: false
  }))
  .views((self) => ({
    getAngle(x1, y1, x2, y2) {
      const deltaX = x2 - x1
      const deltaY = y2 - y1
      return Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    },

    getDistance(x1, y1, x2, y2) {
      const aSquared = Math.pow(x2 - x1, 2)
      const bSquared = Math.pow(y2 - y1, 2)
      return Math.sqrt(aSquared + bSquared)
    },

    get isComplete() {
      const incomplete = self.tasks.some((task) => {
        const taskAnnotation = self.annotation(task)
        return task.required && !taskAnnotation?.isComplete
      })
      return !incomplete
    },

    get isValid() {
      return true
    },

    get tool() {
      /*
        A mark's parent is the marks map.
        Its grandparent is the tool that created it.
      */
      return getParent(self, 2)
    },

    get tasks() {
      return self.tool.tasks
    },

    get videoTime() {
      /*
        For certain drawing tools (e.g. Temporal Point), we need to know WHEN the mark was created.
        For other drawing tools, .videoTime will always return undefined.
       */
      return undefined
    }
  }))
  .actions((self) => ({
    finish() {
      console.log('Finished!')
      self.finished = true
    },

    continueDrawing() {
      self.finished = false
    },

    setPreviousAnnotations(previousAnnotationValues) {
      if (previousAnnotationValues?.length > 0) {
        previousAnnotationValues.forEach((previousAnnotationValue) => {
          self.subTaskPreviousAnnotationValues.put(previousAnnotationValue)
        })
      } else {
        self.subTaskPreviousAnnotationValues.clear()
      }
    },

    setSubTaskVisibility(visibility, markBounds) {
      if (self.tasks.length > 0) {
        self.subTaskVisibility = visibility
        self.subTaskMarkBounds = markBounds
      }
    },

    setVideoTime(displayTime) {}
  }))

export default types.compose('Mark', AnnotationsStore, BaseMark)
