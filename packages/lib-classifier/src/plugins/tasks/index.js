import Registry from './Registry'
import DataVisAnnotationTask from './DataVisAnnotationTask'
import DrawingTask from './DrawingTask'
import MultipleChoiceTask from './MultipleChoiceTask'
import SingleChoiceTask from './SingleChoiceTask'
import TextTask from './TextTask'

const taskRegistry = new Registry()
try {
  taskRegistry.add('dataVisAnnotation', DataVisAnnotationTask)
  taskRegistry.add('drawing', DrawingTask)
  taskRegistry.add('multiple', MultipleChoiceTask)
  taskRegistry.add('single', SingleChoiceTask)
  taskRegistry.add('text', TextTask)
} catch (e) {
  console.log(e.message)
}

const taskModels = taskRegistry.values('TaskModel')
const annotationModels = taskRegistry.values('AnnotationModel')
export default taskRegistry
export {
  annotationModels,
  taskModels
}
