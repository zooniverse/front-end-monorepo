import { shallow, mount } from 'enzyme'
import React from 'react'
import FieldGuideButton from './FieldGuideButton'

describe('Component > FieldGuideButton', function () {
  it('should render without crashing', function () {
    shallow(<FieldGuideButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<FieldGuideButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Open Field Guide')
  })
})
