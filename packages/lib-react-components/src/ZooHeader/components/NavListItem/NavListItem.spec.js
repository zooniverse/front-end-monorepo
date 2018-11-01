import React from 'react'
import { shallow } from 'enzyme'
import NavListItem from './NavListItem'

describe('<NavListItem />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<NavListItem label='Zooniverse' url='https://www.zooniverse.org' />)
  })

  it('renders without crashing', function () {})
})
