import sinon from 'sinon'
import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import SubjectStore, { openTalkPage } from './SubjectStore'
import WorkflowStore from './WorkflowStore'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '../../test/factories'
import { Factory } from 'rosie'

let rootStore

const project = ProjectFactory.build()
const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
const subjects = Factory.buildList('subject', 10)

const clientStub = {
  panoptes: {
    get () {
      return Promise.resolve({
        body: {
          subjects
        }
      })
    }
  }
}

describe('Model > SubjectStore', function () {
  function setupStores (rootStore) {
    sinon.stub(rootStore.classifications, 'createClassification')
    rootStore.projects.setResource(project)
    rootStore.workflows.setResource(workflow)
    rootStore.workflows.setActive(workflow.id)
  }
  describe('Actions > advance', function () {
    before(function () {
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        { client: clientStub }
      )
    })

    it('should make the next subject in the queue active when calling `advance()`', function (done) {
      setupStores(rootStore)
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        rootStore.subjects.advance()
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        expect(rootStore.subjects.resources.get('1')).to.be.undefined
      }).then(done, done)
    })

    describe('with less than three subjects in the queue', function () {
      let populateSpy

      before(function () {
        populateSpy = sinon.spy(rootStore.subjects, 'populateQueue')
        while (rootStore.subjects.resources.size > 2) {
          rootStore.subjects.advance()
        }
      })

      after(function () {
        rootStore.subjects.populateQueue.restore()
      })

      it('should request more subjects', function () {
        expect(populateSpy).to.have.been.calledOnce
      })
    })

    describe('after emptying the queue', function () {
      before(function () {
        sinon.stub(clientStub.panoptes, 'get').callsFake(() => Promise.resolve({ body: [] }))
        while (rootStore.subjects.resources.size > 0) {
          rootStore.subjects.advance()
        }
      })

      after(function () {
        clientStub.panoptes.get.restore()
      })

      it('should leave the active subject empty', function () {
        expect(rootStore.subjects.resources.size).to.equal(0)
        expect(rootStore.subjects.active).to.be.undefined
      })
    })
  })

  describe('Views > isThereMetadata', function (done) {
    it('should return false when there is not an active queue subject', function () {
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        { client: {
          panoptes: {
            get: () => {
              return Promise.resolve({
                body: { subjects: [] }
              })
            }
          }
        }
        }
      )

      setupStores(rootStore)
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.isThereMetadata).to.be.false
      }).then(done, done)
    })

    it('should return false if the active subject does not have metadata', function (done) {
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        { client: clientStub }
      )

      setupStores(rootStore)
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.toJSON().metadata)).to.have.lengthOf(0)
        expect(rootStore.subjects.isThereMetadata).to.be.false
      }).then(done, done)
    })

    it('should return false if the active subject only has hidden metadata', function (done) {
      const subjectWithHiddenMetadata = SubjectFactory.build({ metadata: { '#foo': 'bar' } })
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        {
          client: {
            panoptes: {
              get: () => {
                return Promise.resolve({
                  body: { subjects: [subjectWithHiddenMetadata] }
                })
              }
            }
          }
        }
      )

      setupStores(rootStore)
      rootStore.subjects.populateQueue().then(() => {
        const metadataKeys = Object.keys(rootStore.subjects.active.toJSON().metadata)
        expect(metadataKeys).to.have.lengthOf(1)
        expect(metadataKeys[0]).to.equal('#foo')
        expect(rootStore.subjects.isThereMetadata).to.be.false
      }).then(done, done)
    })

    it('should return true if the active subject has metadata', function (done) {
      const subjectWithMetadata = SubjectFactory.build({ metadata: { foo: 'bar' } })
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        {
          client: {
            panoptes: {
              get: () => {
                return Promise.resolve({
                  body: { subjects: [subjectWithMetadata] }
                })
              }
            }
          }
        }
      )

      setupStores(rootStore)
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.toJSON().metadata)).to.have.lengthOf(1)
        expect(rootStore.subjects.isThereMetadata).to.be.true
      }).then(done, done)
    })
  })

  describe('openTalkPage', function () {
    let originalLocation
    const talkURL = 'https://example.org/projects/zooniverse/test-project/talk/123456'

    before(function () {
      originalLocation = window.location
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.org',
          assign: sinon.stub().callsFake(url => console.log(url))
        },
        writable: true
      })
    })

    after(function () {
      window.location = originalLocation
      Object.defineProperty(window, 'location', {
        writable: false
      })
    })

    describe('in the same tab', function () {
      before(function () {
        openTalkPage(talkURL, false)
      })

      it('should open a Talk URL', function () {
        expect(window.location.assign.withArgs(talkURL)).to.have.been.calledOnce
      })
    })

    describe('in a new tab', function () {
      let newTab = {
        opener: null,
        location: null,
        target: null,
        focus: sinon.stub()
      }

      before(function () {
        window.open = sinon.stub().callsFake(() => newTab)
        openTalkPage(talkURL, true)
      })

      after(function () {
        window.location.assign.resetHistory()
      })

      it('should open a new tab', function () {
        expect(newTab.target).to.equal('_blank')
      })

      it('should open a Talk URL', function () {
        expect(newTab.location).to.equal(talkURL)
      })

      it('should switch focus to the new tab', function () {
        expect(newTab.focus).to.have.been.calledOnce
      })
    })
  })
})
