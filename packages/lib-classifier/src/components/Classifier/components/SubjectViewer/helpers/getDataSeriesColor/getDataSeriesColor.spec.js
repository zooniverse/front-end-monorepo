import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import getDataSeriesColor from './getDataSeriesColor'
import variableStar from '../mockLightCurves/variableStar'
import {
  dataSeriesWithCustomColor,
  dataSeriesWithInvalidCustomColor,
  dataSeriesWithThemeColorVariables
} from './helpers/mocks'
import isDataSeriesVisible from '../isDataSeriesVisible/isDataSeriesVisible'

const defaultColors = Object.values(zooTheme.global.colors.drawingTools)

describe('Helper > getDataSeriesColor', function () {
  it('should be a function', function () {
    expect(getDataSeriesColor).to.be.a('function')
  })

  it('should default to return transparent', function () {
    const color = getDataSeriesColor()
    expect(color).to.equal('transparent')
  })

  describe('with data series options', function () {
    it('should return the color from the theme if using theme variable name', function () {
      dataSeriesWithThemeColorVariables.data.forEach((series, seriesIndex) => {
        const color = getDataSeriesColor({
          seriesOptions: series.seriesOptions,
          seriesIndex,
          themeColors: zooTheme.global.colors,
          visible: true
        })
        expect(color).to.equal(zooTheme.global.colors[series.seriesOptions.color])
      })
    })

    it('should return the color defined in the subject JSON for each data series\' options object', function () {
      dataSeriesWithCustomColor.data.forEach((series) => {
        const color = getDataSeriesColor({ seriesOptions: series.seriesOptions,  visible: true })
        expect(color).to.equal(series.seriesOptions.color)
      })
    })

    describe('when the color is invalid', function () {
      let logError
      before(function () {
        logError = sinon.stub(console, 'error')
      })

      after(function () {
        console.error.restore()
      })

      it('should error to the console and return an empty string', function () {
        dataSeriesWithInvalidCustomColor.data.forEach((series) => {
          const color = getDataSeriesColor({ seriesOptions: series.seriesOptions, visible: true })
          expect(logError.withArgs(`Color for data subject viewer is invalid: ${series.seriesOptions.color}`)).to.have.been.calledOnce()
          expect(color).to.be.a('string')
          expect(color).to.be.empty()
        })
      })
    })
  })

  describe('with default colors', function () {
    describe('when there is a single series', function () {
      it('should default to the first color in the default colors array', function () {
        const color = getDataSeriesColor({ defaultColors, visible: true })
        expect(color).to.equal(defaultColors[0])
      })
    })

    describe('when there are multiple data series', function () {
      it('should return a color in the same order of the data series', function () {
        variableStar.data.scatterPlot.data.forEach((series, seriesIndex) => {
          const color = getDataSeriesColor({ seriesIndex, defaultColors, visible: true })
          expect(color).to.equal(defaultColors[seriesIndex])
        })
      })
    })

    describe('when the default colors are invalid', function () {
      let logError
      before(function () {
        logError = sinon.stub(console, 'error')
      })

      after(function () {
        console.error.restore()
      })

      it('should error to the console and return an empty string', function () {
        const color = getDataSeriesColor({ defaultColors: [ 'cccccc' ], visible: true })
        expect(logError.withArgs('Color for data subject viewer is invalid: cccccc')).to.have.been.calledOnce()
        expect(color).to.be.a('string')
        expect(color).to.be.empty()
      })
    })
  })

  describe('when a series can be toggled for visibility', function () {
    it('should set the color to the theme\'s \'light-4\' for dimmed data series', function () {
      const colors = []
      const visibleSeries = [ { foo: true }, { bar: false } ]
      variableStar.data.scatterPlot.data.forEach((series, seriesIndex) => {
        const visible = isDataSeriesVisible(visibleSeries, seriesIndex)
        colors[seriesIndex] = getDataSeriesColor({
          defaultColors,
          visible,
          seriesIndex,
          seriesOptions: series.seriesOptions,
          themeColors: zooTheme.global.colors
        })
      })

      expect(colors[0]).to.not.equal(zooTheme.global.colors['light-4'])
      expect(colors[1]).to.equal('transparent')
    })
  })
})