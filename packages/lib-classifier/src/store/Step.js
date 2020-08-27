import { types } from 'mobx-state-tree'
import taskRegistry, { taskModels } from '@plugins/tasks'

function taskDispatcher (snapshot) {
  return taskRegistry.get(snapshot.type).TaskModel
}

const GenericTask = types.union({ dispatcher: taskDispatcher }, ...taskModels)

const Step = types
  .model('Step', {
    next: types.maybe(types.string),
    previous: types.maybe(types.string),
    stepKey: types.identifier,
    taskKeys: types.array(types.string),
    tasks: types.array(GenericTask)
  })
  .views(self => ({
    get isComplete () {
      return self.tasks.reduce((isStepComplete, task) => isStepComplete && task.isComplete, true)
    },

    get isThereANextStep () {
      return !!self.next && self.next !== 'summary'
    },

    get isThereAPreviousStep () {
      return !!self.previous && self.stepKey !== 'summary'
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
    }
  }))
  .actions(self => ({
    reset () {
      self.tasks.forEach(task => task.reset())
      if (self.isThereBranching) {
        self.setNext(undefined)
        self.setPrevious(undefined)
      }
    },
    setNext (nextStepKey) {
      self.next = nextStepKey
    },
    setPrevious (previousStepKey) {
      self.previous = previousStepKey
    }
  }))

export default Step
