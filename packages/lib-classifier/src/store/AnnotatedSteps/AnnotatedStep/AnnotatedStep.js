import { types } from 'mobx-state-tree'

import Step from '@store/WorkflowStepStore/Step'
import { annotationModels } from '@plugins/tasks'

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
    nextStepKey() {
      // assume only one branching question per step.
      const [ singleChoiceAnnotation ] = self.annotations.filter(annotation => annotation.taskType === 'single')
      if (singleChoiceAnnotation) {
        const [singleChoiceTask] = self.step.tasks.filter(task => task.taskKey === singleChoiceAnnotation.task)
        const selectedAnswer = singleChoiceTask?.answers[singleChoiceAnnotation.value]
        return selectedAnswer?.next
      }
      return self.step.next
    }
  })
)

export default AnnotatedStep
