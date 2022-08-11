import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { panoptes, projects } from '@zooniverse/panoptes-js'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'

import initStore, { cleanStore } from './initStore'
import User from './User'

describe('Stores > initStore', function () {
  it('should export a function', function () {
    expect(initStore).to.be.a('function')
  })

  it('should create a new store when running on the server', function () {
    const store1 = initStore(true)
    const store2 = initStore(true)
    expect(store2).to.not.equal(store1)
  })

  it('should reuse a store when not running on the server', function () {
    const store1 = initStore(true)
    const store2 = initStore(false)
    expect(store2).to.equal(store1)
  })

  it('should contain a project store', function () {
    const store = initStore()
    expect(store.project).to.be.ok()
  })

  it('should apply a snapshot when provided', function () {
    const snapshot = {
      project: {
        loadingState: asyncStates.initialized,
        error: null,
        id: '12345',
        strings: {
          display_name: 'foobar'
        }
      }
    }
    const store = initStore(true, snapshot)
    expect(store.project.displayName).to.equal('foobar')
    expect(store.project.id).to.equal('12345')
  })

  it('should use PanoptesJS if there is no client argument', function () {
    const store = initStore()
    expect(store.client.panoptes).to.deep.equal(panoptes)
    expect(store.client.projects).to.deep.equal(projects)
  })

  it('should use the client argument if defined', function () {
    const client = {}
    const store = initStore({}, {}, client)
    expect(store.client).to.equal(client)
  })

  describe('with a logged-in user', function () {
    before(function () {
      const pageProps = {
        project: {
          loadingState: asyncStates.initialized,
          display_name: 'foobar',
          error: null,
          id: '12345'
        }
      }
      cleanStore()
      const store=initStore(false, pageProps)
      const user = User.create({
        id: '12345',
        display_name: 'test user',
        loadingState: asyncStates.success
      })
      applySnapshot(store.user, getSnapshot(user))
    })

    it('should store a user snapshot in session storage', function () {
      const storedUserData = window.sessionStorage.getItem('panoptes-user')
      const storedUser = JSON.parse(storedUserData)
      expect(storedUser.id).to.equal('12345')
      expect(storedUser.display_name).to.equal('test user')
      expect(storedUser.loadingState).to.equal(asyncStates.success)
    })
  })

  describe('with a stored user', function () {
    let store

    before(function () {
      const user = User.create({
        id: '12345',
        display_name: 'test user',
        loadingState: asyncStates.success
      })
      const pageProps = {
        project: {
          loadingState: asyncStates.initialized,
          display_name: 'foobar',
          error: null,
          id: '12345'
        }
      }
      const storedUser = JSON.stringify(getSnapshot(user))
      window.sessionStorage.setItem('panoptes-user', storedUser)
      cleanStore()
      store=initStore(false, pageProps)
    })

    it('should contain a user', function () {
      expect(store.user.id).to.equal('12345')
      expect(store.user.display_name).to.equal('test user')
    })

    it('should already be loaded', function () {
      expect(store.user.loadingState).to.equal(asyncStates.success)
    })
  })
})
