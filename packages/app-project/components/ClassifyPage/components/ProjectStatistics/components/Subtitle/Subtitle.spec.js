import { shallow } from 'enzyme'
import React from 'react'

import Subtitle from './Subtitle'

let wrapper
const TEXT = 'Foobar'

describe('Component > Subtitle', function () {
  before(function () {
    wrapper = shallow(<Subtitle text={TEXT} />)
  })

  it('should render without crashing', function () {})

  it('should render the `text` prop', function () {
    expect(wrapper.text()).to.equal(TEXT)
  })
})
