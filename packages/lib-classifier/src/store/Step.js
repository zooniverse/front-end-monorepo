import { types } from 'mobx-state-tree'
import taskRegistry, { taskModels } from '@plugins/tasks'

function taskDispatcher (snapshot) {
  return taskRegistry.get(snapshot.type).TaskModel
}

const taskTypes = types.union({ dispatcher: taskDispatcher }, ...taskModels)

export const BaseStep = types
  .model('BaseStep', {
    stepKey: types.identifier,
    taskKeys: types.array(types.string),
    tasks: types.array(taskTypes)
  })
  .views(self => ({
    get isComplete () {
      return self.tasks.reduce((isStepComplete, task) => isStepComplete && task.isComplete, true)
    }
  }))

export const NextStepReference = types
  .model('NextStepReference', {
    next: types.maybe(types.reference(BaseStep)) // We have this optionally to support recursive workflows
  })

const Step = types.compose('Step', BaseStep, NextStepReference)

export default Step
