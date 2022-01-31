import { when } from 'mobx'
import { getType } from 'mobx-state-tree'
import nock from 'nock'
import { Factory } from 'rosie'
import sinon from 'sinon'

import RootStore from '@store/RootStore'
import SubjectGroup from './SubjectGroup'
import SingleImageSubject from './SingleImageSubject'
import SingleTextSubject from './SingleTextSubject'
import { openTalkPage, MINIMUM_QUEUE_SIZE } from './SubjectStore'
import { ProjectFactory, SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > SubjectStore', function () {
  const longListSubjects = Factory.buildList('subject', 10)
  const shortListSubjects = Factory.buildList('subject', 2)

  function mockSubjectStore (subjects) {
    const project = ProjectFactory.build()
    const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
    const subjectMocks = {
      ['/subjects/grouped']: subjects['/subjects/grouped'] || subjects,
      ['/subjects/queued']: subjects['/subjects/queued'] || subjects,
      ['/subjects/selection']: subjects['/subjects/selection'] || subjects
    }
    const client = stubPanoptesJs({ ...subjectMocks, workflows: workflow })
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

    store.projects.setResources([project])
    store.projects.setActive(project.id)
    store.workflows.setResources([workflow])
    store.workflows.setActive(workflow.id)
    return store.subjects
  }

  describe('Actions', function() {
    describe('advance', function () {
      describe('with a full queue', function () {
        let subjects
        let previousSubjectID
        let initialSize

        before(async function () {
          subjects = mockSubjectStore(longListSubjects)
          await when(() => subjects.resources.size > 9)
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
          let subjects

          before(function () {
            subjects = mockSubjectStore(longListSubjects)
          })

          it.skip('should request more subjects', function () {
            while (subjects.resources.size > MINIMUM_QUEUE_SIZE) {
              subjects.advance()
            }
            subjects.advance()
            // Once for initialization and once after the queue has been advanced to less than 3 subjects
            expect(subjects.populateQueue).to.have.been.calledTwice()
          })
        })

        describe('when the initial response has less than three subjects', function () {
          let subjects

          before(function () {
            subjects = mockSubjectStore(shortListSubjects)
          })

          it.skip('should request more subjects', function () {
            // Once for initialization and again since less than three subjects in initial response
            expect(subjects.populateQueue).to.have.been.calledTwice()
          })
        })

        describe('when the initial response has no subjects', function () {
          let subjects

          before(function () {
            subjects = mockSubjectStore([])
          })

          it.skip('should request more subjects', function () {
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
        let subjects

        beforeEach(function () {
          subjects = mockSubjectStore(longListSubjects)
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

    describe('append', function () {
      let subjects

      before(function () {
        subjects = mockSubjectStore([])
        subjects.append(longListSubjects)
      })

      it('should increase the size of the queue', function () {
        expect(subjects.resources.size).to.equal(longListSubjects.length)
      })

      it('should add new subjects to the end of the queue', function () {
        const initialSubjectIDs = longListSubjects.map(subject => subject.id)
        const queue = Array.from(subjects.resources.keys())
        expect(queue).to.deep.equal(initialSubjectIDs)
      })
    
      it('should preserve the subject order', function () {
        let index = 0
        subjects.resources.forEach(function (resource, key) {
          const subject = longListSubjects[index]
          expect(key).to.equal(subject.id)
          index++
        })
      })

      it('should set the active subject', function () {
        expect(subjects.active.id).to.equal(longListSubjects[0].id)
      })

      describe('with an existing queue', function () {
        before(function () {
          subjects.append(shortListSubjects)
        })

        it('should increase the size of the queue', function () {
          expect(subjects.resources.size).to.equal(shortListSubjects.length + longListSubjects.length)
        })

        it('should add new subjects to the end of the queue', function () {
          const initialSubjectIDs = longListSubjects.map(subject => subject.id)
          const newSubjectIDs = shortListSubjects.map(subject => subject.id)
          const queue = Array.from(subjects.resources.keys())
          expect(queue).to.deep.equal([...initialSubjectIDs, ...newSubjectIDs])
        })

        it('should not change the active subject', function () {
          expect(subjects.active.id).to.equal(longListSubjects[0].id)
        })
      })
    })

    describe('clear the queue', function () {
      let subjects
      let onReset

      before(function () {
        const subjectSnapshots = Factory.buildList('subject', 5)
        const subjectMocks = {
          ['/subjects/grouped']: [],
          ['/subjects/queued']: [],
          ['/subjects/selection']: subjectSnapshots
        }
        const subjectIDs = subjectSnapshots.map(subject => subject.id)
        subjects = mockSubjectStore(subjectMocks)
        subjects.populateQueue(subjectIDs)
        onReset = sinon.stub()
        subjects.setOnReset(onReset)
      })

      it('should empty the queue', function () {
        expect(subjects.resources.size).to.equal(5)
        subjects.clearQueue()
        expect(subjects.resources.size).to.equal(0)
      })

      it('should call onReset', function () {
        expect(onReset).to.have.been.calledOnce()
      })
    })

    describe('next indexed subject', function () {
      let activeSubjectID
      let subjects

      before(async function () {
        subjects = mockSubjectStore(Factory.buildList('subject', 10))
        await when(() => subjects.resources.size > 9)
        activeSubjectID = subjects.active.id
        subjects.nextIndexed()
      })

      it('should do nothing', function () {
        expect(subjects.resources.size).to.equal(10)
        expect(subjects.active.id).to.equal(activeSubjectID)
      })
    })

    describe('next available subject',function () {
      let subjects
      let subjectIDs

      beforeEach(async function () {
        const queuedSubjectSnapshots = Factory.buildList('subject', 10)
        const selectedSubjectSnapshots = Factory.buildList('subject', 10)
        const subjectMocks = {
          ['/subjects/grouped']: [],
          ['/subjects/queued']: queuedSubjectSnapshots,
          ['/subjects/selection']: selectedSubjectSnapshots
        }
        subjectIDs = queuedSubjectSnapshots.map(subject => subject.id)
        subjects = mockSubjectStore(subjectMocks)
        await subjects.nextAvailable()
      })

      it('should select the first unclassified subject', function () {
        expect(subjects.active.id).to.equal(subjectIDs[0])
      })

      it('should cycle through unclassified subjects', async function () {
        await subjects.nextAvailable()
        expect(subjects.active.id).to.equal(subjectIDs[1])
      })
    })

    describe('populate queue', function() {
      describe('with specific subjects', function () {
        let subjects
        let subjectIDs

        before(function () {
          const subjectSnapshots = Factory.buildList('subject', 5)
          const subjectMocks = {
            ['/subjects/grouped']: [],
            ['/subjects/queued']: [],
            ['/subjects/selection']: subjectSnapshots
          }
          subjectIDs = subjectSnapshots.map(subject => subject.id)
          subjects = mockSubjectStore(subjectMocks)
          subjects.populateQueue(subjectIDs)
        })

        it('should select those subjects', function () {
          expect(subjects.resources.size).to.equal(5)
          expect(Array.from(subjects.resources.keys())).to.deep.equal(subjectIDs)
        })
      })
    })

    describe('previous indexed subject', function () {
      let activeSubjectID
      let subjects

      before(async function () {
        subjects = mockSubjectStore(Factory.buildList('subject', 10))
        await when(() => subjects.resources.size > 9)
        activeSubjectID = subjects.active.id
        subjects.previousIndexed()
      })

      it('should do nothing', function () {
        expect(subjects.resources.size).to.equal(10)
        expect(subjects.active.id).to.equal(activeSubjectID)
      })
    })
  })

  describe('single image subjects', function () {
    let subjects
    let imageSubjects = Factory.buildList('subject', 10, { locations: [{ 'image/png': 'https://foo.bar/example.png' }] })

    before(function () {
      subjects = mockSubjectStore(imageSubjects)
    })

    it('should be valid subjects', function () {
      const expectedSubject = SingleImageSubject.create(imageSubjects[0])
      expect(subjects.active).to.deep.equal(expectedSubject)
    })

    it('should be of the correct subject type', function () {
      expect(getType(subjects.active).name).to.equal('SubjectResource')
    })
  })

  describe('single text subjects', function () {
    let subjects
    let textSubjects = Factory.buildList('subject', 10, { locations: [{ 'text/plain': 'https://foo.bar/example.txt' }] })

    before(function () {
      subjects = mockSubjectStore(textSubjects)
    })

    it('should be valid subjects', function () {
      const expectedSubject = SingleTextSubject.create(textSubjects[0])
      expect(subjects.active).to.deep.equal(expectedSubject)
    })

    it('should be of the correct subject type', function () {
      expect(getType(subjects.active).name).to.equal('SubjectResource')
    })
  })

  describe('subject groups', function () {
    let subjects
    let subjectGroups = Factory.buildList(
      'subject',
      10,
      {
        id: 'testGroup',
        locations: [
          { 'image/png': 'https://foo.bar/example.png' },
          { 'image/png': 'https://foo.bar/example.png' },
          { 'image/png': 'https://foo.bar/example.png' },
          { 'image/png': 'https://foo.bar/example.png' },
        ],
        metadata: {
          '#group_subject_ids': '1111-1112-1113-1114',
          '#subject_group_id': 101,
      }
    })

    before(function () {
      subjects = mockSubjectStore(subjectGroups)
    })

    it('should be valid subjects', function () {
      const expectedSubject = SubjectGroup.create(subjectGroups[0])
      expect(subjects.active).to.deep.equal(expectedSubject)
    })
    
    it('should be of the correct "subject group" type', function () {
      expect(getType(subjects.active).name).to.equal('SubjectGroup')
    })
  })

  describe('indexed workflows', function () {
    let store
    let subjects = []

    before(async function () {
      const subjectSnapshot = SubjectFactory.build({
        metadata: {
          '#priority': 0
        }
      })
      for (let priority = 1; priority <= 10; priority++) {
        const snapshot = {
          already_seen: false,
          metadata: {
            '#priority': priority
          },
          retired: false
        }
        subjects.push(SubjectFactory.build(snapshot))
      }
      const subjectSetSnapshot = SubjectSetFactory.build({
        metadata: {
          indexFields: 'Date,Creator'
        }
      })
      const workflowSnapshot = WorkflowFactory.build({
        grouped: true,
        prioritized: true,
        subjectSet: subjectSetSnapshot.id
      })
      nock('https://subject-set-search-api.zooniverse.org')
      .persist(true)
      .get(`/subjects/${subjectSetSnapshot.id}.json`)
      .query(query => query.priority__gt === '-1')
      .reply(200, {
        columns: ['subject_id', 'priority'],
        rows: [
          [subjects[0].id, '1'],
          [subjects[1].id, '2'],
          [subjects[2].id, '3']
        ]
      })
      .get(`/subjects/${subjectSetSnapshot.id}.json`)
      .query(query => query.priority__gt === '0')
      .reply(200, {
        columns: ['subject_id', 'priority'],
        rows: [
          [subjects[0].id, '1'],
          [subjects[1].id, '2'],
          [subjects[2].id, '3']
        ]
      })
      store = mockStore({ subject: subjectSnapshot, subjectSet: subjectSetSnapshot, workflow: workflowSnapshot })
      // wait for initial subject setup to complete
      await when(() => store.subjects.resources.size > 9)
    })

    after(function () {
      nock.cleanAll()
    })

    describe('advance, with a new queue', function () {
      before(function () {
        store.subjects.reset()
        store.subjects.setResources(subjects)
        store.subjects.advance()
      })

      it('should make the first subject active', function () {
        let activeSubject = store.subjects.active
        expect(activeSubject.priority).to.equal(1)
      })
    })

    describe('advance, with an existing queue', function () {
      before(function () {
        store.subjects.reset()
        store.subjects.setResources(subjects)
        store.subjects.setActive(subjects[0].id)
        store.subjects.advance()
      })

      it('should mark the previous active subject as seen', function () {
        let activeSubject = store.subjects.active
        const previousSubject = store.subjects.resources.get(subjects[0].id)
        expect(previousSubject.already_seen).to.be.true()
        expect(activeSubject.already_seen).to.be.false()
      })

      it('should preserve the previous active subject', function () {
        const previousSubject = store.subjects.resources.get(subjects[0].id)
        expect(previousSubject).to.be.ok()
      })

      it('should move the active subject by one forwards', function () {
        let activeSubject = store.subjects.active
        expect(activeSubject.priority).to.equal(2)
      })
    })

    describe('previous indexed subject', function () {
      before(function () {
        store.subjects.reset()
        store.subjects.setResources(subjects)
        store.subjects.setActive(subjects[5].id)
        store.subjects.previousIndexed()
      })

      it('should preserve the previous active subject', function () {
        const previousSubject = store.subjects.resources.get(subjects[5].id)
        expect(previousSubject).to.be.ok()
      })

      it('should move the active subject by one backwards', function () {
        const expectedSubject = store.subjects.resources.get(subjects[4].id)
        const activeSubject = store.subjects.active
        expect(activeSubject.priority).to.equal(expectedSubject.priority)
      })
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

      const subjects = mockSubjectStore(subjectWithHiddenMetadata)
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
