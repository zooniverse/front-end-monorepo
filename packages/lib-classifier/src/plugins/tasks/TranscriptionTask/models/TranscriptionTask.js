import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import { Drawing } from '../../DrawingTask/models/DrawingTask'
import { TranscriptionLineTool } from '@plugins/drawingTools/models/tools'
import { TranscriptionLine } from '@plugins/drawingTools/models/marks'
import TranscriptionAnnotation from './TranscriptionAnnotation'

const Transcription = types.model('Transcription', {
  activeMark: types.safeReference(TranscriptionLine),
  caesarKey: types.literal('alice'),
  tools: types.array(TranscriptionLineTool),
  type: types.literal('transcription')
})
.views(self => ({
  get defaultAnnotation() {
    return TranscriptionAnnotation.create({
      id: cuid(),
      task: self.taskKey,
      taskType: self.type
    })
  },
}))

const TranscriptionTask = types.compose('TranscriptionTask', Task, Transcription)

export default TranscriptionTask
