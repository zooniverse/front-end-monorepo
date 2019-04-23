import { shallow } from 'enzyme'
import React from 'react'

import Faq from './Faq'

let wrapper

describe('Component > Faq', function () {
  before(function () {
    wrapper = shallow(<Faq />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
