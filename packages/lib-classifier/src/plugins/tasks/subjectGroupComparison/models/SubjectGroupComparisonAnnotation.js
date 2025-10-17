import cuid from 'cuid'
import { getSnapshot, types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'
import CellWithAnnotations from './CellAnnotationsStore'

const SubjectGroupComparison = types.model('SubjectGroupComparison', {
  taskType: types.literal('subjectGroupComparison'),
  value: types.array(CellWithAnnotations)
})
  .views(self => ({
    get isComplete() {
      return self.value.length > 0
    },

    getCellByIndex(index) {
      return self.value.find(cell => cell.index === index)
    },

    toSnapshot() {
      const snapshot = getSnapshot(self)
      const value = self.value.map(cell => getSnapshot(cell))
      const comparisonSnapshot = { ...snapshot, value }

      const allAnnotations = [comparisonSnapshot]

      comparisonSnapshot.value.forEach((cellSnapshot, cellIndex) => {
        const { annotations, ...cellWithoutAnnotations } = cellSnapshot

        // Flatten nested cell annotations into top-level array
        if (annotations && annotations.length > 0) {
          cellWithoutAnnotations.details = annotations.map(annotation => ({ task: annotation.task }))
          annotations.forEach(cellAnnotation => {
            const { id, ...annotationWithoutId } = cellAnnotation
            allAnnotations.push({ ...annotationWithoutId, cellIndex })
          })
        }

        comparisonSnapshot.value[cellIndex] = cellWithoutAnnotations
      })

      return allAnnotations
    }
  }))
  .actions(self => ({
    addCell(index, subjectId) {
      const cell = CellWithAnnotations.create({
        id: cuid(),
        index,
        subject: subjectId,
        annotations: {}
      })
      self.value.push(cell)
      self._inProgress = true
      return cell
    },

    removeCell(index) {
      const cellIndex = self.value.findIndex(cell => cell.index === index)
      if (cellIndex > -1) {
        self.value.splice(cellIndex, 1)
        self._inProgress = true
      }
    }
  }))

const SubjectGroupComparisonAnnotation = types.compose('SubjectGroupComparisonAnnotation', Annotation, SubjectGroupComparison)

export default SubjectGroupComparisonAnnotation
