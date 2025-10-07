import { getSnapshot } from 'mobx-state-tree'
import CellWithAnnotations from './CellAnnotationsStore'
import SingleChoiceTask from '@plugins/tasks/single'

describe('Model > CellAnnotationsStore', function () {
  it('should create a cell with index and subject', function () {
    const cell = CellWithAnnotations.create({
      index: 5,
      subject: 'subject-123'
    })
    expect(cell.index).to.equal(5)
    expect(cell.subject).to.equal('subject-123')
    expect(cell.id).to.exist
  })

  it('should manage annotations via AnnotationsStore methods', function () {
    const cell = CellWithAnnotations.create({
      index: 0,
      subject: 'subject-123'
    })

    const mockTask = {
      taskKey: 'T0.cell.0.subtask.0',
      type: 'single',
      createAnnotation: function () {
        return SingleChoiceTask.AnnotationModel.create({
          task: 'T0.cell.0.subtask.0',
          taskType: 'single',
          value: 1
        })
      }
    }

    const annotation = cell.addAnnotation(mockTask, 1)
    expect(cell.annotation(mockTask)).to.equal(annotation)

    cell.removeAnnotation(annotation)
    expect(cell.annotations.size).to.equal(0)
  })

  it('should exclude id and empty annotations from snapshots', function () {
    const cell = CellWithAnnotations.create({
      id: 'custom-id',
      index: 5,
      subject: 'subject-456'
    })
    const snapshot = getSnapshot(cell)
    expect(snapshot).to.deep.equal({ index: 5, subject: 'subject-456' })
  })

  it('should include annotations array in snapshot when populated', function () {
    const cell = CellWithAnnotations.create({
      index: 0,
      subject: 'subject-123'
    })

    const mockTask = {
      taskKey: 'T0.cell.0.subtask.0',
      type: 'single',
      createAnnotation: function () {
        return SingleChoiceTask.AnnotationModel.create({
          task: 'T0.cell.0.subtask.0',
          taskType: 'single',
          value: 1
        })
      }
    }

    cell.addAnnotation(mockTask, 1)
    const snapshot = getSnapshot(cell)

    expect(snapshot.annotations).to.deep.equal([{
      task: 'T0.cell.0.subtask.0',
      taskType: 'single',
      value: 1
    }])
  })

  it('should restore from array snapshot', function () {
    const cell = CellWithAnnotations.create({
      index: 0,
      subject: 'subject-123',
      annotations: [{ task: 'T0.cell.0.subtask.0', taskType: 'single', value: 1 }]
    })
    expect(cell.annotations.size).to.equal(1)
    expect(Array.from(cell.annotations.values())[0].value).to.equal(1)
  })
})
