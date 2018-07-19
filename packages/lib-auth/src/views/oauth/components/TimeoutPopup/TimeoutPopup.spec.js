import { shallow } from 'enzyme'
import React from 'react'

import TimeoutPopup from './TimeoutPopup'

describe('Component > OAuthApp > TimeoutPopup', function () {
  it('should render without crashing', function () {
    shallow(<TimeoutPopup />)
  })

  it('should derive the timeout message from the `timeLeft` prop', function () {
    const timeLeft = 1000000 // = 16 mins, 40 sec
    const wrapper = shallow(<TimeoutPopup timeLeft={timeLeft} />)
    const text = wrapper.text()
    expect(text.includes('16 minutes')).to.equal(true)
    expect(text.includes('40 seconds')).to.equal(true)
  })
})
