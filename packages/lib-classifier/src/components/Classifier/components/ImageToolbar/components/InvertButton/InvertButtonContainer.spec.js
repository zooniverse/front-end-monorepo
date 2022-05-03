import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'
import InvertButtonContainer from './InvertButtonContainer'

describe('Component > InvertButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<InvertButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
