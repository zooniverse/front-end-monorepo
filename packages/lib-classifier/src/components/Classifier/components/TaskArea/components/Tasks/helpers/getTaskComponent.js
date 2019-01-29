import DrawingTask from '../components/DrawingTask'
import Graph2dRangeXTask from '../components/Graph2dRangeXTask'
import SingleChoiceTask from '../components/SingleChoiceTask'
import MultipleChoiceTask from '../components/MultipleChoiceTask'

const taskTypes = {
  drawing: DrawingTask,
  graph2dRangeX: Graph2dRangeXTask,
  single: SingleChoiceTask,
  multiple: MultipleChoiceTask
}

export default function getTaskComponent (taskType) {
  return taskTypes[taskType] || null
}
