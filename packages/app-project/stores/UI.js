import { autorun } from 'mobx'
import { addDisposer, getRoot, onPatch, types } from 'mobx-state-tree'
import * as cookie from 'cookie'
import stringHash from '@sindresorhus/string-hash'

import getCookie from '@helpers/getCookie'
// process.browser doesn't exist in the jsdom test environment
const canSetCookie = process.browser || process.env.BABEL_ENV === 'test'

const UI = types
  .model('UI', {
    authModalActiveIndex: types.optional(types.number, -1),
    dismissedProjectAnnouncementBanner: types.maybeNull(types.number),
  })

  .views(self => ({
    get showAnnouncement () {
      const { announcement } = getRoot(self).project.configuration
      return announcement
        ? stringHash(announcement) !== self.dismissedProjectAnnouncementBanner
        : true
    }
  }))

  .preProcessSnapshot(snapshot => {
    const dismissedProjectAnnouncementBanner = (snapshot && snapshot.dismissedProjectAnnouncementBanner)
      ? parseInt(snapshot.dismissedProjectAnnouncementBanner, 10)
      : undefined

    return {
      dismissedProjectAnnouncementBanner
    }
  })

  .actions(self => ({
    afterAttach() {
      self.createDismissedProjectAnnouncementBannerObserver()
    },

    createDismissedProjectAnnouncementBannerObserver() {
      const dismissedProjectAnnouncementBannerDisposer = autorun(() => {
        onPatch(self, (patch) => {
          const { path } = patch
          const isCorrectPath = path === '/dismissedProjectAnnouncementBanner'
          const parsedCookie = cookie.parse(document.cookie) || {}
          const cookieHash = parseInt(parsedCookie.dismissedProjectAnnouncementBanner, 10)
          const cookieIsStale = cookieHash !== self.dismissedProjectAnnouncementBanner

          if (canSetCookie && isCorrectPath && cookieIsStale) {
            self.setProjectAnnouncementBannerCookie()
          }
        })
      }, {
        name: 'updateDismissedProjectAnnouncementBannerCookie'
      })

      addDisposer(self, dismissedProjectAnnouncementBannerDisposer)
    },

    dismissProjectAnnouncementBanner() {
      const { announcement } = getRoot(self).project.configuration
      const announcementHash = stringHash(announcement)
      self.dismissedProjectAnnouncementBanner = announcementHash
    },

    readCookies() {
      if (canSetCookie) {
        self.dismissedProjectAnnouncementBanner = parseInt(getCookie('dismissedProjectAnnouncementBanner'), 10) || null
      }
    },

    setAuthModalActiveIndex(index) {
      self.authModalActiveIndex = index
    },

    setProjectAnnouncementBannerCookie() {
      const { slug } = getRoot(self).project
      document.cookie = cookie.serialize('dismissedProjectAnnouncementBanner', self.dismissedProjectAnnouncementBanner, {
        domain: getCookieDomain(),
        path: `/projects/${slug}`,
      })
    }
  }))

export default UI

function getCookieDomain () {
  const isProduction = process.env.NODE_ENV === 'production'
  return isProduction ? 'zooniverse.org' : null
}
