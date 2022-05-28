import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'

import fetchProjectData from './'

describe('Helpers > fetchProjectData', function () {
  const { mocks } = projects

  describe('with a valid project resource', function () {
    let project

    before(async function () {
      sinon.stub(projects, 'getWithLinkedResources').callsFake(() => {
        return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
      })
      project = await fetchProjectData('foo/bar')
    })

    after(function () {
      projects.getWithLinkedResources.restore()
    })

    it('should load successfully', function () {
      expect(project.loadingState).to.equal(asyncStates.success)
    })

    it('should have a background', function () {
      const { projectBackground } = mocks.resources
      expect(project.background).to.eql(projectBackground)
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
    sinon.stub(projects, 'getWithLinkedResources').callsFake(() => {
      return Promise.resolve({ body: { projects: [] } })
    })

    const project = await fetchProjectData('foo/bar')
    expect(project.loadingState).to.equal(asyncStates.error)
    expect(project.error.message).to.equal('foo/bar could not be found')
    projects.getWithLinkedResources.restore()
  })

  it('should request with params if defined', async function () {
    sinon.stub(projects, 'getWithLinkedResources').callsFake(() => {
      return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
    })

    await fetchProjectData('foo/bar', { env: 'staging' })
    expect(projects.getWithLinkedResources).to.be.calledOnceWith(
      { query: { slug: 'foo/bar', env: 'staging' } }
    )
    projects.getWithLinkedResources.restore()
  })
})