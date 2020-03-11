import { types } from 'mobx-state-tree'
import DrawingAnnotation from '../../DrawingTask/models/DrawingAnnotation'

const Transcription = types.model('Transcription', {})

const TranscriptionTask = types.compose('TranscriptionAnnotation', Transcription, DrawingAnnotation)

export default TranscriptionTask