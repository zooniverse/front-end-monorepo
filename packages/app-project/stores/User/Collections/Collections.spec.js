import asyncStates from '@zooniverse/async-states'
import { collections } from '@zooniverse/panoptes-js'
import { expect } from 'chai'
import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

import Store from '@stores/Store'
import initStore from '@stores/initStore'
import placeholderEnv from '@stores/helpers/placeholderEnv'

describe('stores > Collections', function () {
  let rootStore = Store.create({}, placeholderEnv)
  let collectionsStore = rootStore.collections

  it('should exist', function () {
    expect(rootStore.user.collections).to.be.ok()
  })

  describe('searchCollections', function () {
    before(function () {
      const project = {
        id: '2',
        display_name: 'Hello',
        slug: 'test/project'
      }
      const user = {
        login: 'test.user'
      }
      const snapshot = { project, user }
      rootStore = initStore(true, snapshot)
      sinon.stub(rootStore.client.collections, 'get').callsFake(function () {
        return Promise.resolve({ body: collections.mocks.responses.get.collection })
      })
      collectionsStore = rootStore.user.collections
    })

    after(function () {
      rootStore.client.collections.get.restore()
    })

    it('should query the collections API', function (done) {
      expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)
      const query = {
        favorite: false,
        search: 'test'
      }

      collectionsStore.searchCollections(query)
        .then(function () {
          const params = {
            authorization: 'Bearer ',
            query
          }
          expect(collectionsStore.loadingState).to.equal(asyncStates.success)
          expect(rootStore.client.collections.get).to.have.been.calledOnceWith(params)
        })
        .then(done, done)

      expect(collectionsStore.loadingState).to.equal(asyncStates.loading)
    })

    it('should store the search results', function (done) {
      const query = {
        favorite: false,
        search: 'test'
      }

      collectionsStore.searchCollections(query)
        .then(function () {
          const results = getSnapshot(rootStore.user.collections.collections)
          const expectedResult = collections.mocks.resources.collection
          expect(results).to.have.lengthOf(1)
          expect(results[0].id).to.eql(expectedResult.id)
          expect(results[0].display_name).to.eql(expectedResult.display_name)
        })
        .then(done, done)
    })
  })

  describe('createCollection', function () {
    before(function () {
      const project = {
        id: '2',
        display_name: 'Hello',
        slug: 'test/project'
      }
      const user = {
        login: 'test.user'
      }
      const snapshot = { project, user }
      rootStore = initStore(true, snapshot)
      sinon.stub(rootStore.client.collections, 'create').callsFake(function (payload) {
        const [ collection ] = collections.mocks.responses.get.collection.collections
        const links = {
          project: payload.project,
          subjects: payload.subjects
        }
        const newCollection = Object.assign({}, collection, payload.data, { links })
        const body = Object.assign({}, collections.mocks.responses.get.collection, { collections: [newCollection] })
        return Promise.resolve({ body })
      })
      collectionsStore = rootStore.user.collections
    })

    after(function () {
      rootStore.client.collections.create.restore()
    })

    it('should create a new collection', function (done) {
      expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

      collectionsStore.createCollection({ display_name: 'A new collection' }, [ '1', '2', '3' ])
        .then(function () {
          const payload = {
            authorization: 'Bearer ',
            data: {
              display_name: 'A new collection',
              favorite: false,
              private: false
            },
            project: '2',
            subjects: [ '1', '2', '3' ]
          }
          expect(collectionsStore.loadingState).to.equal(asyncStates.success)
          expect(rootStore.client.collections.create).to.have.been.calledOnceWith(payload)
        })
        .then(done, done)

      // Since this is run before fetch's thenable resolves, it should test
      // correctly during the request.
      expect(collectionsStore.loadingState).to.equal(asyncStates.loading)
    })
  })

  describe('fetchFavourites', function () {
    it('should exist', function () {
      expect(collectionsStore.fetchFavourites).to.be.a('function')
    })

    describe('with an existing collection', function () {
      before(function () {
        const project = {
          id: '2',
          display_name: 'Hello',
          slug: 'test/project'
        }
        const user = {
          login: 'test.user'
        }
        const snapshot = { project, user }
        rootStore = initStore(true, snapshot)
        sinon.stub(rootStore.client.collections, 'get').callsFake(function () {
          return Promise.resolve({ body: collections.mocks.responses.get.collection })
        })
        collectionsStore = rootStore.user.collections
      })

      after(function () {
        rootStore.client.collections.get.restore()
      })

      it('should fetch a collection', function (done) {
        expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

        collectionsStore.fetchFavourites()
          .then(function () {
            expect(collectionsStore.loadingState).to.equal(asyncStates.success)
            expect(collectionsStore.favourites.id).to.equal('1')
            expect(collectionsStore.favourites.display_name).to.equal('test collection')
          })
          .then(done, done)

        // Since this is run before fetch's thenable resolves, it should test
        // correctly during the request.
        expect(collectionsStore.loadingState).to.equal(asyncStates.loading)
      })
    })

    describe('without an existing collection', function () {
      before(function () {
        const project = {
          id: '2',
          display_name: 'Hello',
          slug: 'test/project'
        }
        const user = {
          login: 'test.user'
        }
        const snapshot = { project, user }
        rootStore = initStore(true, snapshot)
        sinon.stub(rootStore.client.collections, 'create').callsFake(function (payload) {
          const [ favourites ] = collections.mocks.responses.get.collection.collections
          const links = {
            project: payload.project,
            subjects: payload.subjects
          }
          const newCollection = Object.assign({}, favourites, payload.data, { links })
          const body = Object.assign({}, collections.mocks.responses.get.collection, { collections: [newCollection] })
          return Promise.resolve({ body })
        })
        sinon.stub(rootStore.client.collections, 'get').callsFake(function () {
          return Promise.resolve({ body: { collections: [] } })
        })
        collectionsStore = rootStore.user.collections
      })

      after(function () {
        rootStore.client.collections.create.restore()
        rootStore.client.collections.get.restore()
      })

      it('should create a new collection', function (done) {
        expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

        collectionsStore.fetchFavourites()
          .then(function () {
            const favourites = getSnapshot(collectionsStore.favourites)
            expect(collectionsStore.loadingState).to.equal(asyncStates.success)
            expect(rootStore.client.collections.create).to.have.been.calledOnce()
            expect(favourites.display_name).to.equal('Favorites test/project')
            expect(favourites.links.project).to.equal('2')
            expect(favourites.links.subjects).to.eql([])
          })
          .then(done, done)

        // Since this is run before fetch's thenable resolves, it should test
        // correctly during the request.
        expect(collectionsStore.loadingState).to.equal(asyncStates.loading)
      })
    })
  })

  describe('add favourites', function () {
    before(function () {
      const project = {
        id: '2',
        display_name: 'Hello',
        slug: 'test/project'
      }
      const links = {
        project: '1',
        subjects: []
      }
      const favourites = Object.assign({}, collections.mocks.resources.collection, { links })
      const user = {
        login: 'test.user',
        collections: { favourites }
      }
      const snapshot = { project, user }
      rootStore = initStore(true, snapshot)
      sinon.stub(rootStore.client.collections, 'addSubjects').callsFake(function (params) {
        const links = {
          project: '1',
          subjects: ['1', '2']
        }
        const newFavourites = Object.assign({}, favourites, { links })
        return Promise.resolve({ body: { collections: [ newFavourites ] } })
      })
      collectionsStore = rootStore.user.collections
    })

    after(function () {
      rootStore.client.collections.addSubjects.restore()
    })

    it('should add subjects to the favourites collection', async function () {
      await collectionsStore.addFavourites(['1', '2'])
      const favourites = getSnapshot(collectionsStore.favourites)
      const params = {
        authorization: 'Bearer ',
        id: favourites.id,
        subjects: ['1', '2']
      }
      expect(rootStore.client.collections.addSubjects).to.have.been.calledOnceWith(params)
      expect(favourites.links.subjects).to.eql(['1', '2'])
    })
  })

  describe('remove favourites', function () {
    before(function () {
      const project = {
        id: '2',
        display_name: 'Hello',
        slug: 'test/project'
      }
      const links = {
        project: '1',
        subjects: ['1', '2']
      }
      const favourites = Object.assign({}, collections.mocks.resources.collection, { links })
      const user = {
        login: 'test.user',
        collections: { favourites }
      }
      const snapshot = { project, user }
      rootStore = initStore(true, snapshot)
      sinon.stub(rootStore.client.collections, 'removeSubjects').callsFake(function (params) {
        const links = {
          project: '1',
          subjects: []
        }
        const newFavourites = Object.assign({}, favourites, { links })
        return Promise.resolve({ body: { collections: [ newFavourites ] } })
      })
      collectionsStore = rootStore.user.collections
    })

    after(function () {
      rootStore.client.collections.removeSubjects.restore()
    })

    it('should remove subjects from the favourites collection', async function () {
      await collectionsStore.removeFavourites(['1', '2'])
      const favourites = getSnapshot(collectionsStore.favourites)
      const params = {
        authorization: 'Bearer ',
        id: favourites.id,
        subjects: ['1', '2']
      }
      expect(rootStore.client.collections.removeSubjects).to.have.been.calledOnceWith(params)
    })
  })
})
