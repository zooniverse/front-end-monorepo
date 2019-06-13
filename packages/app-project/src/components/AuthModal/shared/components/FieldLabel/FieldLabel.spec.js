import { shallow } from 'enzyme'
import React from 'react'

import FieldLabel from './FieldLabel'

let wrapper

describe('Component > FieldLabel', function () {
  before(function () {
    wrapper = shallow(<FieldLabel />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
