import { expect } from 'chai'
import sinon from 'sinon'
import { getSnapshot } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import { collections } from '@zooniverse/panoptes-js'
import Collections from './Collections'
import Store from './Store'
import initStore from './initStore'
import placeholderEnv from './helpers/placeholderEnv'

describe('stores > Collections', function () {
  let rootStore = Store.create({}, placeholderEnv)
  let collectionsStore = rootStore.collections
  let clientStub
  
  it('should exist', function () {
    expect(rootStore.collections).to.be.ok
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
        clientStub = {
          collections: {
            get: function () {
              return Promise.resolve({ body: collections.mocks.responses.get.collection})
            }
          }
        }
        rootStore = initStore(true, snapshot, clientStub)
        collectionsStore = rootStore.collections
      })

      it('should fetch a collection', function (done) {
        expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

        collectionsStore.fetchFavourites()
          .then(function () {
            expect(collectionsStore.loadingState).to.equal(asyncStates.success)
            expect(collectionsStore.favourites).to.be.ok
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
        clientStub = {
          collections: {
            create: sinon.stub().callsFake(function (payload) {
              const [ favourites ] = collections.mocks.responses.get.collection.collections
              const links = {
                project: payload.project,
                subjects: payload.subjects
              }
              const newCollection = Object.assign({}, favourites, payload.data, { links })
              const body = Object.assign({}, collections.mocks.responses.get.collection, { collections: [newCollection] })
              return Promise.resolve({ body })
            }),
            get: function () {
              return Promise.resolve({ body: { collections: [] } })
            }
          }
        }
        rootStore = initStore(true, snapshot, clientStub)
        collectionsStore = rootStore.collections
      })

      it('should create a new collection', function (done) {
        expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

        collectionsStore.fetchFavourites()
          .then(function () {
            const favourites = getSnapshot(collectionsStore.favourites)
            expect(collectionsStore.loadingState).to.equal(asyncStates.success)
            expect(clientStub.collections.create).to.have.been.calledOnce
            expect(collectionsStore.favourites).to.be.ok
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
      const user = {
        login: 'test.user'
      }
      const links = {
        project: '1',
        subjects: []
      }
      const favourites = Object.assign({}, collections.mocks.resources.collection, { links })
      const snapshot = { project, user, collections: { favourites } }
      clientStub = {
        collections: {
          addSubjects: sinon.stub().callsFake(function (params) {
            const links = {
              project: '1',
              subjects: ['1', '2']
            }
            const newFavourites = Object.assign({}, favourites, { links })
            return Promise.resolve({ body: { collections: [ newFavourites ]}})
          })
        }
      }
      rootStore = initStore(true, snapshot, clientStub)
      collectionsStore = rootStore.collections
    })

    it('should add subjects to the favourites collection', function (done) {
      collectionsStore.addFavourites(['1', '2'])
        .then( function () {
          const favourites = getSnapshot(collectionsStore.favourites)
          const params = {
            authorization: "Bearer ",
            collectionId: favourites.id,
            subjects: ['1', '2']
          }
          expect(clientStub.collections.addSubjects).to.have.been.calledOnceWith(params)
          expect(favourites.links.subjects).to.eql(['1', '2'])
        })
        .then(done, done)
    })
  })

  describe('remove favourites', function () {
    before(function () {
      const project = {
        id: '2',
        display_name: 'Hello',
        slug: 'test/project'
      }
      const user = {
        login: 'test.user'
      }
      const links = {
        project: '1',
        subjects: ['1', '2']
      }
      const favourites = Object.assign({}, collections.mocks.resources.collection, { links })
      const snapshot = { project, user, collections: { favourites } }
      clientStub = {
        collections: {
          removeSubjects: sinon.stub().callsFake(function (params) {
            const links = {
              project: '1',
              subjects: []
            }
            const newFavourites = Object.assign({}, favourites, { links })
            return Promise.resolve({ body: { collections: [ newFavourites ]}})
          })
        }
      }
      rootStore = initStore(true, snapshot, clientStub)
      collectionsStore = rootStore.collections
    })

    it('should remove subjects from the favourites collection', function (done) {
      collectionsStore.removeFavourites(['1', '2'])
        .then( function () {
          const favourites = getSnapshot(collectionsStore.favourites)
          const params = {
            authorization: "Bearer ",
            collectionId: favourites.id,
            subjects: ['1', '2']
          }
          expect(clientStub.collections.removeSubjects).to.have.been.calledOnceWith(params)
          expect(favourites.links.subjects).to.eql([])
        })
        .then(done, done)
    })
  })
})
