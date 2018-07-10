import { shallow, mount } from 'enzyme'
import React from 'react'
import AnnotateButton from './AnnotateButton'

describe('Component > AnnotateButton', function () {
  it('should render without crashing', function () {
    shallow(<AnnotateButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<AnnotateButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Annotate')
  })
})
