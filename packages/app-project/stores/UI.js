import { autorun } from 'mobx'
import { addDisposer, onPatch, types } from 'mobx-state-tree'
import Cookies from 'js-cookie'

const UI = types
  .model('UI', {
    mode: types.optional(types.enumeration('mode', ['light', 'dark']), () => {
      const mode = Cookies.get('mode')
      return mode || 'light'
    })
  })

  .actions(self => ({
    afterCreate () {
      self.createModeObserver()
    },

    createModeObserver () {
      const modeDisposer = autorun(() => {
        onPatch(self, (patch) => {
          const { path } = patch
          if (path === '/mode') self.setCookie()
        })
      })
      addDisposer(self, modeDisposer)
    },

    setCookie () {
      // process.browser doesn't exist in the jsdom test environment
      if (process.browser || process.env.BABEL_ENV === 'test') {
        const storedMode = Cookies.get('mode')
        if (self.mode !== storedMode) {
          if (process.env.NODE_ENV === 'production') {
            document.cookie = `mode=${self.mode}; path=/; domain=zooniverse.org; max-age=31536000`
          } else {
            document.cookie = `mode=${self.mode}; path=/; max-age=31536000`
          }
        }
      }
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
