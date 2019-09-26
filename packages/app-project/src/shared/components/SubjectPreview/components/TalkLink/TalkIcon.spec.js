import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import TalkIcon from './TalkIcon'

describe('TalkIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TalkIcon />)
    expect(wrapper).to.be.ok()
  })
})
