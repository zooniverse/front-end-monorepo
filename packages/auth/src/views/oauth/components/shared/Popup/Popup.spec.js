import { shallow } from 'enzyme'
import React from 'react'

import Popup from './Popup'

const mockProps = {
  closeFn: Function.prototype
}

describe('Component > OAuthApp > Popup', function () {
  it('should render without crashing', function () {
    shallow(<Popup {...mockProps} />)
  })
})
