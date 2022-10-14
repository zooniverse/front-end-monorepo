import { Factory } from 'rosie'
import sinon from 'sinon'
import Subject from './Subject'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import stubPanoptesJs from '@test/stubPanoptesJs'
import subjectViewers from '@helpers/subjectViewers'
import { subjectsSeenThisSession } from '@helpers'

describe('Model > Subject', function () {
  const stub = SubjectFactory.build()
  const workflow = WorkflowFactory.build()
  const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
  let subject

  before(function () {
    subject = Subject.create(stub)
  })

  it('should exist', function () {
    expect(Subject).to.be.ok()
    expect(Subject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(stub.locations)
  })

  it('should not have transcription reductions', function () {
    expect(subject.transcriptionReductions).to.be.undefined()
  })

  describe('with a transcription workflow', function () {
    let client, rootStore

    before(async function () {
      const subjects = Factory.buildList('subject', 3)
      const workflowSnapshot = WorkflowFactory.build({
        id: 'transcriptionWorkflow',
        display_name: 'A test workflow',
        tasks: {
          T0: {
            instruction: 'Transcribe the text',
            type: 'transcription',
            tools: [
              { type: 'transcriptionLine' }
            ]
          }
        },
        version: '0.0'
      })
      client = stubPanoptesJs({ subjects, workflows: [workflowSnapshot] })
      client.caesar = {
        request: sinon.stub().callsFake(() => Promise.resolve({ workflow: { subject_reductions: [] } }))
      }
      client.tutorials = {
        get: sinon.stub().callsFake(() => Promise.resolve({ body: { tutorials: [] } }))
      }
      rootStore = mockStore({ workflow: workflowSnapshot, client })
      rootStore.subjects.reset()
      client.caesar.request.resetHistory()
      await rootStore.subjects.populateQueue()
    })

    it('should have transcription reductions', function () {
      const subject = rootStore.subjects.active
      expect(subject.transcriptionReductions).to.exist()
    })

    it('should load transcription reductions for each subject', function () {
      expect(client.caesar.request).to.have.been.calledThrice()
    })
  })

  describe('Views > priority', function () {
    it('should be undefined by default', function () {
      expect(subject.priority).to.be.undefined()
    })

    it('should be a number', function () {
      const prioritySnapshot = SubjectFactory.build({
        metadata: {
          '#priority': '3'
        }
      })
      const prioritySubject = Subject.create(prioritySnapshot)
      expect(prioritySubject.priority).to.equal(3)
    })

    /*
      This might not be supported by prioritised selection in Panoptes
      but we've come across subject.metadata.priority on Engaging Crowds subjects.
    */
    it('should support visible metadata', function () {
      const prioritySnapshot = SubjectFactory.build({
        metadata: {
          priority: '3'
        }
      })
      const prioritySubject = Subject.create(prioritySnapshot)
      expect(prioritySubject.priority).to.equal(3)
    })
  })

  describe('Views > talkURL', function () {
    let subject

    before(function () {
      const store = mockStore({ project, subject: stub })
      subject = store.subjects.active
    })

    it('should have a Talk URL', function () {
      expect(subject.talkURL).to.equal(`https://example.org/projects/${project.slug}/talk/subjects/${subject.id}`)
    })
  })

  describe('Views > viewer', function () {
    it('should return null as default', function () {
      const store = mockStore({ project, workflow, subject: stub })
      const subject = store.subjects.active
      expect(subject.viewer).to.be.null()
    })

    describe('when the subject location is valid', function () {
      describe('single image', function () {
        it('should return the single image viewer for subjects with a single image location', function () {
          const singleImageSubject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
          const store = mockStore({ project, workflow, subject: singleImageSubject })
          const subject = store.subjects.active
          expect(subject.viewer).to.equal(subjectViewers.singleImage)
        })
      })

      describe('single text', function () {
        it('should return the single text viewer for subjects with a single text location', function () {
          const singleTextSubject = SubjectFactory.build({ locations: [{ 'text/plain': 'https://foo.bar/example.txt' }] })
          const store = mockStore({ project, workflow, subject: singleTextSubject })
          const subject = store.subjects.active
          expect(subject.viewer).to.equal(subjectViewers.singleText)
        })
      })

      describe('image and text', function () {
        it('should return the image and text viewer for subjects with a single image and single text location', function () {
          const imageAndTextSubject = SubjectFactory.build({
            locations: [
              { 'image/png': 'https://foo.bar/example.png' },
              { 'text/plain': 'https://foo.bar/example.txt' }
            ]
          })
          const store = mockStore({ project, workflow, subject: imageAndTextSubject })
          const subject = store.subjects.active
          expect(subject.viewer).to.equal(subjectViewers.imageAndText)
        })
      })

      describe('multi-frame media', function () {
        it('should return the flipbook viewer for subjects with more than one location', function () {
          const multipleImagesSubject = SubjectFactory.build({
            locations: [
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' }
            ]
          })
          const store = mockStore({ project, workflow, subject: multipleImagesSubject })
          const subject = store.subjects.active
          expect(subject.viewer).to.equal(subjectViewers.flipbook)
        })

        it('should return a null viewer for subjects with more than ten location', function () {
          const multipleImagesSubject = SubjectFactory.build({
            locations: [
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' }
            ]
          })
          const store = mockStore({ project, workflow, subject: multipleImagesSubject })
          const subject = store.subjects.active
          expect(subject.viewer).to.be.null()
        })

        it('should return the multi-frame viewer if the workflow configuration for subject_viewer is defined as multiFrame', function () {
          const dataSubject = SubjectFactory.build({ location: [{ 'application/json': 'https://foo.bar/data.json' }] })
          const workflowWithMultiFrameConfig = WorkflowFactory.build({ configuration: { subject_viewer: 'multiFrame' } })
          const store = mockStore({
            project,
            workflow: workflowWithMultiFrameConfig,
            subject: dataSubject
          })
          const subject = store.subjects.active
          expect(subject.viewer).to.equal(subjectViewers.multiFrame)
        })
      })

      describe('light curve viewer', function () {
        it('should return the light curve viewer if the workflow configuration is defined', function () {
          const dataSubject = SubjectFactory.build({ location: [{ 'application/json': 'https://foo.bar/data.json' }] })
          const workflowWithConfig = WorkflowFactory.build({ configuration: { subject_viewer: 'lightcurve' } })
          const store = mockStore({
            project,
            workflow: workflowWithConfig,
            subject: dataSubject
          })
          const subject = store.subjects.active
          expect(subject.viewer).to.equal(subjectViewers.lightCurve)
        })
      })
    })

    describe('when any subject locations are invalid', function () {
      describe('single image', function () {
        it('should throw an error', function () {
          const singleImageSubject = SubjectFactory.build({ locations: [{ 'image/tiff': 'https://foo.bar/example.tiff' }] })
          function subjectStore () {
            return Subject.create(singleImageSubject)
          }
          expect(subjectStore).to.throw(Error)
        })
      })

      describe('single text', function () {
        it('should throw an error', function () {
          const singleTextSubject = SubjectFactory.build({ locations: [{ 'text/javascript': 'https://foo.bar/example.js' }] })
          function subjectStore () {
            return Subject.create(singleTextSubject)
          }
          expect(subjectStore).to.throw(Error)
        })
      })

      describe('multi-frame', function () {
        it('should throw an error', function () {
          const multiMediaSubject = SubjectFactory.build({
            locations: [
              { 'image/tiff': 'https://foo.bar/example.tiff' },
              { 'application/javascript': 'https://foo.bar/example.js' },
              { 'image/png': 'https://foo.bar/example.png' }
            ]
          })
          function subjectStore () {
            return Subject.create(multiMediaSubject)
          }
          expect(subjectStore).to.throw(Error)
        })
      })
    })
  })

  describe('Views > viewerConfiguration', function () {
    let subject
    beforeEach(function () {
      subject = Subject.create(stub)
    })

    describe('when there is not a workflow', function () {
      it('should return undefined', function () {
        expect(subject.viewerConfiguration).to.be.undefined()
      })
    })

    describe('when there is a workflow and it has viewer configuration', function () {
      it('should return the subject_viewer_configuration object', function () {
        const workflowWithViewerConfiguration = WorkflowFactory.build({
          configuration: {
            subject_viewer_config: {
              zoomConfiguration: {
                direction: 'both',
                minZoom: 1,
                maxZoom: 10,
                zoomInValue: 1.2,
                zoomOutValue: 0.8
              }
            }
          }
        })
        const store = mockStore({
          project,
          workflow: workflowWithViewerConfiguration,
          subject: stub
        })
        const subject = store.subjects.active
        expect(subject.viewerConfiguration).to.deep.equal(workflowWithViewerConfiguration.configuration.subject_viewer_configuration)
      })
    })

    describe('when there is a workflow and it does not have viewer configuration', function () {
      it('should return undefined', function () {
        const workflowWithoutViewerConfiguration = WorkflowFactory.build()
        const store = mockStore({
          project,
          workflow: workflowWithoutViewerConfiguration,
          subject: stub
        })
        const subject = store.subjects.active
        expect(subject.viewerConfiguration).to.be.undefined()
      })
    })
  })

  describe('Views > alreadySeen', function () {
    it('should return true when true on the resource', function () {
      const snapshot = SubjectFactory.build({ already_seen: true })
      const subject = Subject.create(snapshot)
      expect(subject.alreadySeen).to.be.true()
    })

    it('should fallback to check session storage when false on the resource', function () {
      const workflow = WorkflowFactory.build()
      const snapshot = SubjectFactory.build({ already_seen: false })
      const store = mockStore({
        project,
        workflow,
        subject: snapshot
      })
      const subject = store.subjects.active
      expect(subject.alreadySeen).to.be.false()
      subjectsSeenThisSession.add(workflow.id, [subject.id])
      expect(subject.alreadySeen).to.be.true()
      window.sessionStorage.removeItem("subjectsSeenThisSession")
    })
  })

  describe('Actions > toggleFavorite', function () {
    let store
    let subject

    before(function () {
      store = mockStore({
        project,
        subject: stub
      })
      store.setOnToggleFavourite(sinon.stub())
      subject = store.subjects.active
      subject.toggleFavorite()
    })

    it('should toggle subject.favorite', function () {
      expect(subject.favorite).to.be.true()
    })

    it('should call the onToggleFavourite callback', function () {
      expect(store.onToggleFavourite.withArgs(subject.id, subject.favorite)).to.have.been.calledOnce()
    })
  })

  describe('Actions > addToCollection', function () {
    let store

    before(function () {
      store = mockStore({
        project,
        subject: stub
      })
      store.setOnAddToCollection(sinon.stub())
      const subject = store.subjects.active
      subject.addToCollection()
    })

    it('should call the onAddToCollection callback', function () {
      expect(store.onAddToCollection.withArgs(subject.id)).to.have.been.calledOnce()
    })
  })

  describe('Actions > openInTalk', function () {
    let url

    before(function () {
      url = `https://example.org/projects/${project.slug}/talk/subjects/${subject.id}`
    })

    function testOpenInTalk (newTab) {
      const store = mockStore({ project, subject: stub })
      store.subjects.active.openInTalk(newTab)
      expect(store.subjects.active.shouldDiscuss).to.eql({ newTab, url })
    }

    describe('in the same tab', function () {
      it('should set the shouldDiscuss property', function () {
        testOpenInTalk(false)
      })
    })

    describe('in a new tab', function () {
      it('should set the shouldDiscuss property', function () {
        testOpenInTalk(true)
      })
    })
  })
})
