import { shallow, mount } from 'enzyme'
import React from 'react'
import RotateButton from './RotateButton'

describe('Component > RotateButton', function () {
  it('should render without crashing', function () {
    shallow(<RotateButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<RotateButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Rotate subject')
  })
})
