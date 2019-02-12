import { expect } from 'chai'
import sinon from 'sinon'
import { getSnapshot } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import { collections } from '@zooniverse/panoptes-js'
import Collections from './Collections'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('stores > Collections', function () {
  let rootStore = Store.create({}, placeholderEnv)
  
  it('should exist', function () {
    expect(rootStore.collections).to.be.ok
  })

  describe('fetchFavourites', function () {
    let collectionsStore = rootStore.collections

    it('should exist', function () {
      expect(collectionsStore.fetchFavourites).to.be.a('function')
    })

    describe('with an existing collection', function () {
      before(function () {
        const clientStub = {
          collections: {
            get: function () {
              return Promise.resolve({ body: collections.mocks.responses.get.collection})
            }
          }
        }
        rootStore = Store.create({}, { client: clientStub })
        collectionsStore = rootStore.collections
      })

      it('should fetch a collection', function (done) {
        expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

        collectionsStore.fetchFavourites({ id: '2', display_name: 'Hello' }, { login: 'test.user' })
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
      let clientStub

      before(function () {
        clientStub = {
          collections: {
            create: sinon.stub().callsFake(function (payload) {
              const [ favourites ] = collections.mocks.responses.get.collection.collections
              const links = {
                projects: payload.projects,
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
        rootStore = Store.create({}, { client: clientStub })
        collectionsStore = rootStore.collections
      })

      it('should create a new collection', function (done) {
        expect(collectionsStore.loadingState).to.equal(asyncStates.initialized)

        collectionsStore.fetchFavourites({ id: '2', display_name: 'Hello', slug: 'test/project' }, { login: 'test.user' })
          .then(function () {
            const favourites = getSnapshot(collectionsStore.favourites)
            expect(collectionsStore.loadingState).to.equal(asyncStates.success)
            expect(clientStub.collections.create).to.have.been.calledOnce
            expect(collectionsStore.favourites).to.be.ok
            expect(favourites.display_name).to.equal('Favourites test/project')
            expect(favourites.links.projects).to.eql(['2'])
            expect(favourites.links.subjects).to.eql([])
          })
          .then(done, done)

        // Since this is run before fetch's thenable resolves, it should test
        // correctly during the request.
        expect(collectionsStore.loadingState).to.equal(asyncStates.loading)
      })
    })
  })
})
