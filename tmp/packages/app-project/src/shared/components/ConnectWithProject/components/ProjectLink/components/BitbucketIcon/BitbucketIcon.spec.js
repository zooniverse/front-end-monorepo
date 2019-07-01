import { shallow } from 'enzyme'
import React from 'react'

import BitbucketIcon from './BitbucketIcon'

let wrapper

describe('Component > BitbucketIcon', function () {
  before(function () {
    wrapper = shallow(<BitbucketIcon />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
