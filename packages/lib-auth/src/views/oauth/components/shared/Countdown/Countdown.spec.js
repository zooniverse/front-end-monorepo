import { shallow } from 'enzyme'
import React from 'react'

import Countdown from './Countdown'

describe('Component > OAuthApp > Countdown', function () {
  it('should render without crashing', function () {
    shallow(<Countdown.wrappedComponent />)
  })
})
