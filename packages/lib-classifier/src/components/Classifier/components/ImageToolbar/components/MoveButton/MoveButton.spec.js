import { shallow, mount } from 'enzyme'
import React from 'react'
import MoveButton from './MoveButton'

describe('Component > MoveButton', function () {
  it('should render without crashing', function () {
    shallow(<MoveButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<MoveButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('Move subject')
  })
})
