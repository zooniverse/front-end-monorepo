import { types } from 'mobx-state-tree'
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
  toolIndex: types.optional(types.number, 0)
})
  .views(self => ({
    get isValid () {
      return true
    }
  }))

export default types.compose('Mark', AnnotationsStore, BaseMark)
