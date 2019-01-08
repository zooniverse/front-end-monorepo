import { shallow } from 'enzyme'
import React from 'react'

import GitHubIcon from './GitHubIcon'

let wrapper

describe('Component > GitHubIcon', function () {
  before(function () {
    wrapper = shallow(<GitHubIcon />)
  })

  it('should render without crashing', function () {})
})
