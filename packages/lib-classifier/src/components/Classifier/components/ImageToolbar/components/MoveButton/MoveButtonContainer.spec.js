import { shallow } from 'enzyme'
import React from 'react'

import MoveButtonContainer from './MoveButtonContainer'

describe('Component > MoveButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<MoveButtonContainer.wrappedComponent />)
  })
})
