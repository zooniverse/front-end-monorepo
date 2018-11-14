import React from 'react'
import { shallow } from 'enzyme'

import NarrowMenuNavListItem from './NarrowMenuNavListItem'

describe('<NarrowMenuNavListItem />', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<NarrowMenuNavListItem text='Zooniverse' />)
  })

  it('should render without crashing', function () { })
})
