import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'

import { ScatterPlotViewerContainer } from './ScatterPlotViewerContainer'
import kepler from '../../helpers/mockLightCurves/kepler'
import { Factory } from 'rosie'

describe('Component > ScatterPlotViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ScatterPlotViewerContainer />)
    expect(wrapper).to.be.ok()
  })
})