import { shallow } from 'enzyme'
import React from 'react'

import ProjectHomePageContainer from './ProjectHomePageContainer'

describe('Component > ProjectHomePageContainer', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<ProjectHomePageContainer.wrappedComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})