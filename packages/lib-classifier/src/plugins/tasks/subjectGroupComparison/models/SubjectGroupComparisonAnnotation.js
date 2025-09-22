import { getRoot, getSnapshot, resolveIdentifier, types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'
import CellWithAnnotations from './CellAnnotationsStore'
import SubjectGroupComparisonTask from './SubjectGroupComparisonTask'

const SubjectGroupComparison = types.model('SubjectGroupComparison', {
  taskType: types.literal('subjectGroupComparison'),
  value: types.array(types.safeReference(CellWithAnnotations)),
})
  .views(self => ({
    get isComplete() {
      return self.value.length > 0
    },

    toSnapshot() {
      const snapshot = getSnapshot(self)
      const actualTask = resolveIdentifier(SubjectGroupComparisonTask, getRoot(self), self.task)
      const value = Array.from(actualTask.selectedCells.values()).map(cell => getSnapshot(cell))
      const comparisonSnapshot = { ...snapshot, value }

      const allAnnotations = [comparisonSnapshot]

      comparisonSnapshot.value.forEach((cellSnapshot, cellIndex) => {
        const { annotations, ...cellWithoutAnnotations } = cellSnapshot

        // Add details array showing which subtasks exist
        cellWithoutAnnotations.details = annotations.map(annotation => ({ task: annotation.task }))

        // Add each cell annotation to the flattened array
        annotations.forEach(cellAnnotation => {
          const { id, ...annotationWithoutId } = cellAnnotation
          allAnnotations.push({ ...annotationWithoutId, cellIndex })
        })

        comparisonSnapshot.value[cellIndex] = cellWithoutAnnotations
      })

      return allAnnotations
    }
  }))

const SubjectGroupComparisonAnnotation = types.compose('SubjectGroupComparisonAnnotation', Annotation, SubjectGroupComparison)

export default SubjectGroupComparisonAnnotation
