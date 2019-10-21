import { autorun } from 'mobx'
import { addDisposer, getRoot, onPatch, types } from 'mobx-state-tree'
import cookie from 'cookie'
import stringHash from '@sindresorhus/string-hash'

const UI = types
  .model('UI', {
    dismissedAnnouncementBanner: types.maybe(types.number),

    // The mode is retrieved out of the cookie in _app.js during store initialization
    mode: types.optional(types.enumeration('mode', ['light', 'dark']), 'light')
  })

  .views(self => ({
    get showAnnouncement () {
      const { announcement } = getRoot(self).project.configuration
      return stringHash(announcement) !== self.dismissedAnnouncementBanner
    }
  }))

  .preProcessSnapshot(snapshot => {
    const dismissedAnnouncementBanner = (snapshot && snapshot.dismissedAnnouncementBanner)
      ? parseInt(snapshot.dismissedAnnouncementBanner, 10)
      : undefined

    const mode = (snapshot && snapshot.mode) ? snapshot.mode : undefined

    return {
      dismissedAnnouncementBanner,
      mode
    }
  })

  .actions(self => ({
    afterCreate () {
      self.createModeObserver()
      self.createDismissedAnnouncementBannerObserver()
    },

    createModeObserver () {
      const modeDisposer = autorun(() => {
        onPatch(self, (patch) => {
          const { path } = patch
          if (path === '/mode') self.setModeCookie()
        })
      })
      addDisposer(self, modeDisposer)
    },

    createDismissedAnnouncementBannerObserver() {
      const modeDisposer = autorun(() => {
        onPatch(self, (patch) => {
          const { path } = patch
          if (path === '/dismissedAnnouncementBanner') {
            self.setAnnouncementBannerCookie()
          }
        })
      })
      addDisposer(self, modeDisposer)
    },

    dismissAnnouncementBanner() {
      const announcement = getRoot(self).project.configuration.announcement
      const announcementHash = stringHash(announcement)
      self.dismissedAnnouncementBanner = announcementHash
    },

    setAnnouncementBannerCookie() {
      // process.browser doesn't exist in the jsdom test environment
      if (process.browser || process.env.BABEL_ENV === 'test') {
        const parsedCookie = cookie.parse(document.cookie) || {}
        if (self.dismissedAnnouncementBanner !== parsedCookie.dismissedAnnouncementBanner) {
          const isProduction = process.env.NODE_ENV === 'production'
          const { slug } = getRoot(self).project
          document.cookie = cookie.serialize('dismissedAnnouncementBanner', self.dismissedAnnouncementBanner, {
            domain: isProduction ? 'zooniverse.org' : null,
            path: `/projects/${slug}`,
          })
        }
      }
    },

    setModeCookie () {
      // process.browser doesn't exist in the jsdom test environment
      if (process.browser || process.env.BABEL_ENV === 'test') {
        const parsedCookie = cookie.parse(document.cookie) || {}
        const isProduction = process.env.NODE_ENV === 'production'
        if (self.mode !== parsedCookie.mode) {
          document.cookie = cookie.serialize('mode', self.mode, {
            domain: isProduction ? 'zooniverse.org' : null,
            maxAge: 31536000,
            path: '/',
          })
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
    },
  }))

export default UI
