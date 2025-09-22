import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SubjectGroupComparisonAnnotation from './SubjectGroupComparisonAnnotation'
import CellWithAnnotations from './CellAnnotationsStore'

const SubjectGroupComparison = types.model('SubjectGroupComparison', {
  annotation: types.safeReference(SubjectGroupComparisonAnnotation),
  selectedCells: types.map(CellWithAnnotations),
  type: types.literal('subjectGroupComparison')
})
  .views(self => ({
    defaultAnnotation(id = cuid()) {
      return SubjectGroupComparisonAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    },

    getCellByIndex(index) {
      return Array.from(self.selectedCells.values()).find(cell => cell.index === index)
    }
  }))
  .actions(self => ({
    addCell(index, subjectId) {
      const cellId = cuid()
      const cell = CellWithAnnotations.create({
        id: cellId,
        index,
        subject: subjectId,
        annotations: {}
      })
      self.selectedCells.put(cell)
      return cell
    },

    removeCell(index) {
      const cell = self.getCellByIndex(index)
      if (cell) {
        self.selectedCells.delete(cell.id)
      }
    },

    updateAnnotationValue() {
      // Update the annotation value to reference the selected cells
      if (self.annotation) {
        const cellReferences = Array.from(self.selectedCells.values())
        self.annotation.update(cellReferences)
      }
    }
  }))

const SubjectGroupComparisonTask = types.compose('SubjectGroupComparisonTask', Task, SubjectGroupComparison)

export default SubjectGroupComparisonTask
