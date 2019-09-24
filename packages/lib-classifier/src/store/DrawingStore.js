import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Subject } from 'rxjs'

const DrawingStore = types
  .model('DrawingStore', {
    activeDrawingTool: types.optional(types.number, 0)
  })
  .views(self => ({
    get activeDrawingTask () {
      const [task] = getRoot(self).workflowSteps.activeStepTasks
        .filter(task => task.type === 'drawing')
      return task
    },
    get isDrawingInActiveWorkflowStep () {
      return getRoot(self).workflowSteps.activeStepTasks
        .some(task => task.type === 'drawing')
    }
  }))
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
      self.activeDrawingTool = 0
    }

    function setActiveDrawingTool (toolIndex) {
      self.activeDrawingTool = toolIndex
    }

    function addToStream (event) {
      self.eventStream.next(event)
    }

    return {
      addToStream,
      afterAttach,
      reset,
      setActiveDrawingTool
    }
  })

export default DrawingStore
