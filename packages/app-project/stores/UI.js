import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'
import { getCookie } from './helpers/cookie'

const UI = types
  .model('UI', {
    mode: types.optional(types.enumeration('mode', ['light', 'dark']), () => {
      const mode = getCookie('mode')
      return mode || 'light'
    })
  })

  .actions(self => ({
    afterCreate () {
      self.createModeObserver()
    },

    createModeObserver () {
      const modeDisposer = autorun(() => {
        // process.browser doesn't exist in the jsdom test environment
        if (process.browser || process.env.BABEL_ENV === 'test') {
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
