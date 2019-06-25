import { shallow } from 'enzyme'
import React from 'react'

import TwitterLink from './TwitterLink'

let wrapper

describe('Component > TwitterLink', function () {
  before(function () {
    wrapper = shallow(<TwitterLink />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
