import { shallow } from 'enzyme'
import React from 'react'

import Person from './Person'

let wrapper

describe('Component > Person', function () {
  before(function () {
    wrapper = shallow(<Person />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
