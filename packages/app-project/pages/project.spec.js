import { shallow, mount } from 'enzyme'
import React from 'react'
import Project from './project'
import sinon from 'sinon'
import { projectMocks as mocks } from '@zooniverse/panoptes-js'

const stubGet = sinon.stub()
  .onFirstCall().returns(Promise.resolve({
    body: {
      linked: {},
      links: {},
      meta: {},
      projects: [mocks.projectOne]
    }
  }))
  .onSecondCall().returns(Promise.resolve({
    body: {
      linked: {},
      links: {},
      meta: {},
      projects: [mocks.projectTwo]
    }
  }))

const stubClient = {
  projects: {
    get: stubGet
  }
}

const stubUrl = {
  asPath: '/projects/foo/bar'
}

describe('Page > Project', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Project url={stubUrl} />)
  })

  it('should load a snapshot into the store if passed as a prop', function () {
    const initialState = { project: mocks.projectOne }

    // We use camelCase in the store object, so we need to replicate that here.
    initialState.project.displayName = mocks.projectOne.display_name

    const wrapper = shallow(<Project initialState={initialState} />)
    const instance = wrapper.instance()

    instance.store.project.id.should.equal(initialState.project.id)
    instance.store.project.displayName.should.equal(initialState.project.displayName)
  })

  it('should fetch a project according the url if there is no snapshot', function (done) {
    const wrapper = shallow(<Project client={stubClient} url={stubUrl} />)

    // The stub client returns a promise, which resolves on the next tick.
    process.nextTick(() => {
      const storeProject = wrapper.prop('store').project
      storeProject.id.should.equal(mocks.projectOne.id)
      storeProject.displayName.should.equal(mocks.projectOne.display_name)
      done()
    })
  })
})
