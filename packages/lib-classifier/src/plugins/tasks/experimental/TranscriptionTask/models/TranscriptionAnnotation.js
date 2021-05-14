import { getRoot, getSnapshot, resolveIdentifier, types } from 'mobx-state-tree'
import TranscriptionTask from './TranscriptionTask'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'
import Annotation from '../../../models/Annotation'

const Transcription = types.model('Transcription', {
  taskType: types.literal('transcription'),
  value: types.array(types.safeReference(TranscriptionLine))
})
  .views(self => ({
    // This is a copy of DrawingAnnotation's toSnapshot with the exception of
    // Changing the task type to TranscriptionTask
    toSnapshot() {
      const snapshot = getSnapshot(self)
      // resolve mark references (IDs) in the snapshot to mark snapshots
      const actualTask = resolveIdentifier(TranscriptionTask, getRoot(self), self.task)
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

const TranscriptionAnnotation = types.compose('TranscriptionAnnotation', Annotation, Transcription)

export default TranscriptionAnnotation