import { types } from 'mobx-state-tree'

import Step from '@store/WorkflowStepStore/Step'
import * as tasks from '@plugins/tasks'

const annotationModels = Object.values(tasks).map(task => task.AnnotationModel)
const TaskAnnotation = types.union(...annotationModels)

const AnnotatedStep = types.model('AnnotatedStep', {
  id: types.identifier,
  step: types.safeReference(Step),
  annotations: types.array(types.safeReference(TaskAnnotation)),
})
.views(self => ({
    /** Check if the step tasks are complete with the current annotations. */
    get isComplete() {
      return self.step.isComplete(self.annotations)
    },
    /** Get the next step key from any single choice answers, or the current step otherwise. */
    get nextStepKey() {
      return self.step.nextStepKey(self.annotations)
    }
  })
)

export default AnnotatedStep
