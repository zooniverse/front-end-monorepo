import { flow, types } from 'mobx-state-tree'

const UI = types
  .model('UI', {
    mode: types.optional(types.enumeration('mode', ['light', 'dark']), 'light')
  })

  .actions(self => ({
    setDarkMode () {
      self.mode = 'dark'
    },

    setLightMode () {
      self.mode = 'light'
    },

    toggleMode () {
      if (self.mode === 'light') {
        self.setDarkMode()
      } else {
        self.setLightMode()
      }
    }
  }))

export default UI
