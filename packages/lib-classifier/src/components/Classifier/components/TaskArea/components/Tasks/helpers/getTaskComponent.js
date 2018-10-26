import SingleChoiceTask from '../components/SingleChoiceTask'
import MultipleChoiceTask from '../components/MultipleChoiceTask'

const taskTypes = {
  single: SingleChoiceTask,
  multiple: MultipleChoiceTask
}

export default function getTaskComponent (taskType) {
  return taskTypes[taskType] || null
}
