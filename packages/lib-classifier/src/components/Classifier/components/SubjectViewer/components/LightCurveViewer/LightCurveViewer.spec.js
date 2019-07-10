import * as d3 from 'd3'
import { render } from 'enzyme'
import { zip } from 'lodash'
import React from 'react'

import LightCurveViewer from './LightCurveViewer'
import mockData from './mockData'

let wrapper

describe('Component > LightCurveViewer', function () {
  before(function () {
    const dataPoints = zip(mockData.x, mockData.y)
    const dataExtent = {
      x: d3.extent(mockData.x),
      y: d3.extent(mockData.y)
    }

    // Use mount() instead of shallow() since d3 logic exists outside of render()
    wrapper = render(<LightCurveViewer dataPoints={dataPoints} dataExtent={dataExtent} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
