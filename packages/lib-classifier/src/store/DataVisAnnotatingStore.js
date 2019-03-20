import { types } from 'mobx-state-tree'

const DataVisAnnotatingStore = types
  .model('DataVisAnnotatingStore', {
    active: types.optional(types.number, 0),
  })

  .actions(self => {
    function reset() {
      self.active = undefined
    }

    function setActive(toolIndex) {
      self.active = toolIndex
    }

    return {
      reset,
      setActive
    }
  })

export default DataVisAnnotatingStore
