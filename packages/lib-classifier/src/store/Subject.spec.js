import sinon from 'sinon'
import Subject from './Subject'
import ProjectStore from './ProjectStore'
import WorkflowStore from './WorkflowStore'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import subjectViewers from '../helpers/subjectViewers'

const stub = SubjectFactory.build()
const workflow = WorkflowFactory.build()
const workflowWithConfig = WorkflowFactory.build({ configuration: { subject_viewer: 'lightcurve' } })
const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })

describe('Model > Subject', function () {
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

  describe('Views > talkURL', function () {
    before(function () {
      subject.projects = ProjectStore.create({})
      subject.projects.setResource(project)
      subject.projects.setActive(project.id)
    })

    it('should have a Talk URL', function () {
      expect(subject.talkURL).to.equal(`https://example.org/projects/${project.slug}/talk/subjects/${subject.id}`)
    })
  })

  describe('Views > viewer', function () {
    it('should return null as default', function () {
      subject.workflows = WorkflowStore.create({})
      subject.workflows.setResource(workflow)
      subject.workflows.setActive(workflow.id)
      expect(subject.viewer).to.be.null()
    })

    it('should return the single image viewer for subjects with a single image location', function () {
      const singleImageSubject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const subjectStore = Subject.create(singleImageSubject)
      subjectStore.workflows = WorkflowStore.create({})
      subjectStore.workflows.setResource(workflow)
      subjectStore.workflows.setActive(workflow.id)
      expect(subjectStore.viewer).to.equal(subjectViewers.singleImage)
    })

    it('should return the light curve viewer if the workflow configuration is defined', function () {
      const dataSubject = SubjectFactory.build({ location: [{ 'application/json': 'https://foo.bar/data.json' }] })
      const subjectResourceStore = Subject.create(dataSubject)
      subjectResourceStore.workflows = WorkflowStore.create({})
      subjectResourceStore.workflows.setResource(workflowWithConfig)
      subjectResourceStore.workflows.setActive(workflowWithConfig.id)
      expect(subjectResourceStore.viewer).to.equal(subjectViewers.lightCurve)
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
      subject.projects.setResource(project)
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
