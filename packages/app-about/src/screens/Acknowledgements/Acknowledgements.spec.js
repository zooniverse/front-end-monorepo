import { shallow } from 'enzyme'
import React from 'react'

import Acknowledgements from './Acknowledgements'

let wrapper

describe('Component > Acknowledgements', function () {
  before(function () {
    wrapper = shallow(<Acknowledgements />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
