import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../../models/Task'
import DrawingTask from '@plugins/tasks/drawing'
import SHOWN_MARKS from '@helpers/shownMarks'
import { TranscriptionLineTool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'
import TranscriptionAnnotation from './TranscriptionAnnotation'

// Similar to DrawingTask, but let's limit to only allowing
// TranscriptionLine tool, marks, and TranscriptionAnnotation models
const Transcription = types.model('Transcription', {
  activeMark: types.safeReference(TranscriptionLine),
  annotation: types.safeReference(TranscriptionAnnotation),
  caesarKey: types.optional(types.literal('alice'), 'alice'),
  tools: types.array(TranscriptionLineTool),
  type: types.literal('transcription')
})
.actions(self => {
  function togglePreviousMarks (option) {
    self.shownMarks = option
    self.hidingIndex = self.shownMarks === SHOWN_MARKS.NONE ? self.marks.length : 0
  }

  return {
    togglePreviousMarks
  }
})
.views(self => ({
  defaultAnnotation(id = cuid()) {
    return TranscriptionAnnotation.create({
      id,
      task: self.taskKey,
      taskType: self.type
    })
  },
}))

// We still want other functionality from DrawingTask, so let's compose them
const TranscriptionTask = types.compose('TranscriptionTask', DrawingTask.TaskModel, Transcription)

export default TranscriptionTask
