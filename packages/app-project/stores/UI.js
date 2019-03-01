import { types } from 'mobx-state-tree'

/*
  TODO: The mode setting should be picked up from the client. PFE does it via a setting in `localStorage`, but this can only be picked up by the client bundle. So you'd get a flicker of light theme until the client bundle is loaded and picks up the correct theme setting and switches.

  A better way to do it would be via a cookie, since it'll get passed on the
  initial request and the dark theme can be rendered server-side. We could use
  https://github.com/matthewmueller/next-cookies for this.
*/

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
