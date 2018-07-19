import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'

const UI = types
  .model('UI', {
    showLoginPopup: types.optional(types.boolean, false),
    showLogoutPopup: types.optional(types.boolean, false),
    showTimeoutPopup: types.optional(types.boolean, false),
    showTimeoutWarningPopup: types.optional(types.boolean, true)
  })

  .actions(self => ({
    openLoginPopup () {
      self.reset()
      self.showLoginPopup = true
    },

    closeLoginPopup () {
      self.showLoginPopup = false
    },

    openLogoutPopup () {
      self.reset()
      self.showLogoutPopup = true
    },

    closeLogoutPopup () {
      self.showLogoutPopup = false
    },

    openTimeoutPopup () {
      self.reset()
      self.showTimeoutPopup = true
    },

    closeTimeoutPopup () {
      self.showTimeoutPopup = false
    },

    openTimeoutWarningPopup () {
      self.reset()
      self.showTimeoutWarningPopup = true
    },

    closeTimeoutWarningPopup () {
      self.showTimeoutWarningPopup = false
    },

    reset () {
      self.showLoginPopup = false
      self.showLogoutPopup = false
      self.showTimeoutPopup = false
      self.showTimeoutWarningPopup = false
    }
  }))

export default UI
