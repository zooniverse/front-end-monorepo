import sinon from 'sinon'
import RootStore from './RootStore'
import { openTalkPage, MINIMUM_QUEUE_SIZE } from './SubjectStore'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '../../test/factories'
import { Factory } from 'rosie'
import stubPanoptesJs from '../../test/stubPanoptesJs'

describe('Model > SubjectStore', function () {
  const longListSubjects = Factory.buildList('subject', 10)
  const shortListSubjects = Factory.buildList('subject', 2)

  function mockSubjectStore(subjects) {
    const project = ProjectFactory.build()
    const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
    const client = stubPanoptesJs({ subjects, workflows: workflow })
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
        client,
        authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
    })
    sinon.spy(store.subjects, 'populateQueue')

    store.projects.setResource(project)
    store.projects.setActive(project.id)
    store.workflows.setResource(workflow)
    store.workflows.setActive(workflow.id)
    return store.subjects
  }

  describe('Actions > advance', function () {
    describe('with a full queue', function () {
      const subjects = mockSubjectStore(longListSubjects)
      let previousSubjectID
      let initialSize

      before(function () {
        previousSubjectID = subjects.active && subjects.active.id
        initialSize = subjects.resources.size
        subjects.advance()
      })

      it('should make the next subject in the queue active', function () {
        const currentSubjectID = subjects.active && subjects.active.id
        expect(currentSubjectID).to.equal(longListSubjects[1].id)
      })

      it('should reduce the queue size by one', function () {
        expect(subjects.resources.size).to.equal(initialSize - 1)
      })

      it('should remove the active subject from the queue', function () {
        expect(subjects.resources.get(previousSubjectID)).to.be.undefined()
      })

      it('should change the active subject', function () {
        const currentSubjectID = subjects.active && subjects.active.id
        expect(currentSubjectID).to.not.equal(previousSubjectID)
      })
    })

    describe('with less than three subjects in the queue', function () {
      describe('when the initial response has ten subjects', function () {
        const subjects = mockSubjectStore(longListSubjects)

        it('should request more subjects', function () {
          while (subjects.resources.size > MINIMUM_QUEUE_SIZE) {
            subjects.advance()
          }
          subjects.advance()
          // Once for initialization and once after the queue has been advanced to less than 3 subjects
          expect(subjects.populateQueue).to.have.been.calledTwice()
        })
      })

      describe('when the initial response has less than three subjects', function () {
        const subjects = mockSubjectStore(shortListSubjects)

        it('should request more subjects', function () {
          // Once for initialization and again since less than three subjects in initial response
          expect(subjects.populateQueue).to.have.been.calledTwice()
        })
      })

      describe('when the initial response has no subjects', function () {
        const subjects = mockSubjectStore([])

        it('should request more subjects', function () {
          // Once for initialization
          expect(subjects.populateQueue).to.have.been.calledOnce()
        })

        it('should not advance the queue', function () {
          expect(subjects.resources.size).to.equal(0)
          expect(subjects.active).to.be.undefined()
        })
      })
    })

    describe('after emptying the queue', function () {
      const subjects = mockSubjectStore(longListSubjects)

      beforeEach(function () {
        while (subjects.resources.size > 0) {
          subjects.advance()
        }
      })

      it('should leave the active subject empty', function () {
        expect(subjects.resources.size).to.equal(0)
        expect(subjects.active).to.be.undefined()
      })
    })
  })

  describe('Actions > append', function () {
    const subjects = mockSubjectStore([])

    before(function () {
      subjects.append(shortListSubjects)
      subjects.append(longListSubjects)
    })

    it('should increase the size of the queue', function () {
      expect(subjects.resources.size).to.equal(shortListSubjects.length + longListSubjects.length)
    })

    it('should add new subjects to the end of the queue', function () {
      const initialSubjectIDs = shortListSubjects.map(subject => subject.id)
      const newSubjectIDs = longListSubjects.map(subject => subject.id)
      const queue = Array.from(subjects.resources.keys())
      expect(queue).to.deep.equal([...initialSubjectIDs, ...newSubjectIDs])
    })
  })

  describe('Views > isThereMetadata', function () {
    it('should return false when there is not an active queue subject', function (done) {
      const subjects = mockSubjectStore([])
      subjects.populateQueue().then(() => {
        expect(subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return false if the active subject does not have metadata', function (done) {
      const subjects = mockSubjectStore(longListSubjects)
      subjects.populateQueue().then(() => {
        expect(Object.keys(subjects.active.metadata)).to.have.lengthOf(0)
        expect(subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return false if the active subject only has hidden metadata', function (done) {
      const subjectWithHiddenMetadata = SubjectFactory.build({ metadata: { '#foo': 'bar' } })

      const subjects = mockSubjectStore(subjectWithHiddenMetadata )
      subjects.populateQueue().then(() => {
        const metadataKeys = Object.keys(subjects.active.metadata)
        expect(metadataKeys).to.have.lengthOf(1)
        expect(metadataKeys[0]).to.equal('#foo')
        expect(subjects.isThereMetadata).to.be.false()
      }).then(done, done)
    })

    it('should return true if the active subject has metadata', function (done) {
      const subjectWithMetadata = SubjectFactory.build({ metadata: { foo: 'bar' } })

      const subjects = mockSubjectStore(subjectWithMetadata)
      subjects.populateQueue().then(() => {
        expect(Object.keys(subjects.active.metadata)).to.have.lengthOf(1)
        expect(subjects.isThereMetadata).to.be.true()
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