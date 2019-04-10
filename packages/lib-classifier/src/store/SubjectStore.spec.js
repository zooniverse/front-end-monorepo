import sinon from 'sinon'
import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import SubjectStore from './SubjectStore'
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
sinon.spy(clientStub.panoptes, 'get')

describe('Model > SubjectStore', function () {
  describe('Actions > advance', function () {
    before(function () {
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        { client: clientStub }
      )
    })

    it('should make the next subject in the queue active when calling `advance()`', function (done) {
      rootStore.projects.setResource(project)
      rootStore.workflows.setResource(workflow)
      rootStore.workflows.setActive(workflow.id)
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        rootStore.subjects.advance()
        expect(rootStore.subjects.active.id).to.equal(rootStore.subjects.resources.values().next().value.id)
        expect(rootStore.subjects.resources.get('1')).to.be.undefined
      }).then(done, done)
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

      rootStore.projects.setResource(project)
      rootStore.workflows.setResource(workflow)
      rootStore.workflows.setActive(workflow.id)
      rootStore.subjects.populateQueue().then(() => {
        expect(rootStore.subjects.isThereMetadata).to.be.false
      }).then(done, done)
    })

    it('should return false if the active subject does not have metadata', function (done) {
      rootStore = RootStore.create(
        { projects: ProjectStore.create(), subjects: SubjectStore.create(), workflows: WorkflowStore.create() },
        { client: clientStub }
      )

      rootStore.projects.setResource(project)
      rootStore.workflows.setResource(workflow)
      rootStore.workflows.setActive(workflow.id)
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.toJSON().metadata)).to.have.lengthOf(0)
        expect(rootStore.subjects.isThereMetadata).to.be.false
      }).then(done, done)
    })

    it('should return false if the active subject only has hidden metadata', function (done) {
      const subjectWithHiddenMetadata = SubjectFactory.build({ metadata: { '#foo': 'bar' }})
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

      rootStore.projects.setResource(project)
      rootStore.workflows.setResource(workflow)
      rootStore.workflows.setActive(workflow.id)
      rootStore.subjects.populateQueue().then(() => {
        const metadataKeys = Object.keys(rootStore.subjects.active.toJSON().metadata)
        expect(metadataKeys).to.have.lengthOf(1)
        expect(metadataKeys[0]).to.equal('#foo')
        expect(rootStore.subjects.isThereMetadata).to.be.false
      }).then(done, done)
    })

    it('should return true if the active subject has metadata', function (done) {
      const subjectWithMetadata = SubjectFactory.build({ metadata: { foo: 'bar' }})
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

      rootStore.projects.setResource(project)
      rootStore.workflows.setResource(workflow)
      rootStore.workflows.setActive(workflow.id)
      rootStore.subjects.populateQueue().then(() => {
        expect(Object.keys(rootStore.subjects.active.toJSON().metadata)).to.have.lengthOf(1)
        expect(rootStore.subjects.isThereMetadata).to.be.true
      }).then(done, done)
    })
  })
})
