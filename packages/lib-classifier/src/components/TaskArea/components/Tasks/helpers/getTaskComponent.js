import DrawingTask from '../components/DrawingTask'
import SingleChoiceTask from '../components/SingleChoiceTask'
import MultipleChoiceTask from '../components/MultipleChoiceTask'

const taskTypes = {
  drawing: DrawingTask,
  single: SingleChoiceTask,
  multiple: MultipleChoiceTask
}

export default function getTaskComponent (taskType) {
  return taskTypes[taskType] || null
}
