import { shallow } from 'enzyme'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { VariableStarViewer } from './VariableStarViewer'
import { SingleImageViewerContainer } from '../SingleImageViewer'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { expect } from 'chai'

describe('Component > VariableStarViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewer />)
    expect(wrapper).to.be.ok()
  })

  describe('when the parent container size changes responsively', function () {
    it('should have multi-column, multi-row grid layout when the parent size is greater than 768 pixels in width', function () {
      const wrapper = shallow(<VariableStarViewer parentWidth={1000} />)
      const props = wrapper.props()
      expect(props.columns).to.deep.equal(['2/3', '1/3'])
      expect(props.rows).to.deep.equal(['80px', '80px', '80px', '80px', '80px', '80px', '80px', '50px'])
      expect(props.areas).to.deep.equal([
        { name: 'controls', start: [0, 0], end: [0, 0] },
        { name: 'scatterPlots', start: [0, 1], end: [0, 7] },
        { name: 'barCharts', start: [1, 0], end: [1, 2] },
        { name: 'HRDiagram', start: [1, 3], end: [1, 7] }
      ])
    })

    it('should have a single column, multi-row grid layout when the parent size is less than 768 pixels in width', function () {
      const wrapper = shallow(<VariableStarViewer parentWidth={600} />)
      const props = wrapper.props()
      expect(props.columns).to.deep.equal(['full'])
      expect(props.rows).to.deep.equal(['80px', '590px', '330px', '620px'])
      expect(props.areas).to.deep.equal([
        { name: 'controls', start: [0, 0], end: [0, 0] },
        { name: 'scatterPlots', start: [0, 1], end: [0, 1] },
        { name: 'barCharts', start: [0, 2], end: [0, 2] },
        { name: 'HRDiagram', start: [0, 3], end: [0, 3] }
      ])
    })
  })

  describe('HR diagram', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<VariableStarViewer />)
    })

    it('should not render a SingleImageViewerContainer if there is no imageLocation', function () {
      expect(wrapper.find(SingleImageViewerContainer)).to.have.lengthOf(0)
    })

    it('should render a SingleImageViewer if there is an imageLocation', function () {
      wrapper.setProps({ imageLocation: { 'image/png': 'example.png' } })
      expect(wrapper.find(SingleImageViewerContainer)).to.have.lengthOf(1)
    })

    it('should render an figcaption', function () {
      const caption = wrapper.find('figcaption')
      expect(caption).to.have.lengthOf(1)
    })
  })

  describe('phased JSON scatter plot', function () {
    let wrapper, phasedJSONMock, phasedScatterPlot, setAllowPanZoomSpy
    before(function () {
      phasedJSONMock = {
        data: [
          { 
            seriesData: [
              { x: 1, y: 1 }
            ],
            seriesOptions: {}
          }
        ],
        chartOptions: {
          yAxisLabel: 'y-axis'
        }
      }
      setAllowPanZoomSpy = sinon.spy()
      wrapper =
        shallow(
          <VariableStarViewer
            phasedJSON={phasedJSONMock}
            phaseLimit={0.2}
            setAllowPanZoom={setAllowPanZoomSpy}
            highlightedSeries={[{ ['filter 1']: true }]}
            theme={zooTheme}
          />
        )
      phasedScatterPlot = wrapper.find({ data: phasedJSONMock.data })
    })

    it('should render a ScatterPlotViewer with the phasedJSON data', function () {
      expect(phasedScatterPlot).to.have.lengthOf(1)
    })

    it('should set the x-axis and y-axis labels', function () {
      /** The translation function will simply return keys in a testing environment */
      expect(phasedScatterPlot.props().xAxisLabel).to.equal('SubjectViewer.VariableStarViewer.phase')
      expect(phasedScatterPlot.props().yAxisLabel).to.equal(phasedJSONMock.chartOptions.yAxisLabel)
    })

    it('should invert the y-axis based on prop', function () {
      expect(phasedScatterPlot.props().invertAxes).to.deep.equal({ x: false, y: false })
      wrapper.setProps({ invertYAxis: true })
      phasedScatterPlot = wrapper.find({ data: phasedJSONMock.data })
      expect(phasedScatterPlot.props().invertAxes).to.deep.equal({ x: false, y: true })
    })

    it('should set the number of tick for the x and y-axis to 8', function () {
      expect(phasedScatterPlot.props().xAxisNumTicks).to.equal(8)
      expect(phasedScatterPlot.props().yAxisNumTicks).to.equal(8)
    })

    it('should set the highlightedSeries prop', function () {
      expect(phasedScatterPlot.props().highlightedSeries).to.deep.equal([{ ['filter 1']: true }])
    })

    it('should set the underlays with the phaseLimit and theme colors', function () {
      expect(phasedScatterPlot.props().underlays).to.deep.equal([
        { fill: zooTheme.global.colors['light-3'], startPosition: -0.2, xAxisWidth: 0.2 },
        { fill: zooTheme.global.colors['light-3'], startPosition: 1, xAxisWidth: 0.2 }
      ])
    })

    describe('when zoom is not enabled', function () {
      let wrapperDiv
      before(function () {
        wrapperDiv = wrapper.find({ gridArea: 'phasedJSON' })
      })
      after(function () {
        setAllowPanZoomSpy.resetHistory()
      })

      it('should have zooming set to false', function () {
        expect(phasedScatterPlot.props().zooming).to.be.false()
      })

      it('should not have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.be.false()
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with phasedJSON as the argument', function () {
        wrapperDiv.children().props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('phasedJSON')
      })
    })

    describe('when zoom is enabled', function () {
      let wrapperDiv
      before(function () {
        wrapper.setProps({ allowPanZoom: 'phasedJSON' })
        wrapperDiv = wrapper.find({ gridArea: 'phasedJSON' })
        phasedScatterPlot = wrapper.find({ data: phasedJSONMock.data })
      })

      after(function () {
        wrapper.setProps({ allowPanZoom: '' })
        setAllowPanZoomSpy.resetHistory()
      })

      it('should set zooming to true', function () {
        expect(phasedScatterPlot.props().zooming).to.be.true()
      })

      it('should have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.deep.equal({ color: 'brand', size: 'xsmall' })
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with an empty string argument', function () {
        wrapperDiv.children().props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('')
      })
    })
  })

  describe('raw JSON scatter plot', function () {
    let wrapper, rawJSONMock, rawScatterPlot, setAllowPanZoomSpy
    before(function () {
      rawJSONMock = {
        data: {
          scatterPlot: {
            data: [
              {
                seriesData: [
                  { x: 2, y: 2 }
                ],
                seriesOptions: {}
              }
            ],
            chartOptions: {
              xAxisLabel: 'x-axis',
              yAxisLabel: 'y-axis'
            }
          }
        }
      }
      setAllowPanZoomSpy = sinon.spy()
      wrapper =
        shallow(
          <VariableStarViewer
            rawJSON={rawJSONMock}
            setAllowPanZoom={setAllowPanZoomSpy}
            highlightedSeries={[{ ['filter 1']: true }]}
            theme={zooTheme}
          />
        )
      rawScatterPlot = wrapper.find(ScatterPlotViewer).find({ data: rawJSONMock.data.scatterPlot.data })
    })

    it('should render a ScatterPlotViewer with the rawJSON scatter plot data', function () {
      expect(rawScatterPlot).to.have.lengthOf(1)
    })

    it('should set the x-axis and y-axis labels', function () {
      expect(rawScatterPlot.props().xAxisLabel).to.equal(rawJSONMock.data.scatterPlot.chartOptions.xAxisLabel)
      expect(rawScatterPlot.props().yAxisLabel).to.equal(rawJSONMock.data.scatterPlot.chartOptions.yAxisLabel)
    })

    it('should invert the y-axis based on prop', function () {
      expect(rawScatterPlot.props().invertAxes).to.deep.equal({ x: false, y: false })
      wrapper.setProps({ invertYAxis: true })
      rawScatterPlot = wrapper.find(ScatterPlotViewer).find({ data: rawJSONMock.data.scatterPlot.data })
      expect(rawScatterPlot.props().invertAxes).to.deep.equal({ x: false, y: true })
    })

    it('should set the number of tick for the x and y-axis to 4 and 6', function () {
      expect(rawScatterPlot.props().xAxisNumTicks).to.equal(4)
      expect(rawScatterPlot.props().yAxisNumTicks).to.equal(6)
    })

    it('should set the highlightedSeries prop', function () {
      expect(rawScatterPlot.props().highlightedSeries).to.deep.equal([{ ['filter 1']: true }])
    })

    describe('when zoom is not enabled', function () {
      let wrapperDiv
      before(function () {
        wrapperDiv = wrapper.find({ gridArea: 'rawJSON' })
      })
      after(function () {
        setAllowPanZoomSpy.resetHistory()
      })

      it('should have zooming set to false', function () {
        expect(rawScatterPlot.props().zooming).to.be.false()
      })

      it('should not have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.be.false()
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with rawJSON as the argument', function () {
        wrapperDiv.children().props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('rawJSON')
      })
    })

    describe('when zoom is enabled', function () {
      let wrapperDiv
      before(function () {
        wrapper.setProps({ allowPanZoom: 'rawJSON' })
        wrapperDiv = wrapper.find({ gridArea: 'rawJSON' })
        rawScatterPlot = wrapper.find(ScatterPlotViewer).find({ data: rawJSONMock.data.scatterPlot.data })
      })

      after(function () {
        wrapper.setProps({ allowPanZoom: '' })
        setAllowPanZoomSpy.resetHistory()
      })

      it('should set the zoomControlFn prop to setAllowPanZoom with an empty string argument', function () {
        wrapperDiv.children().props().zoomControlFn()
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('')
      })

      it('should set zooming to true', function () {
        expect(rawScatterPlot.props().zooming).to.be.true()
      })

      it('should have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.deep.equal({ color: 'brand', size: 'xsmall' })
      })
    })
  })
})
