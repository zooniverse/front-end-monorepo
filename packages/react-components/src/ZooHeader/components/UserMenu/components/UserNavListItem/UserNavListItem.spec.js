import React from 'react'
import { shallow } from 'enzyme'

import UserNavListItem from './UserNavListItem'

describe('<UserNavListItem />', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<UserNavListItem text='Zooniverse' />)
  })

  it('should render without crashing', function () {})
})
