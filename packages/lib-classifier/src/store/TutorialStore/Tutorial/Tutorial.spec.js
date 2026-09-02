import asyncStates from '@zooniverse/async-states'
import { when } from 'mobx'
import sinon from 'sinon'

import { TutorialFactory, UPPFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import Tutorial from './Tutorial'

describe('Model > Tutorial', function () {
  it('should exist', function () {
    expect(Tutorial).to.be.an('object')
  })

  describe('hasNotBeenSeen', function () {
    let store

    beforeEach(async function () {
      store = mockStore()
      await store.tutorials.fetchTutorials()
      store.workflows.reset()
      const tutorialSnapshot = TutorialFactory.build()
      store.tutorials.setTutorials([tutorialSnapshot])
    })

    it('should be false while UPP loads', function () {
      const tutorial = store.tutorials.active
      expect(tutorial.hasNotBeenSeen).to.equal(false)
    })

    it('should be true for anonymous users', async function () {
      const tutorial = store.tutorials.active
      expect(tutorial.hasNotBeenSeen).to.equal(false)
      store.userProjectPreferences.clear()
      expect(tutorial.hasNotBeenSeen).to.equal(true)
    })


    it('should be false after an anonymous user has seen the tutorial', async function () {
      const tutorial = store.tutorials.active
      expect(tutorial.hasNotBeenSeen).to.equal(false)
      store.userProjectPreferences.clear()
      expect(tutorial.hasNotBeenSeen).to.equal(true)
      tutorial.setSeenTime()
      expect(tutorial.hasNotBeenSeen).to.equal(false)
    })

    it('should be true after the user has loaded', async function () {
      const tutorial = store.tutorials.active
      expect(tutorial.hasNotBeenSeen).to.equal(false)
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      expect(tutorial.hasNotBeenSeen).to.equal(true)
    })

    it('should be false after a user has seen the tutorial', async function () {
      const tutorial = store.tutorials.active
      expect(tutorial.hasNotBeenSeen).to.equal(false)
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      expect(tutorial.hasNotBeenSeen).to.equal(true)
      store.userProjectPreferences.setHeaders({
        etag: 'mockETagForTests'
      })
      tutorial.setSeenTime()
      expect(tutorial.hasNotBeenSeen).to.equal(false)
    })
  })

  describe('setSeenTime', function () {
    let store

    before(async function () {
      store = mockStore()
      const tutorialSnapshot = TutorialFactory.build()
      store.tutorials.setTutorials([tutorialSnapshot])
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      store.userProjectPreferences.setHeaders({
        etag: 'mockETagForTests'
      })
    })

    it('should update user project preferences', function () {
      const clock = sinon.useFakeTimers({ now: new Date('2022-03-01T12:00:00Z'), toFake: ['Date'] })
      const tutorial = store.tutorials.active
      const seen = new Date().toISOString()
      tutorial.setSeenTime()
      const upp = store.userProjectPreferences.active
      expect(upp?.preferences.tutorials_completed_at[tutorial.id]).to.equal(seen)
      clock.restore()
    })
  })
})
