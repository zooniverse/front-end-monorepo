import { shallow } from 'enzyme'
import React from 'react'

import OAuthApp from './OAuthApp'

describe('Component > OAuthApp > OAuthApp', function () {
  it('should render without crashing', function () {
    shallow(<OAuthApp.wrappedComponent store={{ reset: () => {} }} />)
  })
})
