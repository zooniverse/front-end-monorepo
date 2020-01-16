import { getParentOfType, types } from 'mobx-state-tree'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'
import MultipleChoiceTask from '@plugins/tasks/MultipleChoiceTask'
import TextTask from '@plugins/tasks/TextTask'
import { Tool } from '@plugins/drawingTools/models/tools'
import AnnotationsStore from '@store/AnnotationsStore'

const BaseMark = types.model('BaseMark', {
  id: types.identifier,
  annotations: types.map(types.union(
    SingleChoiceTask.AnnotationModel,
    MultipleChoiceTask.AnnotationModel,
    TextTask.AnnotationModel
  )),
  frame: types.optional(types.number, 0),
  toolIndex: types.optional(types.number, 0)
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

    get isValid () {
      return true
    },

    get tool () {
      return getParentOfType(self, Tool)
    }
  }))

export default types.compose('Mark', AnnotationsStore, BaseMark)
