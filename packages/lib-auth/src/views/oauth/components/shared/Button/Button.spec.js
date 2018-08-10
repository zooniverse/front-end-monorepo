import { shallow, mount } from 'enzyme'
import React from 'react'

import Button from './Button'

const mockProps = {
  label: 'Button label',
  onClick: Function.prototype
}

describe('Component > OAuthApp > Button', function () {
  it('should render without crashing', function () {
    shallow(<Button {...mockProps} />)
  })
})

