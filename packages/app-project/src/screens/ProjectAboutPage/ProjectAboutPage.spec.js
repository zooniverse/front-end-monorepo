import { shallow } from 'enzyme'
import React from 'react'

import ProjectAboutPage from './ProjectAboutPage'

describe('Component > ProjectAboutPage', function () {
  let wrapper
  const aboutPageData = {
    title: 'Title'
  }
  before(function () {
    wrapper = shallow(<ProjectAboutPage aboutPageData={aboutPageData} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
