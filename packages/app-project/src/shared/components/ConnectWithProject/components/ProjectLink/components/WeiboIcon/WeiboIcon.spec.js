import { shallow } from 'enzyme'
import React from 'react'

import WeiboIcon from './WeiboIcon'

let wrapper

describe('Component > WeiboIcon', function () {
  before(function () {
    wrapper = shallow(<WeiboIcon />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
