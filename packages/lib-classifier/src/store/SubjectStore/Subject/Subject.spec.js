import { Factory } from 'rosie'
import sinon from 'sinon'
import Subject from './Subject'
import ProjectStore from '@store/ProjectStore'
import WorkflowStore from '@store/WorkflowStore'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import RootStore from '@store/'
import subjectViewers from '@helpers/subjectViewers'
import { subjectsSeenThisSession } from '@helpers'

describe('Model > Subject', function () {
  const stub = SubjectFactory.build()
  const workflow = WorkflowFactory.build()
  const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
  let subject

  before(function () {
    subject = Subject.create(stub)
    subject.onToggleFavourite = sinon.stub()
    subject.onAddToCollection = sinon.stub()
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
    const client = stubPanoptesJs({ subjects, workflows: [workflowSnapshot] })
    client.caesar = {
      request: sinon.stub().callsFake(() => Promise.resolve({ workflow: { subject_reductions: [] } }))
    }
    client.tutorials = {
      get: sinon.stub().callsFake(() => Promise.resolve({ body: { tutorials: [] } }))
    }
    const rootStore = RootStore.create({}, { client })

    before(function () {
      rootStore.workflows.setResources([workflowSnapshot])
      rootStore.workflows.setActive(workflowSnapshot.id)
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
    before(function () {
      subject.projects = ProjectStore.create({})
      subject.projects.setResources([project])
      subject.projects.setActive(project.id)
    })

    it('should have a Talk URL', function () {
      expect(subject.talkURL).to.equal(`https://example.org/projects/${project.slug}/talk/subjects/${subject.id}`)
    })
  })

  describe('Views > viewer', function () {
    it('should return null as default', function () {
      subject.workflows = WorkflowStore.create({})
      subject.workflows.setResources([workflow])
      subject.workflows.setActive(workflow.id)
      expect(subject.viewer).to.be.null()
    })

    describe('when the subject location is valid', function () {
      describe('single image', function () {
        it('should return the single image viewer for subjects with a single image location', function () {
          const singleImageSubject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
          const subjectStore = Subject.create(singleImageSubject)
          subjectStore.workflows = WorkflowStore.create({})
          subjectStore.workflows.setResources([workflow])
          subjectStore.workflows.setActive(workflow.id)
          expect(subjectStore.viewer).to.equal(subjectViewers.singleImage)
        })
      })

      describe('multi-frame media', function () {
        it('should return the multi-frame viewer for subjects with more than one location', function () {
          const multiFrameSubject = SubjectFactory.build({
            locations: [
              { 'image/png': 'https://foo.bar/example.png' },
              { 'image/png': 'https://foo.bar/example.png' }
            ]
          })
          const subjectStore = Subject.create(multiFrameSubject)
          subjectStore.workflows = WorkflowStore.create({})
          subjectStore.workflows.setResources([workflow])
          subjectStore.workflows.setActive(workflow.id)
          expect(subjectStore.viewer).to.equal(subjectViewers.multiFrame)
        })


        it('should return a null viewer for subjects with more than ten location', function () {
          const multiFrameSubject = SubjectFactory.build({
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
          const subjectStore = Subject.create(multiFrameSubject)
          subjectStore.workflows = WorkflowStore.create({})
          subjectStore.workflows.setResources([workflow])
          subjectStore.workflows.setActive(workflow.id)
          expect(subjectStore.viewer).to.be.null()
        })

        it('should return a null viewer when workflow.configuration["multi_image_mode"] === "separate"', function () {
          const multiFrameSubject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }, { 'image/png': 'https://foo.bar/example.png' }] })
          const subjectStore = Subject.create(multiFrameSubject)
          const workflowWithConfigSeparateMultiImage = WorkflowFactory.build({ configuration: { multi_image_mode: 'separate' } })
          subjectStore.workflows = WorkflowStore.create({})
          subjectStore.workflows.setResources([workflowWithConfigSeparateMultiImage])
          subjectStore.workflows.setActive(workflowWithConfigSeparateMultiImage.id)
          expect(subjectStore.viewer).to.be.null()
        })

        it('should return a null viewer when workflow.configuration["enable_switching_flipbook_and_separate"] === "true"', function () {
          const multiFrameSubject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }, { 'image/png': 'https://foo.bar/example.png' }] })
          const subjectStore = Subject.create(multiFrameSubject)
          const workflowWithConfigEnableSwitching = WorkflowFactory.build({ configuration: { enable_switching_flipbook_and_separate: true } })
          subjectStore.workflows = WorkflowStore.create({})
          subjectStore.workflows.setResources([workflowWithConfigEnableSwitching])
          subjectStore.workflows.setActive(workflowWithConfigEnableSwitching.id)
          expect(subjectStore.viewer).to.be.null()
        })

        it('should return the multi-frame viewer if the workflow configuration for subject_viewer is defined as multiFrame', function () {
          const dataSubject = SubjectFactory.build({ location: [{ 'application/json': 'https://foo.bar/data.json' }] })
          const subjectResourceStore = Subject.create(dataSubject)
          const workflowWithMultiFrameConfig = WorkflowFactory.build({ configuration: { subject_viewer: 'multiFrame' } })
          subjectResourceStore.workflows = WorkflowStore.create({})
          subjectResourceStore.workflows.setResources([workflowWithMultiFrameConfig])
          subjectResourceStore.workflows.setActive(workflowWithMultiFrameConfig.id)
          expect(subjectResourceStore.viewer).to.equal(subjectViewers.multiFrame)
        })
      })

      describe('light curve viewer', function () {
        it('should return the light curve viewer if the workflow configuration is defined', function () {
          const dataSubject = SubjectFactory.build({ location: [{ 'application/json': 'https://foo.bar/data.json' }] })
          const subjectResourceStore = Subject.create(dataSubject)
          const workflowWithConfig = WorkflowFactory.build({ configuration: { subject_viewer: 'lightcurve' } })
          subjectResourceStore.workflows = WorkflowStore.create({})
          subjectResourceStore.workflows.setResources([workflowWithConfig])
          subjectResourceStore.workflows.setActive(workflowWithConfig.id)
          expect(subjectResourceStore.viewer).to.equal(subjectViewers.lightCurve)
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
        subject.workflows = WorkflowStore.create()
        subject.workflows.setResources([workflowWithViewerConfiguration])
        subject.workflows.setActive(workflowWithViewerConfiguration.id)
        expect(subject.viewerConfiguration).to.deep.equal(workflowWithViewerConfiguration.configuration.subject_viewer_configuration)
      })
    })

    describe('when there is a workflow and it does not have viewer configuration', function () {
      it('should return undefined', function () {
        const workflowWithoutViewerConfiguration = WorkflowFactory.build()
        subject.workflows = WorkflowStore.create()
        subject.workflows.setResources([workflowWithoutViewerConfiguration])
        subject.workflows.setActive(workflowWithoutViewerConfiguration.id)
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
      const subject = Subject.create(snapshot)
      subject.workflows = WorkflowStore.create()
      subject.workflows.setResources([workflow])
      subject.workflows.setActive(workflow.id)
      expect(subject.alreadySeen).to.be.false()
      subjectsSeenThisSession.add(workflow.id, [subject.id])
      expect(subject.alreadySeen).to.be.true()
      window.sessionStorage.removeItem("subjectsSeenThisSession")
    })
  })

  describe('Actions > toggleFavorite', function () {
    before(function () {
      subject.toggleFavorite()
    })

    it('should toggle subject.favorite', function () {
      expect(subject.favorite).to.be.true()
    })

    it('should call the onToggleFavourite callback', function () {
      expect(subject.onToggleFavourite.withArgs(subject.id, subject.favorite)).to.have.been.calledOnce()
    })
  })

  describe('Actions > addToCollection', function () {
    before(function () {
      subject.addToCollection()
    })

    it('should call the onAddToCollection callback', function () {
      expect(subject.onAddToCollection.withArgs(subject.id)).to.have.been.calledOnce()
    })
  })

  describe('Actions > openInTalk', function () {
    let url

    before(function () {
      url = `https://example.org/projects/${project.slug}/talk/subjects/${subject.id}`
    })

    function testOpenInTalk (newTab) {
      const subject = Subject.create(stub)
      subject.projects = ProjectStore.create({})
      subject.projects.setResources([project])
      subject.projects.setActive(project.id)
      subject.openInTalk(newTab)
      expect(subject.shouldDiscuss).to.eql({ newTab, url })
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
