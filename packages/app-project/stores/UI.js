import { autorun } from 'mobx'
import { addDisposer, getRoot, onPatch, types } from 'mobx-state-tree'
import cookie from 'cookie'
import stringHash from '@sindresorhus/string-hash'

// process.browser doesn't exist in the jsdom test environment
const canSetCookie = process.browser || process.env.BABEL_ENV === 'test'

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
      const dismissedAnnouncementBannerDisposer = autorun(() => {
        onPatch(self, (patch) => {
          const { path } = patch
          const isCorrectPath = path === '/dismissedAnnouncementBanner'
          const parsedCookie = cookie.parse(document.cookie) || {}
          const cookieHash = parseInt(parsedCookie.dismissedAnnouncementBanner, 10)
          const cookieIsStale = cookieHash !== self.dismissedAnnouncementBanner

          if (canSetCookie && isCorrectPath && cookieIsStale) {
            self.setAnnouncementBannerCookie()
          }
        })
      })
      addDisposer(self, dismissedAnnouncementBannerDisposer)
    },

    dismissAnnouncementBanner() {
      const { announcement } = getRoot(self).project.configuration
      const announcementHash = stringHash(announcement)
      self.dismissedAnnouncementBanner = announcementHash
    },

    setAnnouncementBannerCookie() {
      const { slug } = getRoot(self).project
      document.cookie = cookie.serialize('dismissedAnnouncementBanner', self.dismissedAnnouncementBanner, {
        domain: getCookieDomain(),
        path: `/projects/${slug}`,
      })
    },

    setModeCookie () {
      if (canSetCookie) {
        const parsedCookie = cookie.parse(document.cookie) || {}
        if (self.mode !== parsedCookie.mode) {
          document.cookie = cookie.serialize('mode', self.mode, {
            domain: getCookieDomain(),
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

function getCookieDomain () {
  const isProduction = process.env.NODE_ENV === 'production'
  return isProduction ? 'zooniverse.org' : null
}
