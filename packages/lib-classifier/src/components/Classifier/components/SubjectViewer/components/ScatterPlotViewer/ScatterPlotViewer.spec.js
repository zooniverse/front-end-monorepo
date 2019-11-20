import { shallow } from 'enzyme'
import React from 'react'
import ScatterPlot from './components/ScatterPlot'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import { ScatterPlotViewer } from './ScatterPlotViewer'
import { data, parentHeight, parentWidth } from './helpers/mockData'

describe('Component > ScatterPlotViewer', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <ScatterPlotViewer
        data={data}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should default to rendering the standard ScatterPlot', function () {
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(1)
  })

  it('should render the ZoomingScatterPlot if zooming is enabled', function () {
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(1)
    expect(wrapper.find(ZoomingScatterPlot)).to.have.lengthOf(0)
    wrapper.setProps({ zooming: true })
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(0)
    expect(wrapper.find(ZoomingScatterPlot)).to.have.lengthOf(1)
    wrapper.setProps({ zooming: false })

  })

  it('should pass along the size of the parent container as props', function () {
    expect(wrapper.find(ScatterPlot).props().parentHeight).to.equal(parentHeight)
    expect(wrapper.find(ScatterPlot).props().parentWidth).to.equal(parentWidth)
    wrapper.setProps({ zooming: true })
    expect(wrapper.find(ZoomingScatterPlot).props().parentHeight).to.equal(parentHeight)
    expect(wrapper.find(ZoomingScatterPlot).props().parentWidth).to.equal(parentWidth)
    wrapper.setProps({ zooming: false })
  })
})
