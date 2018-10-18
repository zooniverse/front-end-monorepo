import { shallow } from 'enzyme'
import React from 'react'

import LogoutPopup from './LogoutPopup'

describe('Component > OAuthApp > LogoutPopup', function () {
  it('should render without crashing', function () {
    shallow(<LogoutPopup />)
  })
})
