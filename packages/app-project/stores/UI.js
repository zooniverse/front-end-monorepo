import { autorun } from 'mobx'
import { addDisposer, onPatch, types } from 'mobx-state-tree'
import cookie from 'cookie'

const UI = types
  .model('UI', {
    // The mode is retrieved out of the cookie in _app.js during store initialization
    mode: types.optional(types.enumeration('mode', ['light', 'dark']), 'light')
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
        const parsedCookie = cookie.parse(document.cookie) || {}
        if (self.mode !== parsedCookie.mode) {
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
