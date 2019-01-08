import { shallow } from 'enzyme'
import React from 'react'

import RedditIcon from './RedditIcon'

let wrapper

describe('Component > RedditIcon', function () {
  before(function () {
    wrapper = shallow(<RedditIcon />)
  })

  it('should render without crashing', function () {})
})
