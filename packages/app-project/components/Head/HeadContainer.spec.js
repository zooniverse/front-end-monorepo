import { shallow } from 'enzyme'
import React from 'react'
import { projects } from '@zooniverse/panoptes-js'

import HeadContainer from './HeadContainer'
import Head from './Head'

const MOCK_PROJECT = {
  ...projects.mocks.resources.projectOne,
  background: projects.mocks.resources.projectBackground
}

let wrapper
let componentWrapper

describe('Component > HeadContainer', function () {
  before(function () {
    wrapper = shallow(<HeadContainer.wrappedComponent project={MOCK_PROJECT} />)
    componentWrapper = wrapper.find(Head)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the `Head` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a `description` prop to `Head` if available', function () {
    expect(componentWrapper.prop('description')).to.equal(MOCK_PROJECT.description)
  })

  it('should pass a `ogImage` prop to `Head` if available', function () {
    expect(componentWrapper.prop('ogImage')).to.equal(MOCK_PROJECT.background.src)
  })

  it('should pass a `projectTwitterUsername` prop to `Head` if available', function () {
    expect(componentWrapper.prop('projectTwitterUsername')).to.be.undefined

    const MOCK_PROJECT_WITH_TWITTER = {
      ...MOCK_PROJECT,
      urls: [
        {
          "url": "https://twitter.com/testproject",
          "path": "testproject",
          "site": "twitter.com/",
        }
      ]
    }
    const wrapperWithTwitter = shallow(<HeadContainer.wrappedComponent project={MOCK_PROJECT_WITH_TWITTER} />)
    const componentWrapperWithTwitter = wrapperWithTwitter.find(Head)
    expect(componentWrapperWithTwitter.prop('projectTwitterUsername')).to.equal('@testproject')
  })

  it('should pass a `siteName` prop to `Head`', function () {
    expect(componentWrapper.prop('siteName')).to.be.ok
  })

  it('should pass a `title` prop to `Head`', function () {
    expect(componentWrapper.prop('title')).to.equal(MOCK_PROJECT.display_name)
  })

  it('should pass a `url` prop to `Head`', function () {
    expect(componentWrapper.prop('url')).to.be.ok
  })
})
