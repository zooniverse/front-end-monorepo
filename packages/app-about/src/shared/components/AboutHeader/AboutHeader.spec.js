import { shallow } from 'enzyme'
import React from 'react'

import AboutHeader from './AboutHeader'

let wrapper

describe('Component > AboutHeader', function () {
  before(function () {
    wrapper = shallow(<AboutHeader />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
