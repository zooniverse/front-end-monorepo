import { shallow } from 'enzyme'
import React from 'react'

import { LoginPopup } from './LoginPopup'

describe('Component > OAuthApp > LoginPopup', function () {
  it('should render without crashing', function () {
    shallow(<LoginPopup />)
  })
})
