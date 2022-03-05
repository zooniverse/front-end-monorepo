import DrawingTask from '@plugins/tasks/drawing'
import { default as TaskModel } from './models/TranscriptionTask'
import { default as AnnotationModel } from './models/TranscriptionAnnotation'

export default {
  TaskComponent: DrawingTask.TaskComponent,
  TaskModel,
  AnnotationModel
}