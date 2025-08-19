import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import getDataSeriesColor from './getDataSeriesColor'
import variableStar from '../mockLightCurves/variableStar'
import {
  dataSeriesWithCustomColor,
  dataSeriesWithInvalidCustomColor,
  dataSeriesWithThemeColorVariables
} from './helpers/mocks'

describe('Helper > getDataSeriesColor', function () {
  const defaultColors = Object.values(zooTheme.global.colors.drawingTools)

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
          highlighted: true
        })
        expect(color).to.equal(zooTheme.global.colors[series.seriesOptions.color])
      })
    })

    it('should return the color defined in the subject JSON for each data series\' options object', function () {
      dataSeriesWithCustomColor.data.forEach((series) => {
        const color = getDataSeriesColor({ seriesOptions: series.seriesOptions,  highlighted: true })
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
          const color = getDataSeriesColor({ seriesOptions: series.seriesOptions, highlighted: true })
          expect(logError.withArgs(`Color for data subject viewer is invalid: ${series.seriesOptions.color}`)).toHaveBeenCalledTimes(1)
          expect(color).to.be.a('string')
          expect(color).to.be.empty()
        })
      })
    })
  })

  describe('with default colors', function () {
    describe('when there is a single series', function () {
      it('should default to the first color in the default colors array', function () {
        const color = getDataSeriesColor({ defaultColors, highlighted: true })
        expect(color).to.equal(defaultColors[0])
      })
    })

    describe('when there are multiple data series', function () {
      it('should return a color in the same order of the data series', function () {
        variableStar.data.scatterPlot.data.forEach((series, seriesIndex) => {
          const color = getDataSeriesColor({ seriesIndex, defaultColors, highlighted: true })
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
        const color = getDataSeriesColor({ defaultColors: [ 'cccccc' ], highlighted: true })
        expect(logError.withArgs('Color for data subject viewer is invalid: cccccc')).toHaveBeenCalledTimes(1)
        expect(color).to.be.a('string')
        expect(color).to.be.empty()
      })
    })
  })
})
