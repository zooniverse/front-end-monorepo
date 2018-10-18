import { shallow } from 'enzyme'
import React from 'react'

import TimeoutWarningPopup from './TimeoutWarningPopup'

describe('Component > OAuthApp > TimeoutWarningPopup', function () {
  it('should render without crashing', function () {
    shallow(<TimeoutWarningPopup />)
  })
})
