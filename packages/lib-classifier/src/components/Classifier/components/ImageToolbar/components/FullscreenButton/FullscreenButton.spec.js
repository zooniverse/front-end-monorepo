import { shallow, mount } from 'enzyme'
import React from 'react'
import FullscreenButton from './FullscreenButton'

describe('Component > FullscreenButton', function () {
  it('should render without crashing', function () {
    shallow(<FullscreenButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<FullscreenButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('View subject in full screen mode')
  })
})
