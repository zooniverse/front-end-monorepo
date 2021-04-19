import { getRoot, types } from 'mobx-state-tree'
import taskRegistry, { taskModels } from '@plugins/tasks'

function taskDispatcher (snapshot) {
  switch (snapshot.type) {
    case 'dropdown': {
      return taskRegistry.get('dropdown-simple').TaskModel
    }
    default: {
      return taskRegistry.get(snapshot.type).TaskModel
    }
  }
}

const GenericTask = types.union({ dispatcher: taskDispatcher }, ...taskModels)

const Step = types
  .model('Step', {
    next: types.maybe(types.string),
    stepKey: types.identifier,
    taskKeys: types.array(types.string),
    tasks: types.array(GenericTask)
  })
  .views(self => ({
    isComplete(annotations=[]) {
      let isIncomplete = false
      self.tasks.forEach(task => {
        const [annotation] = annotations.filter(annotation => annotation.task === task.taskKey)
        isIncomplete = task.required && !annotation?.isComplete
      })
      return !isIncomplete
    },

    get isThereBranching () {
      // We return the first single choice task
      // It doesn't make sense to have more than one single choice task in a step
      // so we should disallow that in the editor
      const [singleChoiceTask] = self.tasks.filter(task => task.type === 'single')
      return singleChoiceTask?.answers.some((answer, index) => {
        if (singleChoiceTask.answers.length > index + 1) {
          return answer.next !== singleChoiceTask.answers[index + 1].next
        }
        return false
      })
    },

    nextStepKey(annotations = []) {
      const { workflowSteps } = getRoot(self)
      // assume only one branching question per step.
      if (self.isThereBranching) {
        const [singleChoiceAnnotation] = annotations.filter(annotation => annotation.taskType === 'single')
        if (singleChoiceAnnotation) {
          // We use the workflowSteps' active step tasks 
          // because they've been correctly converted for backwards compatibility
          const [singleChoiceTask] = workflowSteps.active.tasks.filter(task => task.taskKey === singleChoiceAnnotation.task)
          const selectedAnswer = singleChoiceTask?.answers[singleChoiceAnnotation.value]
          return selectedAnswer?.next
        }

        return undefined
      }

      // Get next step in map order or step.next if recursing
      return workflowSteps.getNextStepKey()
    }
  }))
  .actions(self => ({
    reset () {
      self.tasks.forEach(task => task.reset())
    }
  }))

export default Step
