import { expect } from 'chai'
import sinon from 'sinon'
import cookie from 'cookie'
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

  describe('mode', function () {
    let store

    beforeEach(function () {
      store = UI.create()
    })

    it('should contain a mode property', function () {
      expect(store.mode).to.be.ok()
    })

    it('should default to the light mode', function () {
      expect(store.mode).to.equal('light')
    })

    it('should have a `setDarkMode` action', function () {
      expect(store.mode).to.equal('light')
      store.setDarkMode()
      expect(store.mode).to.equal('dark')
    })

    it('should have a `setLightMode` action', function () {
      expect(store.mode).to.equal('light')
      store.setDarkMode()
      expect(store.mode).to.equal('dark')
      store.setLightMode()
      expect(store.mode).to.equal('light')
    })

    it('should have a `toggleMode` action', function () {
      expect(store.mode).to.equal('light')
      store.toggleMode()
      expect(store.mode).to.equal('dark')
      store.toggleMode()
      expect(store.mode).to.equal('light')
    })
  })

  describe('when using the mode cookie', function () {
    let originalDocument
    let setModeCookieSpy
    let store

    before(function () {
      originalDocument = document
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
    })

    beforeEach(function () {
      document.cookie = 'mode=; max-age=-99999999;'
      store = UI.create()
    })

    it('should not set the cookie on instantiation', function () {
      const mode = cookie.parse(document.cookie).mode
      expect(mode).to.be.empty()
    })

    it('should default to the stored mode in the cookie', function () {
      store.setDarkMode()
      store = UI.create({
        mode: cookie.parse(document.cookie).mode
      })
      expect(store.mode).to.equal('dark')
    })

    it('should not update the cookie on instantiation if there is already one', function () {
      document.cookie = 'mode=light; path=/; max-age=31536000'
      store = UI.create()
      const mode = cookie.parse(document.cookie).mode
      expect(mode).to.equal('light')
    })

    it('should update the cookie if the store mode does not equal the stored cookie mode', function () {
      store.setDarkMode()
      store.readCookies()
      expect(store.mode).to.equal('dark')
      store.setLightMode()
      store.readCookies()
      expect(store.mode).to.equal('light')
    })
  })

  describe('dismissedProjectAnnouncementBanner', function () {
    let rootStore
    let store

    beforeEach(function () {
      rootStore = initStore(true, { project: PROJECT })
      store = rootStore.ui
    })

    it('should contain a dismissedProjectAnnouncementBanner property', function () {
      expect(store.dismissedProjectAnnouncementBanner).to.be.null()
    })

    it('should have a `dismissProjectAnnouncementBanner` action', function () {
      const expectedValue = stringHash(PROJECT.configuration.announcement)
      expect(store.dismissedProjectAnnouncementBanner).to.be.null()
      store.dismissProjectAnnouncementBanner()
      expect(store.dismissedProjectAnnouncementBanner).to.equal(expectedValue)
    })

    it('should have a showAnnouncement view', function () {
      expect(store.showAnnouncement).to.be.true()
      store.dismissProjectAnnouncementBanner()
      expect(store.showAnnouncement).to.be.false()
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
      expect(document.cookie).to.be.undefined()
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
