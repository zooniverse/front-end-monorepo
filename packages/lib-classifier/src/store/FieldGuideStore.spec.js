import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from './RootStore'
import ProjectStore from './ProjectStore'
import FieldGuideStore from './FieldGuideStore'

import {
  ProjectFactory,
  FieldGuideFactory,
  FieldGuideMediumFactory
} from '../../test/factories'

const medium = FieldGuideMediumFactory.build()
const fieldGuide = FieldGuideFactory.build()
const fieldGuideWithItems = FieldGuideFactory.build({ items: [
  { 
    content: 'All about cats',
    icon: medium.id,
    title: 'Cats'
  }
]})

const fieldGuideWithoutIcon = FieldGuideFactory.build({
  items: [
    {
      content: 'All about cats',
      title: 'Cats'
    }
  ]
})

const project = ProjectFactory.build()

describe('Model > FieldGuideStore', function () {
  let rootStore
  function fetchFieldGuide () {
    sinon.stub(rootStore.fieldGuide, 'fetchFieldGuide')
    rootStore.projects.setResource(project)
    return rootStore.projects.setActive(project.id)
      .then(() => {
        rootStore.fieldGuide.fetchFieldGuide.restore()
        return rootStore.fieldGuide.fetchFieldGuide()
      })
  }

  it('should exist', function () {
    expect(FieldGuideStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no project', function () {
    rootStore = RootStore.create({
      fieldGuide: FieldGuideStore.create(),
      projects: ProjectStore.create()
    }, { client: { panoptes: { get: sinon.stub().callsFake(() => Promise.resolve(null) )}} })

    expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
    expect(rootStore.client.panoptes.get).to.not.been.called
  })

  it('should set the field guide if there is a project', function (done) {
    rootStore = RootStore.create({
      fieldGuide: FieldGuideStore.create(),
      projects: ProjectStore.create()
    }, { 
      client: { 
        panoptes: {
          get: sinon.stub().callsFake((url) => {
            if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
            if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
          })
        }
      }
    })

    fetchFieldGuide()
      .then(() => {
        const fieldGuideInStore = rootStore.fieldGuide.active
        expect(fieldGuideInStore.toJSON()).to.deep.equal(fieldGuide)
      }).then(done, done)
  })

  describe('Actions > fetchFieldGuide', function () {
    it('should request for a field guide linked to the active project', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, { 
        client: {
          panoptes: {
            get: sinon.stub().callsFake((url) => {
              if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
              if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            })
          }
        } 
      })

      fetchFieldGuide()
        .then(() => {
          expect(rootStore.client.panoptes.get.withArgs('/field_guides', { project_id: project.id })).to.have.been.calledOnce          
        }).then(done, done)
    })

    it('should not request for media or set the resources if there are not a field guide in the response', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, { 
        client: {
          panoptes: {
            get: sinon.stub().callsFake((url) => {
              if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [] } })
              if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
            })
          }
        } 
      })

      const setResourceSpy = sinon.spy(rootStore.fieldGuide, 'setResource')

      fetchFieldGuide()
        .then(() => {
          expect(setResourceSpy).to.have.not.been.called
          expect(rootStore.fieldGuide.loadingState).to.equal(asyncStates.success)
        }).then(() => {
          setResourceSpy.restore()
        }).then(done, done)
    })

    it('should request for the media if there is a field guide', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
                if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
              })
            }
          }
        })
      sinon.stub(rootStore.fieldGuide, 'fetchFieldGuide')

      rootStore.projects.setResource(project)
      rootStore.projects.setActive(project.id)
        .then(() => rootStore.client.panoptes.get.resetHistory())
        .then(() => {
          rootStore.fieldGuide.fetchFieldGuide.restore()
          return rootStore.fieldGuide.fetchFieldGuide()
        })
        .then(() => {
          expect(rootStore.client.panoptes.get.withArgs(`/field_guides/${fieldGuide.id}/attached_images`)).to.have.been.calledOnce
        }).then(done, done)
    })

    it('should call setResource and setActive if there is a field guide', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
                if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
              })
            }
          }
        })

      const setResourceSpy = sinon.spy(rootStore.fieldGuide, 'setResource')
      const setActiveSpy = sinon.spy(rootStore.fieldGuide, 'setActive')

      fetchFieldGuide()
        .then(() => {
          expect(setResourceSpy).to.have.been.calledOnceWith(fieldGuide)
          expect(setActiveSpy).to.have.been.calledOnceWith(fieldGuide.id)
        }).then(() => {
          setResourceSpy.restore()
          setActiveSpy.restore()
        }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
        client: {
          panoptes: {
            get: sinon.stub().callsFake(() => {
              return Promise.reject('testing error state')
            })
          }
        }
      })

      fetchFieldGuide()
        .then(() => {
          expect(rootStore.fieldGuide.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })
  })

  describe('Actions > fetchMedia', function () {
    it('should not call setMediaResources if there is no media in the response', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuide] } })
                if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
              })
            }
          }
        })

      const setMediaResourcesSpy = sinon.spy(rootStore.fieldGuide, 'setMediaResources')

      fetchFieldGuide()
        .then(() => {
          expect(setMediaResourcesSpy).to.have.not.been.called
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })

    it('should call setMediaResources if there is media in the response', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
        client: {
          panoptes: {
            get: sinon.stub().callsFake((url) => {
              if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
              if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
            })
          }
        }
      })

      const setMediaResourcesSpy = sinon.spy(rootStore.fieldGuide, 'setMediaResources')

      fetchFieldGuide()
        .then(() => {
          expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })
  })

  describe('Actions > setModalVisibility', function () {
    it('should set the modal visibility', function () {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
                if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
              })
            }
          }
        })

      rootStore.fieldGuide.setModalVisibility(true)
      expect(rootStore.fieldGuide.showModal).to.be.true
      rootStore.fieldGuide.setModalVisibility(false)
      expect(rootStore.fieldGuide.showModal).to.be.false
    })
  })

  describe('Actions > setActiveItem', function () {
    it('should not set the active item if there is no field guide', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [] } })
                if (url === `/field_guides/${fieldGuide.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
              })
            }
          }
        })

      fetchFieldGuide().then(() => {
        rootStore.fieldGuide.setActiveItem(0)
        expect(rootStore.fieldGuide.activeItem).to.be.undefined
        expect(rootStore.fieldGuide.activeMedium).to.be.undefined
      }).then(done, done)
    })

    it('should not set the active item if not called with an item index', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
                if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
              })
            }
          }
        })

      fetchFieldGuide().then(() => {
        rootStore.fieldGuide.setActiveItem()
        expect(rootStore.fieldGuide.activeItem).to.be.undefined
        expect(rootStore.fieldGuide.activeMedium).to.be.undefined
      }).then(done, done)
    })

    it('should not set the active item if the item does not exist', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
                if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
              })
            }
          }
        })

      fetchFieldGuide().then(() => {
        rootStore.fieldGuide.setActiveItem(1)
        expect(rootStore.fieldGuide.activeItem).to.be.undefined
        expect(rootStore.fieldGuide.activeMedium).to.be.undefined
      }).then(done, done)
    })

    it('should set the active item', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
                if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
              })
            }
          }
        })

      fetchFieldGuide()
        .then(() => {
          rootStore.fieldGuide.setActiveItem(0)
          expect(rootStore.fieldGuide.activeItem).to.equal(0)
          expect(rootStore.fieldGuide.activeMedium.toJSON()).to.deep.equal(medium)
        }).then(done, done)
    })

    it('should not set the active medium if the item does not have an icon', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithoutIcon] } })
                if (url === `/field_guides/${fieldGuideWithoutIcon.id}/attached_images`) return Promise.resolve({ body: { media: [] } })
              })
            }
          }
        })

      fetchFieldGuide().then(() => {
        rootStore.fieldGuide.setActiveItem(0)
        expect(rootStore.fieldGuide.activeItem).to.equal(0)
        expect(rootStore.fieldGuide.activeMedium).to.be.undefined
      }).then(done, done)
    })
  })

  describe('Actions > reset', function () {
    it('should reset the store', function (done) {
      rootStore = RootStore.create({
        fieldGuide: FieldGuideStore.create(),
        projects: ProjectStore.create()
      }, {
          client: {
            panoptes: {
              get: sinon.stub().callsFake((url) => {
                if (url === '/field_guides') return Promise.resolve({ body: { field_guides: [fieldGuideWithItems] } })
                if (url === `/field_guides/${fieldGuideWithItems.id}/attached_images`) return Promise.resolve({ body: { media: [medium] } })
              })
            }
          }
        })

      fetchFieldGuide()
        .then(() => {
          rootStore.fieldGuide.setActiveItem(0)
          rootStore.fieldGuide.setModalVisibility(true)
        })
        .then(() => {
          expect(rootStore.fieldGuide.active).to.exist
          expect(rootStore.fieldGuide.resources).to.exist
          expect(rootStore.fieldGuide.attachedMedia).to.exist
          expect(rootStore.fieldGuide.activeMedium).to.exist
          expect(rootStore.fieldGuide.activeItem).to.equal(0)
          expect(rootStore.fieldGuide.showModal).to.be.true
          return rootStore.fieldGuide.reset()
        }).then(() => {
          expect(rootStore.fieldGuide.active).to.be.undefined
          expect(rootStore.fieldGuide.resources.size).to.equal(0)
          expect(rootStore.fieldGuide.attachedMedia.size).to.equal(0)
          expect(rootStore.fieldGuide.activeMedium).to.be.undefined
          expect(rootStore.fieldGuide.activeItem).to.be.undefined
          expect(rootStore.fieldGuide.showModal).to.be.false
        }).then(done, done)
    })
  })
})