import SingleChoiceTask from '../components/SingleChoiceTask'

const taskTypes = {
  single: SingleChoiceTask
}

export default function getTaskComponent(taskType) {
  return taskTypes[taskType] || null
}
