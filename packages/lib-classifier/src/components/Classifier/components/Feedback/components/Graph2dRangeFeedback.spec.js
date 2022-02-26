import { shallow } from 'enzyme'
import React from 'react'

import { Graph2dRangeFeedback } from './Graph2dRangeFeedback'
import LightCurveViewer from '../../SubjectViewer/components/LightCurveViewer'

describe('Component > Graph2dRangeFeedback', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Graph2dRangeFeedback subject={{ id: '1' }} />)
    expect(wrapper).to.be.ok()
  })

  it('should render the LightCurveViewer', function () {
    const wrapper = shallow(<Graph2dRangeFeedback subject={{ id: '1' }} />)
    expect(wrapper.find(LightCurveViewer)).to.have.lengthOf(1)
  })
})
