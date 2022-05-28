import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'
import sinon from 'sinon'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Project', function () {
  let projectStore
  let rootStore

  it('should exist', function () {
    rootStore = Store.create({
      project: {
        strings: {
          display_name: 'foobar',
          description: 'some text',
          researcher_quote: 'A quote.',
          workflow_description: 'The workflow description.'
        }
      }
    }, placeholderEnv)
    projectStore = rootStore.project
    expect(projectStore).to.be.ok()
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({
        project: {
          strings: {
            display_name: 'foobar',
            description: 'some text',
            researcher_quote: 'A quote.',
            workflow_description: 'The workflow description.'
          }
        }
      }, placeholderEnv)
      projectStore = rootStore.project
    })

    it('should have an `about_pages` property', function () {
      expect(projectStore.about_pages).to.be.an('array')
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
      expect(projectStore.displayName).to.be.a('string')
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

    it('should have a `urls` property', function () {
      expect(projectStore.urls).to.be.an('array')
    })

    it('should have a `workflow_description` property', function () {
      expect(projectStore.workflow_description).to.be.a('string')
    })

    after(function () {
      rootStore = null
      projectStore = null
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

    describe('with multiple active workflows', function () {
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
