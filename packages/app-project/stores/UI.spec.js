import sinon from 'sinon'
import * as cookie from 'cookie'
import stringHash from '@sindresorhus/string-hash'

import initStore from './initStore'

import UI from './UI'

const PROJECT = {
  configuration: {
    announcement: 'Nunc interdum justo fusce mi'
  },
  id: '2',
  display_name: 'Hello',
  slug: 'test/project'
}

const ANNOUNCEMENT_HASH = stringHash(PROJECT.configuration.announcement)

describe('Stores > UI', function () {
  it('should export an object', function () {
    expect(UI).to.be.an('object')
  })

  describe('dismissedProjectAnnouncementBanner', function () {
    let rootStore
    let store

    beforeEach(function () {
      rootStore = initStore(true, { project: PROJECT })
      store = rootStore.ui
    })

    it('should contain a dismissedProjectAnnouncementBanner property', function () {
      expect(store.dismissedProjectAnnouncementBanner).to.equal(null)
    })

    it('should have a `dismissProjectAnnouncementBanner` action', function () {
      const expectedValue = stringHash(PROJECT.configuration.announcement)
      expect(store.dismissedProjectAnnouncementBanner).to.equal(null)
      store.dismissProjectAnnouncementBanner()
      expect(store.dismissedProjectAnnouncementBanner).to.equal(expectedValue)
    })

    it('should have a showAnnouncement view', function () {
      expect(store.showAnnouncement).to.equal(true)
      store.dismissProjectAnnouncementBanner()
      expect(store.showAnnouncement).to.equal(false)
    })
  })

  describe('when using the dismissedProjectAnnouncementBanner cookie', function () {
    let rootStore
    let store
    let originalDocument
    let setProjectAnnouncementBannerCookieSpy

    before(function () {
      originalDocument = document
      dom.reconfigure({
        url: `https://localhost/projects/${PROJECT.slug}`
      })
      document = sinon.mock({
        value_: '',

        get cookie() {
          return this.value_;
        },

        set cookie(value) {
          this.value_ += value + ';';
        }
      })
    })

    after(function () {
      document = originalDocument
      dom.reconfigure({
        url: originalDocument.URL
      })
    })

    beforeEach(function () {
      rootStore = initStore(true, { project: PROJECT })
      store = rootStore.ui
    })

    it('should not set the cookie on instantiation', function () {
      expect(document.cookie).toBeUndefined()
    })

    it('should not update the cookie if it already matches the store value', function () {
      document.cookie = cookie.serialize('dismissedProjectAnnouncementBanner', ANNOUNCEMENT_HASH, {
        path: `/projects/${PROJECT.slug}`
      })

      store.dismissProjectAnnouncementBanner()
      expect(document.cookie).to.equal(`dismissedProjectAnnouncementBanner=${ANNOUNCEMENT_HASH}; Path=/projects/${PROJECT.slug}`)
    })

    it(`should update the cookie if it doesn't match the store value`, function () {
      document.cookie = cookie.serialize('dismissedProjectAnnouncementBanner', 1234567890, {
        path: `/projects/${PROJECT.slug}`
      })
      store.readCookies()
      expect(store.dismissedProjectAnnouncementBanner).to.equal(1234567890)
      store.dismissProjectAnnouncementBanner()
      store.readCookies()
      expect(store.dismissedProjectAnnouncementBanner).to.equal(ANNOUNCEMENT_HASH)
    })
  })
})
