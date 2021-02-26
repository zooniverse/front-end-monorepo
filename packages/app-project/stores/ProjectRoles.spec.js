import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { panoptes, projects } from '@zooniverse/panoptes-js'
import sinon from 'sinon'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

// TO DO: fill in more tests

describe.only('Stores > ProjectRoles', function () {
  let projectStore
  let rootStore
  const { mocks } = projects

  it('should exist', function () {
    rootStore = Store.create({}, placeholderEnv)
    projectStore = rootStore.projectRoles
    expect(projectStore).to.be.ok()
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({}, placeholderEnv)
      projectStore = rootStore.project
    })

    it('should have an `id` property', function () {
      expect(projectStore.id).to.be.null()
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })

  describe('fetch user data', function () {
    it('should exist', function () {
      const rootStore = Store.create({}, { client: panoptes })
      const projectRoles = rootStore.projectRoles
      expect(projectRoles.fetch).to.be.a('function')
    })

    it('should have a loading status while loading', function () {

    })

    it('should set an error state if response is empty', async function () {

    })

  })
})