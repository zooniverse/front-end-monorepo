import sinon from 'sinon'
import RootStore from './RootStore'
import { openTalkPage } from './SubjectStore'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '../../test/factories'
import { Factory } from 'rosie'
import stubPanoptesJs from '../../test/stubPanoptesJs'

const project = ProjectFactory.build()
const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
const subjects = Factory.buildList('subject', 10)

const clientStub = stubPanoptesJs({ subjects, workflows: workflow })

describe.only('Model > SubjectStore', function () {
  function setupStores(panoptesClientStub = clientStub) {
    const store = RootStore.create({
      classifications: {},
      dataVisAnnotating: {},
      drawing: {},
      feedback: {},
      fieldGuide: {},
      subjectViewer: {},
      tutorials: {},
      workflowSteps: {},
      userProjectPreferences: {}
    }, {
        client: panoptesClientStub,
        authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
      })
    store.projects.setResource(project)
    store.projects.setActive(project.id)
    store.workflows.setResource(workflow)
    store.workflows.setActive(workflow.id)
    return store
  }
  describe('Actions > advance', function () {
    it('should make the next subject in the queue active when calling `advance()`', function (done) {
      const rootStore = setupStores()
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        rootStore.subjects.advance()
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        expect(rootStore.subjects.resources.get('1')).to.be.undefined()
      }).then(done, done)
    })

    describe('with less than three subjects in the queue', function () {
      let populateSpy
      let rootStore

      before(function () {
        rootStore = setupStores()
        populateSpy = sinon.spy(rootStore.subjects, 'populateQueue')
      })

      after(function () {
        rootStore.subjects.populateQueue.restore()
        rootStore = null
      })

      it('should request more subjects', function () {
        while (rootStore.subjects.resources.size > 2) {
          rootStore.subjects.advance()
        }
        expect(populateSpy).to.have.been.calledOnce()
      })
    })

    describe('after emptying the queue', function () {
      let rootStore
      before(function () {
        sinon.stub(clientStub.panoptes, 'get').callsFake(() => Promise.resolve({ body: [] }))
        rootStore = setupStores()
      })

      after(function () {
        clientStub.panoptes.get.restore()
        rootStore = null
      })

      it('should leave the active subject empty', function () {
        while (rootStore.subjects.resources.size > 0) {
          rootStore.subjects.advance()
        }
        expect(rootStore.subjects.resources.size).to.equal(0)
        expect(rootStore.subjects.active).to.be.undefined()
      })
    })
  })

  describe('Views > isThereMetadata', function () {
    let rootStore
    afterEach(function () {
      rootStore = null
    })

    it('should return false when there is not an active queue subject', function (done) {
      const getStub = stubPanoptesJs({ subjects: [] })

      rootStore = setupStores(getStub)
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return false if the active subject does not have metadata', function (done) {
      rootStore = setupStores()
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.metadata)).to.have.lengthOf(0)
        expect(rootStore.subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return false if the active subject only has hidden metadata', function (done) {
      const subjectWithHiddenMetadata = SubjectFactory.build({ metadata: { '#foo': 'bar' } })
      const getStub = stubPanoptesJs({ subjects: subjectWithHiddenMetadata })

      rootStore = setupStores(getStub)
      rootStore.subjects.populateQueue().then(() => {
        const metadataKeys = Object.keys(rootStore.subjects.active.metadata)
        expect(metadataKeys).to.have.lengthOf(1)
        expect(metadataKeys[0]).to.equal('#foo')
        expect(rootStore.subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return true if the active subject has metadata', function (done) {
      const subjectWithMetadata = SubjectFactory.build({ metadata: { foo: 'bar' } })
      const getStub = stubPanoptesJs({ subjects: subjectWithMetadata })

      rootStore = setupStores(getStub)
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.metadata)).to.have.lengthOf(1)
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