import asyncStates from '@zooniverse/async-states'
import * as client from '@zooniverse/panoptes-js'
import { when } from 'mobx'
import nock from 'nock'

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
        {
          links: {
            user: '1'
          }
        }
      ]
    })
    .get('/project_preferences?project_id=1&user_id=1&http_cache=true')
    .reply(200, {
      project_preferences: [
        {
          links: {
            user: '1'
          }
        }
      ]
    })
    .get('/project_preferences?project_id=1&user_id=2&http_cache=true')
    .reply(200, {
      project_preferences: [
        {
          links: {
            user: '1'
          }
        }
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
    nock.cleanAll()
  })

  it('should exist', function () {
    expect(userStore).toBeDefined()
  })

  it('should set the user', function () {
    expect(userStore.id).to.equal(null)
    expect(userStore.login).to.equal(null)
    expect(userStore.display_name).to.equal(null)

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

    expect(userStore.id).to.equal(null)
    expect(userStore.login).to.equal(null)
    expect(userStore.display_name).to.equal(null)
  })

  describe('adminMode', function () {
    const adminUser = {
      display_name: 'Admin User',
      id: '1',
      login: 'zootester1',
      admin: true
    }

    const regularUser = {
      display_name: 'Regular User',
      id: '2',
      login: 'zootester2',
      admin: false
    }

    afterEach(function () {
      window.localStorage.removeItem('adminFlag')
    })

    it('should be false by default', function () {
      expect(userStore.adminMode).to.equal(false)
    })

    it('should be false for non-admin users regardless of _adminMode', function () {
      userStore.set(regularUser)
      userStore.setAdminMode(true)
      expect(userStore.adminMode).to.equal(false)
    })

    it('should be true when admin user has _adminMode set', function () {
      userStore.set(adminUser)
      userStore.setAdminMode(true)
      expect(userStore.adminMode).to.equal(true)
    })

    it('should toggle admin mode', function () {
      userStore.set(adminUser)
      expect(userStore.adminMode).to.equal(false)
      userStore.toggleAdminMode()
      expect(userStore.adminMode).to.equal(true)
      userStore.toggleAdminMode()
      expect(userStore.adminMode).to.equal(false)
    })

    it('should persist to localStorage when toggled on', function () {
      userStore.set(adminUser)
      userStore.toggleAdminMode()
      expect(window.localStorage.getItem('adminFlag')).to.equal('true')
    })

    it('should remove from localStorage when toggled off', function () {
      userStore.set(adminUser)
      userStore.setAdminMode(true)
      userStore.toggleAdminMode()
      expect(window.localStorage.getItem('adminFlag')).to.equal(null)
    })

    it('should read adminFlag from localStorage on admin user load', function () {
      window.localStorage.setItem('adminFlag', 'true')
      userStore.set(adminUser)
      expect(userStore.adminMode).to.equal(true)
    })

    it('should not read adminFlag for non-admin user load', function () {
      window.localStorage.setItem('adminFlag', 'true')
      userStore.set(regularUser)
      expect(userStore.adminMode).to.equal(false)
    })

    it('should clear adminMode and localStorage on clear()', function () {
      userStore.set(adminUser)
      userStore.setAdminMode(true)
      expect(userStore.adminMode).to.equal(true)
      userStore.clear()
      expect(userStore.adminMode).to.equal(false)
      expect(window.localStorage.getItem('adminFlag')).to.equal(null)
    })

    it('should remove localStorage adminFlag when non-admin user loads', function () {
      window.localStorage.setItem('adminFlag', 'true')
      userStore.set(regularUser)
      expect(window.localStorage.getItem('adminFlag')).to.equal(null)
    })
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
