import { mount } from 'enzyme'
import React from 'react'

import Subtitle from './Subtitle'

let wrapper
const TEXT = 'Foobar'

describe('Component > Subtitle', function () {
  before(function () {
    wrapper = mount(<Subtitle text={TEXT} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `text` prop', function () {
    expect(wrapper.text()).to.equal(TEXT)
  })
})
