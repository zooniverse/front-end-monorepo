import { shallow } from 'enzyme'
import sinon from 'sinon'
import { DataImageViewer } from './DataImageViewer'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewerContainer } from '../SingleImageViewer'
import kepler from '../../helpers/mockLightCurves/kepler'

const jsonData = {
  data: kepler,
  chartOptions: {
    xAxisLabel: 'time',
    yAxisLabel: 'brightness'
  }
}
const imageLocation = { 'image/png': 'example.png' }

describe('Component > DataImageViewer', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <DataImageViewer
        imageLocation={imageLocation}
        jsonData={jsonData}
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

    describe('when zoom is not enabled', function () {
      let scatterPlotWrapper, scatterPlot, setAllowPanZoomSpy
      before(function () {
        setAllowPanZoomSpy = sinon.spy()
        wrapper = shallow(
          <DataImageViewer
            imageLocation={imageLocation}
            jsonData={jsonData}
            setAllowPanZoom={setAllowPanZoomSpy}
          />
        )
        scatterPlotWrapper = wrapper.find({ gridArea: 'scatterPlot' })
        scatterPlot = wrapper.find(ScatterPlotViewer)
      })

      it('should have zooming set to false', function () {
        expect(scatterPlot.props().zooming).to.be.false()
      })

      it('should not have a border defined for its wrapper div', function () {
        expect(scatterPlotWrapper.props().border).to.be.false()
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with scatterPlot as the argument', function () {
        scatterPlot.props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('scatterPlot')
      })
    })

    describe('when zoom is enabled', function () {
      let scatterPlotWrapper, scatterPlot, setAllowPanZoomSpy
      before(function () {
        setAllowPanZoomSpy = sinon.spy()
        wrapper = shallow(
          <DataImageViewer
            allowPanZoom='scatterPlot'
            imageLocation={imageLocation}
            jsonData={jsonData}
            setAllowPanZoom={setAllowPanZoomSpy}
          />
        )

        scatterPlotWrapper = wrapper.find({ gridArea: 'scatterPlot' })
        scatterPlot = wrapper.find(ScatterPlotViewer)
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

  describe('SingleImageViewer', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<DataImageViewer />)
    })

    it('should not render a SingleImageViewerContainer if there is no imageLocation', function () {
      expect(wrapper.find(SingleImageViewerContainer)).to.have.lengthOf(0)
    })

    it('should render a SingleImageViewer if there is an imageLocation', function () {
      wrapper.setProps({ imageLocation })
      expect(wrapper.find(SingleImageViewerContainer)).to.have.lengthOf(1)
    })

    describe('when zoom is not enabled', function () {
      let imageViewerWrapper, imageViewer, setAllowPanZoomSpy
      before(function () {
        setAllowPanZoomSpy = sinon.spy()
        wrapper = shallow(
          <DataImageViewer
            imageLocation={imageLocation}
            jsonData={jsonData}
            setAllowPanZoom={setAllowPanZoomSpy}
          />
        )
        imageViewerWrapper = wrapper.find({ gridArea: 'image' })
        imageViewer = wrapper.find(SingleImageViewerContainer)
      })

      it('should have zooming set to false', function () {
        expect(imageViewer.props().zooming).to.be.false()
      })

      it('should not have a border defined for its wrapper div', function () {
        expect(imageViewerWrapper.props().border).to.be.false()
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with image as the argument', function () {
        imageViewer.props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('image')
      })
    })

    describe('when zoom is enabled', function () {
      let imageViewerWrapper, imageViewer, resetViewSpy, setAllowPanZoomSpy
      before(function () {
        setAllowPanZoomSpy = sinon.spy()
        resetViewSpy = sinon.spy()
        wrapper = shallow(
          <DataImageViewer
            allowPanZoom='image'
            imageLocation={imageLocation}
            jsonData={jsonData}
            resetView={resetViewSpy}
            setAllowPanZoom={setAllowPanZoomSpy}
          />
        )
        imageViewerWrapper = wrapper.find({ gridArea: 'image' })
        imageViewer = wrapper.find(SingleImageViewerContainer)
      })

      it('should set zooming to true', function () {
        expect(imageViewer.props().zooming).to.be.true()
      })

      it('should have a border defined for its wrapper div', function () {
        expect(imageViewerWrapper.props().border).to.deep.equal({ color: 'brand', size: 'xsmall' })
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with an empty string argument', function () {
        imageViewer.props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('')
      })

      it('should call resetView when zoomControlFn is called', function () {
        expect(resetViewSpy).to.have.been.calledOnce()
      })
    })
  })
})