import React from 'react'
import { shallow } from 'enzyme'
import GoldButton from './GoldButton'

describe('<GoldButton />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<GoldButton label='Click me' onClick={() => {}} />)
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
