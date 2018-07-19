import { shallow } from 'enzyme'
import React from 'react'

import LogoutPopup from './TimeoutWarningPopup'

describe('Component > OAuthApp > TimeoutWarningPopup', function () {
  it('should render without crashing', function () {
    shallow(<TimeoutWarningPopup />)
  })
})
