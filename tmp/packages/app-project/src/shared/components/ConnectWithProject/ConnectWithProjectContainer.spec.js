import { shallow } from 'enzyme'
import React from 'react'

import ConnectWithProjectContainer from './ConnectWithProjectContainer'
import ConnectWithProject from './ConnectWithProject'

describe('Component > ConnectWithProjectContainer', function () {
  let wrapper
  let componentWrapper

  const PROJECT_NAME = 'project'
  const URLS = [
    {
      label: 'foo',
      url: 'https://bar.com'
    }
  ]

  before(function () {
    wrapper = shallow(<ConnectWithProjectContainer.wrappedComponent
      projectName={PROJECT_NAME}
      urls={URLS}
    />)
    componentWrapper = wrapper.find(ConnectWithProject)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ConnectWithProject` component if passed some urls', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should render null if not passed any urls', function () {
    const nullWrapper = shallow(<ConnectWithProjectContainer.wrappedComponent
      projectName={PROJECT_NAME}
    />)
    expect(nullWrapper.children()).to.have.lengthOf(0)
  })
})
