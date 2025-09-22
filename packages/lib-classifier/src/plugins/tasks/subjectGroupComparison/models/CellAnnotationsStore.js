import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import SingleChoiceTask from '@plugins/tasks/single'
import MultipleChoiceTask from '@plugins/tasks/multiple'
import TextTask from '@plugins/tasks/text'
import SimpleDropdownTask from '@plugins/tasks/dropdown-simple'
import AnnotationsStore from '@store/AnnotationsStore'

const CellAnnotationsStore = types
  .model('CellAnnotationsStore', {
    id: types.identifier,
    index: types.number,
    subject: types.string,
    annotations: types.map(
      types.union(
        SingleChoiceTask.AnnotationModel,
        MultipleChoiceTask.AnnotationModel,
        TextTask.AnnotationModel,
        SimpleDropdownTask.AnnotationModel
      )
    )
  })
  .preProcessSnapshot((snapshot) => {
    const newSnapshot = { ...snapshot }
    newSnapshot.id = snapshot.id || cuid()
    if (snapshot.annotations && Array.isArray(snapshot.annotations)) {
      const annotations = {}
      snapshot.annotations.forEach((annotation) => {
        annotation.id = annotation.id || cuid()
        annotations[annotation.id] = annotation
      })
      newSnapshot.annotations = annotations
    }
    return newSnapshot
  })
  .postProcessSnapshot((snapshot) => {
    const { id, ...newSnapshot } = snapshot
    newSnapshot.annotations = Object.values(snapshot.annotations)
    return newSnapshot
  })

const CellWithAnnotations = types.compose('CellWithAnnotations', AnnotationsStore, CellAnnotationsStore)

export default CellWithAnnotations