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

  describe('setSeenTime', function () {
    let store

    before(async function () {
      store = mockStore()
      const tutorialSnapshot = TutorialFactory.build()
      store.tutorials.setTutorials([tutorialSnapshot])
      await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
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
