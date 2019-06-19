import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Subject } from 'rxjs'

const DrawingStore = types
  .model('DrawingStore', {
    activeTask: types.maybe(types.string),
    activeTool: types.optional(types.number, 0)
  })
  .volatile(self => ({
    eventStream: new Subject()
  }))
  .actions(self => {
    function afterAttach () {
      createClassificationObserver()
      createWorkflowStepsObserver()
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self).classifications, (call) => {
          if (call.name === 'completeClassification') self.reset()
        })
      })
      addDisposer(self, classificationDisposer)
    }

    function createWorkflowStepsObserver () {
      const workflowStepsDisposer = autorun(() => {
        onAction(getRoot(self).workflowSteps, (call) => {
          if (call.name === 'selectStep') self.reset()
        })
      })

      addDisposer(self, workflowStepsDisposer)
    }

    function reset () {
      self.activeTask = null
      self.activeTool = null
    }

    function setActive (toolIndex, taskKey) {
      self.activeTask = taskKey
      self.activeTool = toolIndex
    }

    function addToStream (event) {
      self.eventStream.next(event)
    }

    return {
      addToStream,
      afterAttach,
      reset,
      setActive
    }
  })

export default DrawingStore
