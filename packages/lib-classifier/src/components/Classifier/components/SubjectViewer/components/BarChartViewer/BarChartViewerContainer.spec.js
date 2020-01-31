import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'

import { BarChartViewerContainer } from './BarChartViewerContainer'
import kepler from '../../helpers/mockLightCurves/kepler'
import { Factory } from 'rosie'

describe('Component > BarChartViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<BarChartViewerContainer />)
    expect(wrapper).to.be.ok()
  })
})