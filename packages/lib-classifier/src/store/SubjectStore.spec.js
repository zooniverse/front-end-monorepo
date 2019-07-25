import sinon from 'sinon'
import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import SubjectStore, { openTalkPage, MINIMUM_QUEUE_SIZE } from './SubjectStore'
import WorkflowStore from './WorkflowStore'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '../../test/factories'
import { Factory } from 'rosie'

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
  function setupStores () {
    const projects = ProjectStore.create()
    const subjects = SubjectStore.create()
    const workflows = WorkflowStore.create()
    const store = RootStore.create(
      { projects, subjects, workflows },
      { client: clientStub }
    )
    sinon.stub(store.classifications, 'createClassification')
    store.projects.setResource(project)
    store.workflows.setResource(workflow)
    store.workflows.setActive(workflow.id)
    return store
  }

  describe('Actions > advance', function () {
    let rootStore

    before(function () {
      rootStore = setupStores()
    })

    it('should make the next subject in the queue active', function (done) {
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        rootStore.subjects.advance()
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        expect(rootStore.subjects.resources.get('1')).to.be.undefined()
      }).then(done, done)
    })

    it('should reduce the queue size by one', function (done) {
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.resources.size).to.equal(10)
        rootStore.subjects.advance()
        expect(rootStore.subjects.resources.size).to.equal(9)
      }).then(done, done)
    })

    describe(`with less than ${MINIMUM_QUEUE_SIZE} subjects in the queue`, function () {
      let populateSpy

      before(function () {
        populateSpy = sinon.spy(rootStore.subjects, 'populateQueue')
        while (rootStore.subjects.resources.size >= MINIMUM_QUEUE_SIZE) {
          rootStore.subjects.advance()
        }
        rootStore.subjects.advance()
      })

      after(function () {
        rootStore.subjects.populateQueue.restore()
      })

      it('should request more subjects', function () {
        expect(populateSpy).to.have.been.calledOnce()
      })
    })

    describe('when the queue is not refilled', function () {
      before(function () {
        sinon.stub(clientStub.panoptes, 'get').callsFake(() => Promise.resolve({ body: { subjects: [] } }))
      })

      after(function () {
        clientStub.panoptes.get.restore()
      })

      it('should advance until empty without crashing', function () {
        expect(rootStore.subjects.resources.size).to.equal(10)
        while (rootStore.subjects.resources.size > 0) {
          rootStore.subjects.advance()
        }
        expect(rootStore.subjects.resources.size).to.equal(0)
        expect(rootStore.subjects.active).to.be.undefined()
      })

      it('should remain empty without crashing', function () {
        expect(rootStore.subjects.resources.size).to.equal(0)
        rootStore.subjects.advance()
        expect(rootStore.subjects.resources.size).to.equal(0)
        expect(rootStore.subjects.active).to.be.undefined()
      })
    })
  })

  describe('Views > isThereMetadata', function (done) {

    it('should return false when there is not an active queue subject', function () {
      const rootStore = setupStores()
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return false if the active subject does not have metadata', function (done) {
      const rootStore = setupStores()
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.toJSON().metadata)).to.have.lengthOf(0)
        expect(rootStore.subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return false if the active subject only has hidden metadata', function (done) {
      const rootStore = setupStores()
      const subjectWithHiddenMetadata = SubjectFactory.build({ metadata: { '#foo': 'bar' } })
      rootStore.client.panoptes.get = () => {
        return Promise.resolve({
          body: { subjects: [subjectWithHiddenMetadata] }
        })
      }
      rootStore.subjects.populateQueue().then(() => {
        const metadataKeys = Object.keys(rootStore.subjects.active.toJSON().metadata)
        expect(metadataKeys).to.have.lengthOf(1)
        expect(metadataKeys[0]).to.equal('#foo')
        expect(rootStore.subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return true if the active subject has metadata', function (done) {
      const rootStore = setupStores()
      const subjectWithMetadata = SubjectFactory.build({ metadata: { foo: 'bar' } })
      rootStore.client.panoptes.get = () => {
        return Promise.resolve({
          body: { subjects: [subjectWithMetadata] }
        })
      }
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.toJSON().metadata)).to.have.lengthOf(1)
        expect(rootStore.subjects.isThereMetadata).to.be.true()
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
        expect(window.location.assign.withArgs(talkURL)).to.have.been.calledOnce()
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
        expect(newTab.focus).to.have.been.calledOnce()
      })
    })
  })
})
