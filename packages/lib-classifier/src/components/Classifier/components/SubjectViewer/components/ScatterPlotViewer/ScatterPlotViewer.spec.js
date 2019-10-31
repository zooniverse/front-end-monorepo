import { shallow } from 'enzyme'
import React from 'react'
import ScatterPlot from './components/ScatterPlot'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'

import ScatterPlotViewer from './ScatterPlotViewer'

describe('Component > ScatterPlotViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ScatterPlotViewer />)
    expect(wrapper).to.be.ok()
  })

  it('should default to rendering the standard ScatterPlot', function () {
    const wrapper = shallow(<ScatterPlotViewer />)
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(1)
  })

  it('should render the ZoomingScatterPlot if zooming is enabled', function () {
    const wrapper = shallow(<ScatterPlotViewer zooming={true} />)
    expect(wrapper.find(ZoomingScatterPlot)).to.have.lengthOf(1)
  })
})
