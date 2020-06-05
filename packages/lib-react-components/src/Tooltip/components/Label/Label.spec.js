import React from 'react'
import { shallow } from 'enzyme'

import { Label } from './Label'

describe('Tooltip > Component > Label', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<Label label='helpful tip' />)
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the label', function () {
    expect(wrapper.contains('helpful tip')).to.be.true()
  })
})
