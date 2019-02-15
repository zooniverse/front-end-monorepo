import { expect } from 'chai'
import sinon from 'sinon'
import { getSnapshot } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'

import Project from './Project'
import Store from './Store'
import initStore from './initStore'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Recents', function () {
  let rootStore
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }

  before(function () {
    const mockResponse = {
      body: {
        recents: [
          {
            locations: [
              { 'image/jpeg': 'subject.jpeg'}
            ],
            links: {
              subject: '345'
            }
          }
        ]
      }
    }
    rootStore = initStore(true, { project })
    sinon.stub(rootStore.client.panoptes, 'get').callsFake(() => Promise.resolve(mockResponse))
  })

  after(function () {
    rootStore.client.panoptes.get.restore()
  })

  it('should exist', function () {
    expect(rootStore.recents).to.be.ok
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
      rootStore.collections.fetchFavourites.restore()
    })

    it('should request recent subjects from Panoptes', function () {
      const token = 'Bearer '
      const endpoint = '/users/123/recents'
      const query = {
        project_id: '2',
        sort: '-created_at'
      }
      expect(rootStore.client.panoptes.get).to.have.been.calledOnceWith(endpoint, query, token)
    })

    it('should store existing recents', function () {
      expect(rootStore.recents.recents).to.have.lengthOf(1)
      const recents = getSnapshot(rootStore.recents.recents)
      expect(recents[0].subjectId).to.equal('345')
      expect(recents[0].locations).to.eql([
        { 'image/jpeg': 'subject.jpeg'}
      ])
    })

    describe('adding a subject', function () {
      const mockRecent = {
        subjectId: '123',
        locations: [
          { 'image/jpeg': 'test.jpeg'}
        ]
      }

      before(function () {
        rootStore.recents.add(mockRecent)
      })

      it('should add a new subject to the store', function () {
        expect(rootStore.recents.recents).to.have.lengthOf(2)
        const recents = getSnapshot(rootStore.recents.recents)
        expect(recents[0].subjectId).to.equal('123')
        expect(recents[0].locations).to.eql([
          { 'image/jpeg': 'test.jpeg'}
        ])
      })
    })
  })

  describe('with a project and anonymous user', function () {
    before(function () {
      rootStore = initStore(true, { project })
    })

    it('should not request recent subjects from Panoptes', function () {
      expect(rootStore.client.panoptes.get).to.have.not.been.called
    })

    it('should initialise recents with an empty array', function () {
      expect(rootStore.recents.recents).to.have.lengthOf(0)
    })

    describe('adding a subject', function () {
      const mockRecent = {
        subjectId: '123',
        locations: [
          { 'image/jpeg': 'test.jpeg'}
        ]
      }

      before(function () {
        rootStore.recents.add(mockRecent)
      })

      it('should add a new subject to the store', function () {
        expect(rootStore.recents.recents).to.have.lengthOf(1)
        const recents = getSnapshot(rootStore.recents.recents)
        expect(recents[0].subjectId).to.equal('123')
        expect(recents[0].locations).to.eql([
          { 'image/jpeg': 'test.jpeg'}
        ])
      })
    })
  })
})