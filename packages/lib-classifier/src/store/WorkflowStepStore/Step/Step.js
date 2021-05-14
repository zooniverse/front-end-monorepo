import { types } from 'mobx-state-tree'
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

const baseStep = types
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

    isValid(annotations=[]) {
      let isValid = true
      self.tasks.forEach(task => {
        const [annotation] = annotations.filter(annotation => annotation.task === task.taskKey)
        isValid = task.isValid
      })
      return isValid
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
      // assume only one branching question per step.
      const [ singleChoiceAnnotation ] = annotations.filter(annotation => annotation.taskType === 'single')
      if (singleChoiceAnnotation) {
        const [singleChoiceTask] = self.tasks.filter(task => task.taskKey === singleChoiceAnnotation.task)
        const selectedAnswer = singleChoiceTask?.answers[singleChoiceAnnotation.value]
        return selectedAnswer?.next
      }
      return self.next
    }
  }))
  .actions(self => ({
    completeTasks(annotations) {
      self.tasks.forEach((task) => {
        const [ annotation ] = annotations.filter(annotation => annotation.task === task.taskKey)
        task.complete(annotation)
      })
    },

    validateTasks(annotations) {
      self.tasks.forEach((task) => {
        const [annotation] = annotations.filter(annotation => annotation.task === task.taskKey)
        task.validate(annotation)
      })
    },

    reset () {
      self.tasks.forEach(task => task.reset())
    }
  }))

const Step = types.refinement(baseStep, function validateStep(snapshot) {
  return snapshot.stepKey !== snapshot.next
})

export default Step
