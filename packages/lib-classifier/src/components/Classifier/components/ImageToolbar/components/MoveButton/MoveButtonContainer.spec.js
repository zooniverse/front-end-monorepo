import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'
import MoveButtonContainer from './MoveButtonContainer'

describe('Component > MoveButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MoveButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
