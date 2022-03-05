import { getRoot, getSnapshot, resolveIdentifier, types } from 'mobx-state-tree'
import DrawingTask from './DrawingTask'
import Annotation from '../../models/Annotation'
import * as markTypes from '@plugins/drawingTools/models/marks'

const allDrawingMarks = Object.values(markTypes)
const GenericMark = types.union(...allDrawingMarks)

const Drawing = types.model('Drawing', {
  taskType: types.literal('drawing'),
  value: types.array(types.safeReference(GenericMark))
})
  .views(self => ({
    toSnapshot () {
      const snapshot = getSnapshot(self)
      // resolve mark references (IDs) in the snapshot to mark snapshots
      const actualTask = resolveIdentifier(DrawingTask, getRoot(self), self.task)
      const value = actualTask.marks.map(mark => getSnapshot(mark))
      const drawingSnapshot = Object.assign({}, snapshot, { value })
      // flatten subtask annotations into a single annotations array
      // then return the flattened array
      const drawingAnnotations = [drawingSnapshot]
      drawingSnapshot.value.forEach((markSnapshot, markIndex) => {
        const mark = Object.assign({}, markSnapshot)
        // map subtask keys to mark.details
        mark.details = mark.annotations.map(annotation => ({ task: annotation.task }))
        // push mark.annotations to the returned array
        mark.annotations.forEach(markAnnotation => {
          const finalAnnotation = Object.assign({}, markAnnotation, { markIndex })
          // strip annotation IDs
          const { id, ...rest } = finalAnnotation
          drawingAnnotations.push(rest)
        })
        // remove annotations from individual marks
        const { annotations, ...rest } = mark
        drawingSnapshot.value[markIndex] = rest
      })
      return drawingAnnotations
    }
  }))

const DrawingAnnotation = types.compose('DrawingAnnotation', Annotation, Drawing)

export default DrawingAnnotation
