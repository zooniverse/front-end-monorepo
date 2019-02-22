import { expect } from 'chai'
import sinon from 'sinon'
import { getSnapshot } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

import initStore from './initStore'

describe('Stores > Recents', function () {
  let rootStore
  let recentsStore
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
              { 'image/jpeg': 'subject.jpeg' }
            ],
            links: {
              subject: '345'
            }
          }
        ]
      }
    }
    rootStore = initStore(true, { project })
    recentsStore = rootStore.recents
    sinon.stub(rootStore.client.panoptes, 'get').callsFake(() => Promise.resolve(mockResponse))
  })

  after(function () {
    rootStore.client.panoptes.get.restore()
  })

  it('should exist', function () {
    expect(recentsStore).to.be.ok
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
      expect(recentsStore.recents).to.have.lengthOf(1)
      const recents = getSnapshot(recentsStore.recents)
      expect(recents[0].subjectId).to.equal('345')
      expect(recents[0].locations).to.eql([
        { 'image/jpeg': 'subject.jpeg' }
      ])
    })

    describe('adding a subject', function () {
      const mockRecent = {
        subjectId: '123',
        locations: [
          { 'image/jpeg': 'test.jpeg' }
        ]
      }

      before(function () {
        recentsStore.add(mockRecent)
      })

      it('should add a new subject to the store', function () {
        expect(recentsStore.recents).to.have.lengthOf(2)
        const recents = getSnapshot(recentsStore.recents)
        expect(recents[0].subjectId).to.equal('123')
        expect(recents[0].locations).to.eql([
          { 'image/jpeg': 'test.jpeg' }
        ])
      })
    })
  })

  describe('with a project and anonymous user', function () {
    before(function () {
      rootStore = initStore(true, { project })
      recentsStore = rootStore.recents
    })

    it('should not request recent subjects from Panoptes', function () {
      expect(rootStore.client.panoptes.get).to.have.not.been.called
    })

    it('should initialise recents with an empty array', function () {
      expect(recentsStore.recents).to.have.lengthOf(0)
    })

    describe('adding a subject', function () {
      const mockRecent = {
        subjectId: '123',
        locations: [
          { 'image/jpeg': 'test.jpeg' }
        ]
      }

      before(function () {
        recentsStore.add(mockRecent)
      })

      it('should add a new subject to the store', function () {
        expect(recentsStore.recents).to.have.lengthOf(1)
        const recents = getSnapshot(recentsStore.recents)
        expect(recents[0].subjectId).to.equal('123')
        expect(recents[0].locations).to.eql([
          { 'image/jpeg': 'test.jpeg' }
        ])
      })
    })
  })

  describe('when Zooniverse auth is down.', function () {
    const mockRecent = {
      subjectId: '123',
      locations: [
        { 'image/jpeg': 'test.jpeg' }
      ]
    }

    before(function () {
      rootStore = initStore(true, { project })
      recentsStore = rootStore.recents
      const user = {
        id: '123',
        login: 'test.user'
      }
      sinon.stub(auth, 'checkBearerToken').callsFake(() => Promise.reject(new Error('Auth is not available')))
      sinon.stub(rootStore.collections, 'fetchFavourites')
      rootStore.user.set(user)
      recentsStore.add(mockRecent)
    })

    after(function () {
      auth.checkBearerToken.restore()
      rootStore.collections.fetchFavourites.restore()
    })

    it('should record subjects classified this session', function () {
      expect(recentsStore.recents).to.have.lengthOf(1)
      const recents = getSnapshot(recentsStore.recents)
      expect(recents[0].subjectId).to.equal('123')
      expect(recents[0].locations).to.eql([
        { 'image/jpeg': 'test.jpeg' }
      ])
    })
  })

  describe('on Panoptes API errors', function () {
    const mockRecent = {
      subjectId: '123',
      locations: [
        { 'image/jpeg': 'test.jpeg' }
      ]
    }

    before(function () {
      rootStore = initStore(true, { project })
      recentsStore = rootStore.recents
      const user = {
        id: '123',
        login: 'test.user'
      }
      rootStore.client.panoptes.get.callsFake(() => Promise.reject(new Error('Panoptes is not available')))
      sinon.stub(rootStore.collections, 'fetchFavourites')
      rootStore.user.set(user)
      recentsStore.add(mockRecent)
    })

    after(function () {
      rootStore.collections.fetchFavourites.restore()
    })

    it('should record subjects classified this session', function () {
      expect(recentsStore.recents).to.have.lengthOf(1)
      const recents = getSnapshot(recentsStore.recents)
      expect(recents[0].subjectId).to.equal('123')
      expect(recents[0].locations).to.eql([
        { 'image/jpeg': 'test.jpeg' }
      ])
    })
  })
})
