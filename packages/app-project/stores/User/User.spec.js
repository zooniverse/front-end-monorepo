import asyncStates from '@zooniverse/async-states'
import * as client from '@zooniverse/panoptes-js'
import { expect } from 'chai'
import { when } from 'mobx'
import nock from 'nock'
import sinon from 'sinon'

import { statsClient } from './UserPersonalization/YourStats'

import Store from '@stores/Store'

describe('stores > User', function () {
  const user = {
    display_name: 'Jean-Luc Picard',
    id: '1',
    login: 'zootester1'
  }
  let rootStore
  let userStore

  beforeEach(function () {
    sinon.stub(statsClient, 'fetchDailyStats')

    nock('https://panoptes-staging.zooniverse.org/api')
    .persist()
    .get('/users/1/recents')
    .query(true)
    .reply(200, { recents: [] })
    .get('/users/2/recents')
    .query(true)
    .reply(200, { recents: [] })
    .get('/collections')
    .query(true)
    .reply(200, { collections: [] })

    nock('https://panoptes-staging.zooniverse.org/api')
    .get('/project_preferences?project_id=1&user_id=1&http_cache=true')
    .reply(200, {
      project_preferences: [
        { id: '1' }
      ]
    })
    .get('/project_preferences?project_id=1&user_id=1&http_cache=true')
    .reply(200, {
      project_preferences: [
        { id: '1' }
      ]
    })
    .get('/project_preferences?project_id=1&user_id=2&http_cache=true')
    .reply(200, {
      project_preferences: [
        { id: '1' }
      ]
    })

    nock('https://talk-staging.zooniverse.org')
    .persist()
    .get('/conversations')
    .query(true)
    .reply(200, { conversations: [] })
    .get('/notifications')
    .query(true)
    .reply(200, { notifications: [] })

    rootStore = Store.create({ project: {
      id: '1',
      loadingState: asyncStates.success
    }}, { client })
    userStore = rootStore.user
  })

  afterEach(function () {
    statsClient.fetchDailyStats.restore()
    nock.cleanAll()
  })

  it('should exist', function () {
    expect(userStore).to.be.ok()
  })

  it('should set the user', function () {
    expect(userStore.id).to.be.null()
    expect(userStore.login).to.be.null()
    expect(userStore.display_name).to.be.null()

    userStore.set(user)

    expect(userStore.id).to.equal(user.id)
    expect(userStore.login).to.equal(user.login)
    expect(userStore.display_name).to.equal(user.display_name)
  })

  it('should clear the user', async function () {
    userStore.set(user)
    expect(userStore.id).to.equal(user.id)
    expect(userStore.login).to.equal(user.login)
    expect(userStore.display_name).to.equal(user.display_name)
    await when(() => userStore.loadingState === asyncStates.success)

    userStore.clear()

    expect(userStore.id).to.be.null()
    expect(userStore.login).to.be.null()
    expect(userStore.display_name).to.be.null()
  })

  describe('with an existing user session', function () {

    it('should refresh project preferences for the same user', async function () {
      userStore.set(user)
      const { personalization } = userStore

      expect(userStore.id).to.equal(user.id)
      await when(() => personalization.projectPreferences.loadingState === asyncStates.success)

      userStore.set(user)
      expect(userStore.personalization.projectPreferences.loadingState).to.equal(asyncStates.success)
      expect(rootStore.appLoadingState).to.equal(asyncStates.success)
    })

    it('should load project preferences for new users', async function () {
      userStore.set(user)
      const { personalization } = userStore

      expect(userStore.id).to.equal(user.id)
      await when(() => personalization.projectPreferences.loadingState === asyncStates.success)

      userStore.set({
        display_name: 'Worf',
        id: '2',
        login: 'zootester2'
      })
      expect(userStore.personalization.projectPreferences.loadingState).to.equal(asyncStates.loading)
      expect(rootStore.appLoadingState).to.equal(asyncStates.loading)
    })
  })
})
