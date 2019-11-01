import { shallow } from 'enzyme'
import React from 'react'
import ScatterPlot from './components/ScatterPlot'
import ZoomingScatterPlot from './components/ZoomingScatterPlot'
import { ScatterPlotViewer } from './ScatterPlotViewer'
import { parentHeight, parentWidth } from './helpers/mockData'

describe('Component > ScatterPlotViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ScatterPlotViewer parentHeight={parentHeight} parentWidth={parentWidth} />)
    expect(wrapper).to.be.ok()
  })

  it('should default to rendering the standard ScatterPlot', function () {
    const wrapper = shallow(<ScatterPlotViewer parentHeight={parentHeight} parentWidth={parentWidth} />)
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(1)
  })

  it('should render the ZoomingScatterPlot if zooming is enabled', function () {
    const wrapper = shallow(
      <ScatterPlotViewer
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        zooming={true}
      />
    )
    expect(wrapper.find(ZoomingScatterPlot)).to.have.lengthOf(1)
  })

  it('should pass along the size of the parent container as props', function () {
    const wrapper = shallow(<ScatterPlotViewer parentHeight={parentHeight} parentWidth={parentWidth} />)
    expect(wrapper.find(ScatterPlot).props().parentHeight).to.equal(parentHeight)
    expect(wrapper.find(ScatterPlot).props().parentWidth).to.equal(parentWidth)
    wrapper.setProps({ zooming: true })
    expect(wrapper.find(ZoomingScatterPlot).props().parentHeight).to.equal(parentHeight)
    expect(wrapper.find(ZoomingScatterPlot).props().parentWidth).to.equal(parentWidth)
  })
})
