import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { DataImageViewer } from './DataImageViewer'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewer } from '../SingleImageViewer'
import kepler from '../../helpers/mockLightCurves/kepler'

const JSONData = {
  data: kepler,
  chartOptions: {
    xAxisLabel: 'time',
    yAxisLabel: 'brightness'
  }
}
const imageSrc = 'http://www.myimagehost.com/subject.png'

describe('Component > DataImageViewer', function () {
  let wrapper, setAllowPanZoomSpy
  before(function () {
    setAllowPanZoomSpy = sinon.spy()
    wrapper = shallow(
      <DataImageViewer
        imageSrc={imageSrc}
        JSONData={JSONData}
        setAllowPanZoom={setAllowPanZoomSpy}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('ScatterPlotViewer', function () {
    it('should render a ScatterPlotViewer', function () {
      expect(wrapper.find(ScatterPlotViewer)).to.have.lengthOf(1)
    })

    it('should pass along the data and chart options props', function () {
      const props = wrapper.find(ScatterPlotViewer).props()
      expect(props.data).to.deep.equal(kepler)
      expect(props.xAxisLabel).to.equal('time')
      expect(props.yAxisLabel).to.equal('brightness')
    })
  })

  describe('SingleImageViewer', function () {
    it('should render a SingleImageViewer', function () {
      expect(wrapper.find(SingleImageViewer)).to.have.lengthOf(1)
    })

    it('should render an svg image with the imageSrc', function () {
      const image = wrapper.find('image')
      expect(image).to.have.lengthOf(1)
      expect(image.props().xlinkHref).to.equal(imageSrc)
    })
  })

  describe('when zoom is not enabled', function () {
    let scatterPlotWrapper, scatterPlot
    before(function () {
      scatterPlotWrapper = wrapper.find({ gridArea: 'scatterPlot' })
      scatterPlot = wrapper.find(ScatterPlotViewer)
    })

    after(function () {
      setAllowPanZoomSpy.resetHistory()
    })

    it('should have zooming set to false', function () {
      expect(scatterPlot.props().zooming).to.be.false()
    })

    it('should not have a border defined for its wrapper div', function () {
      expect(scatterPlotWrapper.props().border).to.be.false()
    })

    it('should set the zoomControlFn prop to setAllowPanZoom with phasedJSON as the argument', function () {
      scatterPlot.props().zoomControlFn()
      expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('scatterPlot')
    })
  })

  describe('when zoom is enabled', function () {
    let scatterPlotWrapper, scatterPlot
    before(function () {
      wrapper.setProps({ allowPanZoom: 'scatterPlot' })
      scatterPlotWrapper = wrapper.find({ gridArea: 'scatterPlot' })
      scatterPlot = wrapper.find(ScatterPlotViewer)
    })

    after(function () {
      wrapper.setProps({ allowPanZoom: '' })
      setAllowPanZoomSpy.resetHistory()
    })

    it('should set zooming to true', function () {
      expect(scatterPlot.props().zooming).to.be.true()
    })

    it('should have a border defined for its wrapper div', function () {
      expect(scatterPlotWrapper.props().border).to.deep.equal({ color: 'brand', size: 'xsmall' })
    })

    it('should set the zoomControlFn prop to setAllowPanZoom with an empty string argument', function () {
      scatterPlot.props().zoomControlFn()
      expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('')
    })
  })
})