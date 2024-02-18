import { autorun } from 'mobx'
import { addDisposer, getRoot, getSnapshot, resolveIdentifier, types } from 'mobx-state-tree'
import TranscriptionTask from './TranscriptionTask'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'
import Annotation from '../../../models/Annotation'

const Transcription = types.model('Transcription', {
  taskType: types.literal('transcription'),
  value: types.array(types.safeReference(TranscriptionLine))
})
  .views(self => ({
    /**
    Resolve `annotation.task`, which is a task key, to its corresponding task object.
    */
    get actualTask() {
      return resolveIdentifier(TranscriptionTask, getRoot(self), self.task)
    },

    // This is a copy of DrawingAnnotation's toSnapshot with the exception of
    // Changing the task type to TranscriptionTask
    toSnapshot() {
      const snapshot = getSnapshot(self)
      // Replace mark references (IDs) with mark snapshots.
      const markSnapshots = self.value.map(mark => getSnapshot(mark))
      const drawingSnapshot = { ...snapshot, value: markSnapshots }
      // Flatten subtask annotations into a single annotations array
      // then return the flattened array.
      const drawingAnnotations = [drawingSnapshot]
      markSnapshots.forEach((markSnapshot, markIndex) => {
        const mark = { ...markSnapshot }
        // Map subtask keys to mark.details.
        mark.details = mark.annotations.map(annotation => ({ task: annotation.task }))
        // Push mark.annotations to the returned array.
        mark.annotations.forEach(markAnnotation => {
          // Strip annotation IDs and add markIndex.
          const { id, ...rest } = markAnnotation
          const finalAnnotation = { ...rest, markIndex }
          drawingAnnotations.push(finalAnnotation)
        })
        // Remove annotations from individual marks.
        const { annotations, ...rest } = mark
        drawingSnapshot.value[markIndex] = rest
      })
      return drawingAnnotations
    }
  }))
  .actions(self => ({
    afterAttach() {
      function _onMarksChange() {
        const newAnnotation = self.actualTask.marks.map(mark => mark.id)
        self.update(newAnnotation)
      }

      addDisposer(self, autorun(_onMarksChange))
    }
  }))

const TranscriptionAnnotation = types.compose('TranscriptionAnnotation', Annotation, Transcription)

export default TranscriptionAnnotation