import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'

const UI = types
  .model('UI', {
    mode: types.optional(types.enumeration('mode', ['light', 'dark']), 'light')
  })

  .actions(self => ({
    afterAttach () {
      self.createModeObserver()
    },

    createModeObserver () {
      const modeDisposer = autorun(() => {
        if (process.browser) {
          document.cookie = `mode=${self.mode}; path=/; max-age=31536000`
        }
      })
      addDisposer(self, modeDisposer)
    },

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
