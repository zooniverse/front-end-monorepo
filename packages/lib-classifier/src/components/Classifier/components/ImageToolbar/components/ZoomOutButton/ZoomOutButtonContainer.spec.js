import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'
import ZoomOutButtonContainer from './ZoomOutButtonContainer'

describe('Component > ZoomOutButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomOutButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
