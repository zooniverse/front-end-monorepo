import { shallow } from 'enzyme'
import React from 'react'

import LoginButton from './LoginButton'

describe('Component > OAuthApp > LoginButton', function () {
  it('should render without crashing', function () {
    shallow(<LoginButton />)
  })
})
