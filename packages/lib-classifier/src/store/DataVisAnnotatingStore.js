import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'

const DataVisAnnotatingStore = types
  .model('DataVisAnnotatingStore', {
    active: types.optional(types.number, 0)
  })

  .actions(self => {
    function afterAttach () {
      createClassificationObserver()
      createWorkflowStepsObserver()
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
          if (call.name === 'completeClassification') self.reset()
        })
      }, { name: 'DataVisAnnotatingStore Classification Observer autorun' })
      addDisposer(self, classificationDisposer)
    }

    function createWorkflowStepsObserver () {
      const workflowStepsDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
          if (call.name === 'selectStep') self.reset()
        })
      }, { name: 'DataVisAnnotatingStore Workflow Steps Observer autorun' })

      addDisposer(self, workflowStepsDisposer)
    }

    function reset () {
      self.active = 0
    }

    function setActive (toolIndex) {
      self.active = toolIndex
    }

    return {
      afterAttach,
      reset,
      setActive
    }
  })

export default DataVisAnnotatingStore
