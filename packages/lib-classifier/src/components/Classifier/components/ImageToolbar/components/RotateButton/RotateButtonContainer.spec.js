import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'
import RotateButtonContainer from './RotateButtonContainer'

describe('Component > RotateButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<RotateButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
