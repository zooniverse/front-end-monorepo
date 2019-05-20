import { shallow } from 'enzyme'
import React from 'react'

import ZooHeaderWrapperContainer from './ZooHeaderWrapperContainer'

let wrapper

describe('Component > ZooHeaderWrapperContainer', function () {
  before(function () {
    wrapper = shallow(<ZooHeaderWrapperContainer
      user={{}}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
