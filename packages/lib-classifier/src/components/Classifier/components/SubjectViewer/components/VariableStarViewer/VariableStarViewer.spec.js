import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { StyledButton, VariableStarViewer } from './VariableStarViewer'
import { VariableStarViewerContainer } from './VariableStarViewerContainer'
import ZoomEnabledLabel from './components/ZoomEnableButton'
import { SingleImageViewer } from '../SingleImageViewer'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import variableStar from '@viewers/helpers/mockLightCurves/variableStar'
import en from './locales/en'
import { expect } from 'chai'

describe('Component > VariableStarViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewer />)
    expect(wrapper).to.be.ok()
  })

  describe('HR diagram', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<VariableStarViewer imageSrc='example.png' />)
    })

    it('should render a SingleImageViewer', function () {
      expect(wrapper.find(SingleImageViewer)).to.have.lengthOf(1)
    })

    it('should render a child SVG image', function () {
      const image = wrapper.find('image')
      expect(image).to.have.lengthOf(1)
      expect(image.props().xlinkHref).to.equal('example.png')
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
            visibleSeries={[{ ['filter 1']: true }]}
            theme={zooTheme}
          />
        )
      phasedScatterPlot = wrapper.find({ data: phasedJSONMock.data })
    })

    it('should render a ScatterPlotViewer with the phasedJSON data', function () {
      expect(phasedScatterPlot).to.have.lengthOf(1)
    })

    it('should set the x-axis and y-axis labels', function () {
      expect(phasedScatterPlot.props().xAxisLabel).to.equal(en.VariableStarViewer.phase)
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

    it('should set the visibleSeries prop', function () {
      expect(phasedScatterPlot.props().visibleSeries).to.deep.equal([{ ['filter 1']: true }])
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

      it('should not display the ZoomEnabledLabel', function () {
        expect(wrapperDiv.find(ZoomEnabledLabel).props().show).to.be.false()
      })

      it('should have a button overlayed the scatterplot', function () {
        expect(wrapperDiv.find(StyledButton)).to.have.lengthOf(1)
      })

      it('should have zooming set to false', function () {
        expect(phasedScatterPlot.props().zooming).to.be.false()
      })

      it('should not have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.be.false()
      })

      it('should call setAllowPanZoom with phasedJSON when the overlayed button is clicked', function () {
        const button = wrapperDiv.find(StyledButton)
        button.simulate('click')
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

      it('should display the ZoomEnabledLabel', function () {
        expect(wrapperDiv.find(ZoomEnabledLabel).props().show).to.be.true()
      })

      it('should not have a button overlayed the scatterplot', function () {
        expect(wrapperDiv.find(StyledButton)).to.have.lengthOf(0)
      })


      it('should set zooming to true', function () {
        expect(phasedScatterPlot.props().zooming).to.be.true()
      })

      it('should have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.deep.equal({ color: 'brand', size: 'xsmall' })
      })
    })
  })

  describe('raw JSON scatter plot', function () {
    let wrapper, rawJSONMock, rawScatterPlot, setAllowPanZoomSpy
    before(function () {
      rawJSONMock = {
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
      setAllowPanZoomSpy = sinon.spy()
      wrapper =
        shallow(
          <VariableStarViewer
            rawJSON={rawJSONMock}
            setAllowPanZoom={setAllowPanZoomSpy}
            visibleSeries={[{ ['filter 1']: true }]}
            theme={zooTheme}
          />
        )
      rawScatterPlot = wrapper.find(ScatterPlotViewer).find({ data: rawJSONMock.scatterPlot.data })
    })

    it('should render a ScatterPlotViewer with the rawJSON scatter plot data', function () {
      expect(rawScatterPlot).to.have.lengthOf(1)
    })

    it('should set the x-axis and y-axis labels', function () {
      expect(rawScatterPlot.props().xAxisLabel).to.equal(rawJSONMock.scatterPlot.chartOptions.xAxisLabel)
      expect(rawScatterPlot.props().yAxisLabel).to.equal(rawJSONMock.scatterPlot.chartOptions.yAxisLabel)
    })

    it('should invert the y-axis based on prop', function () {
      expect(rawScatterPlot.props().invertAxes).to.deep.equal({ x: false, y: false })
      wrapper.setProps({ invertYAxis: true })
      rawScatterPlot = wrapper.find(ScatterPlotViewer).find({ data: rawJSONMock.scatterPlot.data })
      expect(rawScatterPlot.props().invertAxes).to.deep.equal({ x: false, y: true })
    })

    it('should set the number of tick for the x and y-axis to 4 and 6', function () {
      expect(rawScatterPlot.props().xAxisNumTicks).to.equal(4)
      expect(rawScatterPlot.props().yAxisNumTicks).to.equal(6)
    })

    it('should set the visibleSeries prop', function () {
      expect(rawScatterPlot.props().visibleSeries).to.deep.equal([{ ['filter 1']: true }])
    })

    describe('when zoom is not enabled', function () {
      let wrapperDiv
      before(function () {
        wrapperDiv = wrapper.find({ gridArea: 'rawJSON' })
      })
      after(function () {
        setAllowPanZoomSpy.resetHistory()
      })

      it('should not display the ZoomEnabledLabel', function () {
        expect(wrapperDiv.find(ZoomEnabledLabel).props().show).to.be.false()
      })

      it('should have a button overlayed the scatterplot', function () {
        expect(wrapperDiv.find(StyledButton)).to.have.lengthOf(1)
      })

      it('should have zooming set to false', function () {
        expect(rawScatterPlot.props().zooming).to.be.false()
      })

      it('should not have a border defined for its wrapper div', function () {
        expect(wrapperDiv.props().border).to.be.false()
      })

      it('should call setAllowPanZoom with rawJSON when the overlayed button is clicked', function () {
        const button = wrapperDiv.find(StyledButton)
        button.simulate('click')
        expect(setAllowPanZoomSpy).to.have.been.calledOnceWith('rawJSON')
      })
    })

    describe('when zoom is enabled', function () {
      let wrapperDiv
      before(function () {
        wrapper.setProps({ allowPanZoom: 'rawJSON' })
        wrapperDiv = wrapper.find({ gridArea: 'rawJSON' })
        rawScatterPlot = wrapper.find(ScatterPlotViewer).find({ data: rawJSONMock.scatterPlot.data })
      })

      after(function () {
        wrapper.setProps({ allowPanZoom: '' })
        setAllowPanZoomSpy.resetHistory()
      })

      it('should display the ZoomEnabledLabel', function () {
        expect(wrapperDiv.find(ZoomEnabledLabel).props().show).to.be.true()
      })

      it('should not have a button overlayed the scatterplot', function () {
        expect(wrapperDiv.find(StyledButton)).to.have.lengthOf(0)
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
