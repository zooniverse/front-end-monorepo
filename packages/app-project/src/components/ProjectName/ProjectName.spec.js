import { shallow } from 'enzyme'
import React from 'react'

import { ProjectName } from './ProjectName'

let wrapper
const PROJECT_NAME = 'Foobar'

describe('Component > ProjectName', function () {
  before(function () {
    wrapper = shallow(<ProjectName screenSize='medium' projectName={PROJECT_NAME} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `name` prop', function () {
    expect(wrapper.text()).to.include(PROJECT_NAME)
  })

  it('should render null if props.screenSize is small', function () {
    wrapper.setProps({ screenSize: 'small' })
    expect(wrapper.html()).to.be.null()
  })
})
