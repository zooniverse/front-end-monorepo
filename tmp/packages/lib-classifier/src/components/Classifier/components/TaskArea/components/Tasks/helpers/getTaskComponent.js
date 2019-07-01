import DrawingTask from '../components/DrawingTask'
import DataVisAnnotationTask from '../components/DataVisAnnotationTask'
import SingleChoiceTask from '../components/SingleChoiceTask'
import MultipleChoiceTask from '../components/MultipleChoiceTask'

const taskTypes = {
  drawing: DrawingTask,
  dataVisAnnotation: DataVisAnnotationTask,
  single: SingleChoiceTask,
  multiple: MultipleChoiceTask
}

export default function getTaskComponent (taskType) {
  return taskTypes[taskType] || null
}
