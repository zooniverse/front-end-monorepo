import { expect } from 'chai'
import sinon from 'sinon'
import { getSnapshot } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'

import Store from './Store'
import initStore from './initStore'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > YourStats', function () {
  let rootStore
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }

  before(function () {
    const mockResponse = {
      body: {
        project_preferences: [
          {
            activity_count: 23
          }
        ]
      }
    }
    rootStore = initStore(true, { project })
    sinon.stub(rootStore.client.panoptes, 'get').callsFake(() => Promise.resolve(mockResponse))
    sinon.stub(rootStore.client.panoptes, 'post').callsFake(() => Promise.resolve({}))
  })

  after(function () {
    rootStore.client.panoptes.get.restore()
    rootStore.client.panoptes.post.restore()
  })

  it('should exist', function () {
    expect(rootStore.yourStats).to.be.ok
  })

  describe('with a project and user', function () {
    before(function () {
      const user = {
        id: '123',
        login: 'test.user'
      }
      sinon.stub(rootStore.collections, 'fetchFavourites')
      rootStore.user.set(user)
    })

    after(function () {
      rootStore.client.panoptes.get.resetHistory()
      rootStore.client.panoptes.post.resetHistory()
      rootStore.collections.fetchFavourites.restore()
    })

    it('should request user preferences', function () {
      const token = 'Bearer '
      const endpoint = '/project_preferences'
      const query = {
        project_id: '2',
        user_id: '123'
      }
      expect(rootStore.client.panoptes.get).to.have.been.calledOnceWith(endpoint, query, token)
    })

    it('should store your activity count', function () {
      expect(rootStore.yourStats.totalCount).to.equal(23)
    })

    it('should request user statistics', function () {
      const token = 'Bearer '
      const host = 'https://stats.zooniverse.org'
      const endpoint = '/graphql'
      const query = {
            statsCount: {
              eventType: 'classification',
              interval: '1 Day',
              projectId: '2',
              userId: '123'
            }
          }
      expect(rootStore.client.panoptes.post).to.have.been.calledOnceWith(endpoint, query, token, host)
    })

    describe('incrementing your classification count', function () {
      before(function () {
        rootStore.yourStats.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.yourStats.totalCount).to.equal(24)
      })
    })
  })

  describe('with a project and anonymous user', function () {
    before(function () {
      rootStore = initStore(true, { project })
    })

    it('should not request user preferences from Panoptes', function () {
      expect(rootStore.client.panoptes.get).to.have.not.been.called
    })

    it('should start counting from 0', function () {
      expect(rootStore.yourStats.totalCount).to.equal(0)
    })

    describe('incrementing your classification count', function () {
      before(function () {
        rootStore.yourStats.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.yourStats.totalCount).to.equal(1)
      })
    })
  })
})