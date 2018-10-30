import * as d3 from 'd3'
import { render } from 'enzyme'
import { zip } from 'lodash'
import React from 'react'

import LightCurveViewer from './LightCurveViewer'
import mockData from './mockData'

let d3svg
let wrapper

describe.only('Component > LightCurveViewer', function () {
  before(function () {
    const points = zip(mockData.x, mockData.y)
    const extent = {
      x: d3.extent(mockData.x),
      y: d3.extent(mockData.y)
    }

    //Use mount() instead of shallow() since d3 logic exists outside of render()
    wrapper = render(<LightCurveViewer points={points} extent={extent} />)
  })

  it('should render without crashing', function () {})
})
