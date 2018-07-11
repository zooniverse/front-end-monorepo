import { shallow, mount } from 'enzyme'
import React from 'react'
import ResetButton from './ResetButton'

describe('Component > ResetButton', function () {
  it('should render without crashing', function () {
    shallow(<ResetButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<ResetButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Reset subject view')
  })
})
