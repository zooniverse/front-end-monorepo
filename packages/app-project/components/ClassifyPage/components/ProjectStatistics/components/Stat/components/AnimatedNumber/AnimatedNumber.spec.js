import { render } from 'enzyme'
import React from 'react'

import AnimatedNumber from './AnimatedNumber'

describe('Component > AnimatedNumber', function () {
  it('should render without crashing', function () {
    render(<AnimatedNumber value={1000} />)
  })
})
