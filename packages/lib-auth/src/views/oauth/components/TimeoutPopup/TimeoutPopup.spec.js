import { shallow } from 'enzyme'
import React from 'react'

import TimeoutPopup from './TimeoutPopup'

describe('Component > OAuthApp > TimeoutPopup', function () {
  it('should render without crashing', function () {
    shallow(<TimeoutPopup />)
  })
})
