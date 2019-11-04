import { shallow } from 'enzyme'
import React from 'react'

import PrimaryButton from './PrimaryButton'

let wrapper

describe('Component > PrimaryButton', function () {
  before(function () {
    wrapper = shallow(<PrimaryButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
