import { shallow, mount } from 'enzyme'
import React from 'react'
import ZoomInButton from './ZoomInButton'

describe('Component > ZoomInButton', function () {
  it('should render without crashing', function () {
    shallow(<ZoomInButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<ZoomInButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Zoom in on subject')
  })
})
