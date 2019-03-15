import { shallow } from 'enzyme'
import React from 'react'

import ProjectHeader from './ProjectHeader'

const TITLE = 'Project title'
let wrapper

describe('Component > ProjectHeader', function () {
  before(function () {
    wrapper = shallow(<ProjectHeader title={TITLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title prop as an h1', function () {
    const heading = wrapper.find('ProjectHeader__StyledHeading').render()
    expect(heading.text()).to.equal(TITLE)
  })
})
