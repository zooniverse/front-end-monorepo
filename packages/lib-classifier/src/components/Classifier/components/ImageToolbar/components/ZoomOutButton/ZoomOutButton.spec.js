import { shallow, mount } from 'enzyme'
import React from 'react'
import ZoomOutButton from './ZoomOutButton'

describe('Component > ZoomOutButton', function () {
  it('should render without crashing', function () {
    shallow(<ZoomOutButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<ZoomOutButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Zoom out from subject')
  })
})
