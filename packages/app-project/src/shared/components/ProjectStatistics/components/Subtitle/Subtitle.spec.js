import { mount, shallow } from 'enzyme'
import React from 'react'

import { Subtitle } from './Subtitle'

let wrapper
const TEXT = 'Foobar'

describe('Component > Subtitle', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Subtitle screenSize='medium' text={TEXT} />)
    expect(wrapper).to.be.ok()
  })

  it('should render the `text` prop', function () {
    wrapper = mount(<Subtitle screenSize='medium' text={TEXT} />)
    expect(wrapper.text()).to.equal(TEXT)
  })

  it('should use the margin prop if the screen size is greater than small', function () {
    wrapper = shallow(<Subtitle screenSize='medium' text={TEXT} />)
    expect(wrapper.props().margin).to.equal('0')
  })

  it('should set the margin to an object if the screen size is equal or less than small', function () {
    const newMargin = { top: 'none', bottom: 'xsmall' }
    wrapper = shallow(<Subtitle screenSize='small' text={TEXT} />)
    expect(wrapper.props().margin).to.eql(newMargin)
  })
})
