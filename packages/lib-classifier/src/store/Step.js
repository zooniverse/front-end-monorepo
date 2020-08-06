import { types } from 'mobx-state-tree'
import taskRegistry, { taskModels } from '@plugins/tasks'

function taskDispatcher (snapshot) {
  return taskRegistry.get(snapshot.type).TaskModel
}

const GenericTask = types.union({ dispatcher: taskDispatcher }, ...taskModels)

export const BaseStep = types
  .model('BaseStep', {
    stepKey: types.identifier,
    taskKeys: types.array(types.string),
    tasks: types.array(GenericTask)
  })
  .views(self => ({
    get isComplete () {
      return self.tasks.reduce((isStepComplete, task) => isStepComplete && task.isComplete, true)
    }
  }))
  .actions(self => ({
    reset () {
      self.tasks.forEach(task => task.reset())
    }
  }))

export const NextStepReference = types
  .model('NextStepReference', {
    next: types.maybe(types.string) // We have this optionally to support recursive workflows, temp edit to types.string - not working as expected otherwise, though should work as types.reference
  })
  .actions(self => ({
    setNext (nextStepKey) {
      self.next = nextStepKey
    }
  }))

const Step = types.compose('Step', BaseStep, NextStepReference)

export default Step
