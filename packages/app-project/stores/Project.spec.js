import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'
import sinon from 'sinon'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Project', function () {
  let projectStore
  let rootStore
  const { mocks } = projects

  it('should exist', function () {
    rootStore = Store.create({}, placeholderEnv)
    projectStore = rootStore.project
    expect(projectStore).to.be.ok()
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({}, placeholderEnv)
      projectStore = rootStore.project
    })

    it('should have a `background` property', function () {
      expect(projectStore.background).to.be.an('object')
    })

    it('should have a `beta_approved` property', function () {
      expect(projectStore.beta_approved).to.be.a('boolean')
    })

    it('should have a `beta_requested` property', function () {
      expect(projectStore.beta_requested).to.be.a('boolean')
    })

    it('should have a `displayName` property', function () {
      expect(projectStore.displayName).to.be.null()
    })

    it('should have a `description` property', function () {
      expect(projectStore.description).to.be.a('string')
    })

    it('should have an `error` property', function () {
      expect(projectStore.error).to.be.an('object')
    })

    it('should have an `experimental_tools` property', function () {
      expect(projectStore.experimental_tools).to.be.an('array')
    })

    it('should have an `id` property', function () {
      expect(projectStore.id).to.be.null()
    })

    it('should have an `launch_approved` property', function () {
      expect(projectStore.launch_approved).to.be.a('boolean')
    })

    it('should have an `live` property', function () {
      expect(projectStore.live).to.be.a('boolean')
    })

    it('should have a `researcher_quote` property', function () {
      expect(projectStore.researcher_quote).to.be.a('string')
    })

    it('should have a `slug` property', function () {
      expect(projectStore.slug).to.equal('')
    })

    it('should have a `state` property', function () {
      expect(projectStore.loadingState).to.equal(asyncStates.initialized)
    })

    it('should have a `workflow_description` property', function () {
      expect(projectStore.workflow_description).to.be.null()
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })

  describe('fetch method', function () {
    it('should exist', function () {
      const clientStub = {
        projects: {
          getWithLinkedResources: sinon.stub().callsFake(() => {
            return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
          })
        }
      }
      const rootStore = Store.create({}, { client: clientStub })
      const project = rootStore.project
      expect(project.fetch).to.be.a('function')
    })

    it('should have a loading status while loading', function () {
      const clientStub = {
        projects: {
          getWithLinkedResources: sinon.stub().callsFake(() => {
            return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
          })
        }
      }
      const rootStore = Store.create({}, { client: clientStub })
      const project = rootStore.project
      expect(project.loadingState).to.equal(asyncStates.initialized)

      project.fetch('foo/bar')
      expect(project.loadingState).to.equal(asyncStates.loading)
    })

    describe('with a valid project resource', function () {
      let project

      before(async function () {
        const clientStub = {
          projects: {
            getWithLinkedResources: sinon.stub().callsFake(() => {
              return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
            })
          }
        }
        const rootStore = Store.create({}, { client: clientStub })
        project = rootStore.project
        await project.fetch('foo/bar')
      })

      it('should load successfully', function () {
        expect(project.loadingState).to.equal(asyncStates.success)
      })

      it('should have a background', function () {
        const { projectBackground } = mocks.resources
        expect(project.background).to.eql(projectBackground)
      })

      it('should have a display name', function () {
        const { projectTwo } = mocks.resources
        expect(project.displayName).to.equal(projectTwo.display_name)
      })

      it('should have an ID', function () {
        const { projectTwo } = mocks.resources
        expect(project.id).to.equal(projectTwo.id)
      })

      it('should be launch approved', function () {
        const { projectTwo } = mocks.resources
        expect(project.launch_approved).to.equal(projectTwo.launch_approved)
      })

      it('should have a URL slug', function () {
        const { projectTwo } = mocks.resources
        expect(project.slug).to.equal(projectTwo.slug)
      })
    })

    it('should set an error state if response is an empty array', async function () {
      let clientStub = {
        projects: {
          getWithLinkedResources: sinon.stub().callsFake(() => {
            return Promise.resolve({ body: { projects: [] } })
          })
        }
      }
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project

      await projectStore.fetch('foo/bar')
      expect(projectStore.loadingState).to.equal(asyncStates.error)
      expect(projectStore.error.message).to.equal('foo/bar could not be found')
    })

    it('should request with params if defined', async function () {
      const clientStub = {
        projects: {
          getWithLinkedResources: sinon.stub().callsFake(() => {
            return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
          })
        }
      }
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project

      await projectStore.fetch('foo/bar', { env: 'staging' })
      expect(rootStore.client.projects.getWithLinkedResources).to.be.calledOnceWith(
        { query: { slug: 'foo/bar', env: 'staging' } }
      )
    })
  })

  describe('default workflow', function () {
    describe('with a single active workflow', function () {
      let project

      before(function () {
        const rootStore = Store.create({
          project: {
            links: {
              active_workflows: [ '1234' ]
            }
          }
        }, placeholderEnv)
        project = rootStore.project
      })

      it('should be the active workflow', function () {
        const [ singleActiveWorkflow ] = project.links.active_workflows
        expect(project.defaultWorkflow).to.equal(singleActiveWorkflow)
      })
    })

    describe('with a default workflow', function () {
      let project

      before(function () {
        const rootStore = Store.create({
          project: {
            configuration: {
              default_workflow: '5678'
            },
            links: {
              active_workflows: [ '1234', '5678' ]
            }
          }
        }, placeholderEnv)
        project = rootStore.project
      })

      it('should be undefined', function () {
        expect(project.defaultWorkflow).to.be.undefined()
      })
    })

    describe('with no active workflows', function () {
      let project

      before(function () {
        const rootStore = Store.create({
          project: {
            configuration: {},
            links: {
              active_workflows: []
            }
          }
        }, placeholderEnv)
        project = rootStore.project
      })

      it('should be undefined', function () {
        expect(project.defaultWorkflow).to.be.undefined()
      })
    })
  })
})
