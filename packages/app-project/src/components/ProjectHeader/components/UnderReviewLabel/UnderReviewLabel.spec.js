import { shallow } from 'enzyme'
import React from 'react'

import UnderReviewLabel from './UnderReviewLabel'

describe('ProjectHeader > Component >  UnderReviewLabel', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<UnderReviewLabel />)
    expect(wrapper).to.be.ok()
  })
})