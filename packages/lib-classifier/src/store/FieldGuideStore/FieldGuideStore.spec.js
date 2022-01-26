import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { applySnapshot } from 'mobx-state-tree'

import FieldGuideStore from './FieldGuideStore'
import ProjectStore from '@store/ProjectStore'

import {
  ProjectFactory,
  FieldGuideFactory,
  FieldGuideMediumFactory
} from '@test/factories'
import mockStore from '@test/mockStore'

describe('Model > FieldGuideStore', function () {
  const medium = FieldGuideMediumFactory.build()
  const fieldGuide = FieldGuideFactory.build()
  const fieldGuideWithItems = FieldGuideFactory.build({
    items: [
      {
        content: 'All about cats',
        icon: medium.id,
        title: 'Cats'
      },
      {
        content: 'All about dogs',
        title: 'Dogs'
      }
    ]
  })

  const fieldGuideWithoutIcon = FieldGuideFactory.build({
    items: [
      {
        content: 'All about cats',
        title: 'Cats'
      }
    ]
  })

  const project = ProjectFactory.build()

  function setupStores (clientStub) {
    const store = mockStore({ project, client: clientStub })

    return store.fieldGuide
  }

  it('should exist', function () {
    expect(FieldGuideStore).to.be.an('object')
  })

  describe('when there isn\'t a project', function () {
    it('should remain in an initialized state', function () {
      const panoptesClientStub = { panoptes: { get: sinon.stub().callsFake(() => Promise.resolve({ body: { projects: []} })) } }
      const store = mockStore()
      store.client.panoptes = panoptesClientStub.panoptes
      applySnapshot(store.projects, { active: undefined, resources: {}})
      expect(store.fieldGuide.loadingState).to.equal(asyncStates.loading)
      expect(store.client.panoptes.get).to.have.not.been.called()
    })
  })

  describe('when there is a project', function () {
    it('should set the field guide', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.loadingState).to.equal(asyncStates.loading)
      expect(fieldGuideStore.active).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id).then(() => {
        const fieldGuideInStore = fieldGuideStore.active
        expect(fieldGuideInStore.id).to.deep.equal(fieldGuide.id)
        expect(fieldGuideStore.loadingState).to.equal(asyncStates.success)
      }).then(done, done)
    })
  })

  describe('Actions > fetchFieldGuide', function () {
    it('should request for a field guide linked to the active project', function () {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: {} })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)
      const fetchStub = panoptesClientStub.panoptes.get.withArgs('/field_guides', { project_id: project.id })
      expect(fetchStub).to.have.been.calledOnce()
    })

    it('should not request for media or set the resources if there are not a field guide in the response', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.loadingState).to.equal(asyncStates.loading)

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          expect(fieldGuideStore.loadingState).to.equal(asyncStates.success)
        })
        .then(done, done)
    })

    it.skip('should request for the media if there is a field guide', function () {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)
      const fetchStub = panoptesClientStub.panoptes.get.withArgs(`/field_guides/${fieldGuide.id}/attached_images`)

      expect(fetchStub).to.have.been.calledOnce()
    })

    it.skip('should call setResources and setActive if there is a field guide', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      const setResourcesSpy = sinon.spy(fieldGuideStore, 'setResources')
      const setActiveSpy = sinon.spy(fieldGuideStore, 'setActive')

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          expect(setResourcesSpy).to.have.been.calledOnceWith([fieldGuide])
          expect(setActiveSpy).to.have.been.calledOnceWith(fieldGuide.id)
        }).then(() => {
          setResourcesSpy.restore()
          setActiveSpy.restore()
        }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake(() => {
            return Promise.reject(new Error('testing error state'))
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)
      expect(fieldGuideStore.loadingState).to.equal(asyncStates.loading)

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          expect(fieldGuideStore.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })
  })

  describe.skip('Actions > fetchMedia', function () {
    it('should not call setMediaResources if there is no media in the response', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      const setMediaResourcesSpy = sinon.spy(fieldGuideStore, 'setMediaResources')

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          expect(setMediaResourcesSpy).to.have.not.been.called()
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })

    it.skip('should call setMediaResources if there is media in the response', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      const setMediaResourcesSpy = sinon.spy(fieldGuideStore, 'setMediaResources')

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })
  })

  describe('Actions > setModalVisibility', function () {
    it('should set the modal visibility', function () {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }

      const fieldGuideStore = setupStores(panoptesClientStub)
      expect(fieldGuideStore.showModal).to.be.false()
      fieldGuideStore.setModalVisibility(true)
      expect(fieldGuideStore.showModal).to.be.true()
      fieldGuideStore.setModalVisibility(false)
      expect(fieldGuideStore.showModal).to.be.false()
    })
  })

  describe('Actions > setActiveItemIndex', function () {
    it('should not set the active item if there is no field guide', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.activeItemIndex).to.be.undefined()
      expect(fieldGuideStore.activeMedium).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id).then(() => {
        fieldGuideStore.setActiveItemIndex(0)
        expect(fieldGuideStore.activeItemIndex).to.be.undefined()
        expect(fieldGuideStore.activeMedium).to.be.undefined()
      }).then(done, done)
    })

    it('should not set the active item if not called with an item index', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.activeItemIndex).to.be.undefined()
      expect(fieldGuideStore.activeMedium).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id).then(() => {
        fieldGuideStore.setActiveItemIndex()
        expect(fieldGuideStore.activeItemIndex).to.be.undefined()
        expect(fieldGuideStore.activeMedium).to.be.undefined()
      }).then(done, done)
    })

    it('should not set the active item if the item does not exist', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.activeItemIndex).to.be.undefined()
      expect(fieldGuideStore.activeMedium).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id).then(() => {
        fieldGuideStore.setActiveItemIndex(2)
        expect(fieldGuideStore.activeItemIndex).to.be.undefined()
        expect(fieldGuideStore.activeMedium).to.be.undefined()
      }).then(done, done)
    })

    it('should set the active item', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.activeItemIndex).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          fieldGuideWithItems.items.forEach((item, index) => {
            fieldGuideStore.setActiveItemIndex(index)
            expect(fieldGuideStore.activeItemIndex).to.equal(index)
          })
        }).then(done, done)
    })

    it('should set the active medium if the item has an icon', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.activeMedium).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          fieldGuideStore.setActiveItemIndex(0)
          expect(fieldGuideStore.activeMedium.toJSON()).to.deep.equal(medium)
        }).then(done, done)
    })

    it('should not set the active medium if the item does not have an icon', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithoutIcon] } })
            if (url === `/field_guides/${fieldGuideWithoutIcon.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      expect(fieldGuideStore.activeItemIndex).to.be.undefined()
      expect(fieldGuideStore.activeMedium).to.be.undefined()

      fieldGuideStore.fetchFieldGuide(project.id).then(() => {
        fieldGuideStore.setActiveItemIndex(0)
        expect(fieldGuideStore.activeItemIndex).to.equal(0)
        expect(fieldGuideStore.activeMedium).to.be.undefined()
      }).then(done, done)
    })
  })

  describe('Actions > reset', function () {
    it('should reset the store', function (done) {
      const panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
            if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            return Promise.resolve({ body: null })
          })
        }
      }
      const fieldGuideStore = setupStores(panoptesClientStub)

      fieldGuideStore.fetchFieldGuide(project.id)
        .then(() => {
          fieldGuideStore.setActiveItemIndex(0)
          fieldGuideStore.setModalVisibility(true)
        })
        .then(() => {
          expect(fieldGuideStore.active.id).to.equal(fieldGuideWithItems.id)
          expect(fieldGuideStore.resources.size).to.equal(1)
          expect(fieldGuideStore.attachedMedia.size).to.equal(1)
          expect(fieldGuideStore.activeMedium.id).to.equal(medium.id)
          expect(fieldGuideStore.activeItemIndex).to.equal(0)
          expect(fieldGuideStore.showModal).to.be.true()
          return fieldGuideStore.reset()
        }).then(() => {
          expect(fieldGuideStore.active).to.be.undefined()
          expect(fieldGuideStore.resources.size).to.equal(0)
          expect(fieldGuideStore.attachedMedia.size).to.equal(0)
          expect(fieldGuideStore.activeMedium).to.be.undefined()
          expect(fieldGuideStore.activeItemIndex).to.be.undefined()
          expect(fieldGuideStore.showModal).to.be.false()
        }).then(done, done)
    })
  })
})
