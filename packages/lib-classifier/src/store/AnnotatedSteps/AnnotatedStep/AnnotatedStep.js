import { types } from 'mobx-state-tree'

import Step from '@store/WorkflowStepStore/Step'
import { annotationModels } from '@plugins/tasks'

const TaskAnnotation = types.union(...annotationModels)

const AnnotatedStep = types.model('AnnotatedStep', {
  id: types.identifier,
  step: types.safeReference(Step),
  annotations: types.array(types.safeReference(TaskAnnotation)),
})

export default AnnotatedStep
