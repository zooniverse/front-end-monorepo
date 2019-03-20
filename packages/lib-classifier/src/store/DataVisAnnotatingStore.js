import { types } from 'mobx-state-tree'

const DataVisAnnotatingStore = types
  .model('DataVisAnnotatingStore', {
    active: types.optional(types.number, 0),
  })

  .actions(self => {
    function afterAttach() {
      createClassificationObserver()
    }

    function createClassificationObserver() {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
          if (call.name === 'completeClassification') self.reset()
        })
      })
      addDisposer(self, classificationDisposer)
    }

    function reset() {
      self.active = 0
    }

    function setActive(toolIndex) {
      self.active = toolIndex
    }

    return {
      afterAttach,
      reset,
      setActive
    }
  })

export default DataVisAnnotatingStore
