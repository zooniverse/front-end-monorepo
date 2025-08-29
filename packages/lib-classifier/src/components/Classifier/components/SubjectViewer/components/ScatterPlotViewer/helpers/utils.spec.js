import * as d3 from 'd3'
import {
  getDataPoints,
  getDataExtent,
  left,
  top,
  transformXScale,
  transformYScale,
  xMin,
  xMax,
  yMin,
  yMax
} from './utils'
import {
  lightCurveMockData,
  margin,
  padding,
  parentWidth,
  parentHeight,
  randomSingleSeriesData,
  transformMatrix
} from './mockData'

describe('ScatterPlotViewer > helpers > utils', function () {
  describe('left utility function', function () {
    it('should be a function', function () {
      expect(left).to.be.a('function')
    })

    describe('outer tick direction', function () {
      it('should return the left margin for the position', function () {
        const leftPos = left('outer', margin)
        expect(leftPos).to.equal(margin.left)
      })
    })

    describe('inner tick direction', function () {
      it('should return 0 for the position', function () {
        const leftPos = left('inner', margin)
        expect(leftPos).to.equal(0)
      })
    })
  })

  describe('top utility function', function () {
    it('should be a function', function () {
      expect(top).to.be.a('function')
    })

    describe('outer tick direction', function () {
      it('should return the top margin for the position', function () {
        const topPos = top('outer', margin)
        expect(topPos).to.equal(margin.top)
      })
    })

    describe('inner tick direction', function () {
      it('should return 0 for the position', function () {
        const topPos = top('inner', margin)
        expect(topPos).to.equal(0)
      })
    })
  })

  describe('xMin utility function', function () {
    it('should be a function', function () {
      expect(xMin).to.be.a('function')
    })

    describe('outer tick direction', function () {
      it('should return 0 for the range minimum', function () {
        expect(xMin({ tickDirection: 'outer', padding })).to.equal(0)
      })
    })

    describe('inner tick direction', function () {
      it('should return the left padding as the range minimum', function () {
        expect(xMin({ tickDirection: 'inner', padding })).to.equal(0)
      })
    })
  })

  describe('xMax utility function', function () {
    it('should be a function', function () {
      expect(xMax).to.be.a('function')
    })

    describe('outer tick direction', function () {
      it('should return the difference between the parent width, margin left, and margin right for the range maximum', function () {
        expect(xMax({ tickDirection: 'outer', parentWidth, margin })).to.equal(parentWidth - margin.left - margin.right)
      })
    })

    describe('inner tick direction', function () {
      it('should return the difference between the parent width and the margin left as the range maximum', function () {
        expect(xMax({ tickDirection: 'inner', parentWidth, margin })).to.equal(parentWidth - margin.left)
      })
    })
  })

  describe('yMin utility function', function () {
    it('should be a function', function () {
      expect(yMin).to.be.a('function')
    })

    describe('outer tick direction', function () {
      it('should return 0 for the range minimum', function () {
        expect(yMin({ tickDirection: 'outer', padding })).to.equal(0)
      })
    })

    describe('inner tick direction', function () {
      it('should return the padding bottom as the range minimum', function () {
        expect(yMin({ tickDirection: 'inner', padding })).to.equal(padding.bottom)
      })
    })
  })

  describe('yMax utility function', function () {
    it('should be a function', function () {
      expect(yMax).to.be.a('function')
    })

    describe('outer tick direction', function () {
      it('should return the difference between the parent height, margin top, and margin bottom for the range maximum', function () {
        expect(yMax({ tickDirection: 'outer', parentHeight, margin, padding })).to.equal(parentHeight - margin.top - margin.bottom)
      })
    })

    describe('inner tick direction', function () {
      it('should return the difference between the parent height and the padding bottom as the range maximum', function () {
        expect(yMax({ tickDirection: 'inner', parentHeight, margin, padding })).to.equal(parentHeight - padding.bottom)
      })
    })
  })

  describe('getDataPoints utility function', function () {
    describe('when there is a single series of data', function () {
      it('should return an array of a seriesData object containing an array of x, y data points', function () {
        const points = getDataPoints(randomSingleSeriesData.data)
        expect(points).to.be.an('array')
        expect(points[0].seriesData).to.have.lengthOf(randomSingleSeriesData.data.x.length)
        points[0].seriesData.forEach((point) => {
          expect(point.x).to.be.a('number')
          expect(point.y).to.be.a('number')
        })
      })
    })

    describe('when there is multiple series of data', function () {
      it('should return the same data JSON object input as the function parameter', function () {
        const inputData = lightCurveMockData.variableStar.scatterPlot.data
        const points = getDataPoints(inputData)
        expect(points).to.deep.equal(inputData)
      })
    })
  })

  describe('getDataExtent utility function', function () {
    describe('when there is a single series of data', function () {
      it('should return the data extent', function () {
        const extent = getDataExtent(randomSingleSeriesData.data)
        expect(extent.x[0]).to.equal(d3.extent(randomSingleSeriesData.data.x)[0])
        expect(extent.x[1]).to.equal(d3.extent(randomSingleSeriesData.data.x)[1])

        expect(extent.y[0]).to.deep.equal(d3.extent(randomSingleSeriesData.data.y)[0])
        expect(extent.y[1]).to.deep.equal(d3.extent(randomSingleSeriesData.data.y)[1])
      })
    })

    describe('when there is multiple series of data', function () {
      it('should return the data extent for all data series', function () {
        const inputData = lightCurveMockData.variableStar.scatterPlot.data
        const extent = getDataExtent(inputData)

        inputData.forEach((series) => {
          series.seriesData.forEach((dataPoint) => {
            // x minimum is less than or equal to
            expect(extent.x[0]).toBeLessThanOrEqual(dataPoint.x)
            // x maximum is greater than or equal to
            expect(extent.x[1]).toBeGreaterThanOrEqual(dataPoint.x)
            // y minimum is less than or equal to
            expect(extent.y[0]).toBeLessThanOrEqual(dataPoint.y)
            // y maximum is greater than or equal to
            expect(extent.y[1]).toBeGreaterThanOrEqual(dataPoint.y)
          })
        })
      })
    })
  })

  describe('transformXScale utility function', function () {
    const rangeParameters = {
      invertAxes: {
        x: false,
        y: false
      },
      margin: {
        bottom: 10,
        left: 10,
        right: 10,
        top: 10
      },
      padding: {
        bottom: 30,
        left: 30,
        right: 0,
        top: 0
      },
      parentHeight: 768,
      parentWidth: 384,
      tickDirection: 'outer'
    }

    it('should return a d3 linear scale function', function () {
      const scale = transformXScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
      expect(scale).to.be.a('function')
    })

    describe('when the axis is not inverted', function () {
      it('should return the expected range of the scale', function () {
        const { parentWidth, margin } = rangeParameters
        const scale = transformXScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        expect(scale.range()[0]).to.equal(0)
        expect(scale.range()[1]).to.equal(parentWidth - margin.left - margin.right)
      })

      it('should return the expected domain of the scale with the domain min and max in consecutive order', function () {
        const scale = transformXScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        const xDomainMin = scale.domain()[0]
        const xDomainMax = scale.domain()[1]
        expect(xDomainMin).toBeLessThan(xDomainMax)
      })
    })

    describe('when the axis is inverted', function () {
      before(function () {
        rangeParameters.invertAxes.x = true
      })

      after(function () {
        rangeParameters.invertAxes.x = false
      })

      it('should return the expected range of the scale', function () {
        const { parentWidth, margin } = rangeParameters
        const scale = transformXScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        expect(scale.range()[0]).to.equal(parentWidth - margin.left - margin.right)
        expect(scale.range()[1]).to.equal(0)
      })

      it('should return the expected domain of the scale with the domain min and max in consecutive order', function () {
        const scale = transformXScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        const xDomainMin = scale.domain()[0]
        const xDomainMax = scale.domain()[1]
        expect(xDomainMin).toBeLessThan(xDomainMax)
      })
    })
  })

  describe('transformYScale utility function', function () {
    const rangeParameters = {
      invertAxes: {
        x: false,
        y: false
      },
      margin: {
        bottom: 10,
        left: 10,
        right: 10,
        top: 10
      },
      padding: {
        bottom: 30,
        left: 30,
        right: 0,
        top: 0
      },
      parentHeight: 768,
      parentWidth: 384,
      tickDirection: 'outer'
    }

    it('should return a d3 linear scale function', function () {
      const scale = transformYScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
      expect(scale).to.be.a('function')
    })

    describe('when the axis is not inverted', function () {
      it('should return the expected range of the scale', function () {
        const { parentHeight, margin } = rangeParameters
        const scale = transformYScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        expect(scale.range()[0]).to.equal(parentHeight - margin.top - margin.bottom)
        expect(scale.range()[1]).to.equal(0)
      })

      it('should return the expected domain of the scale with the domain min and max in consecutive order', function () {
        const scale = transformYScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        const yDomainMin = scale.domain()[0]
        const yDomainMax = scale.domain()[1]
        expect(yDomainMin).toBeLessThan(yDomainMax)
      })
    })

    describe('when the axis is inverted', function () {
      before(function () {
        rangeParameters.invertAxes.y = true
      })

      after(function () {
        rangeParameters.invertAxes.y = false
      })

      it('should return the expected range of the scale', function () {
        const { parentHeight, margin } = rangeParameters
        const scale = transformYScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        expect(scale.range()[0]).to.equal(0)
        expect(scale.range()[1]).to.equal(parentHeight - margin.top - margin.bottom)
      })

      it('should return the expected domain of the scale with the domain min and max in consecutive order', function () {
        const scale = transformYScale(randomSingleSeriesData.data, transformMatrix, rangeParameters)
        const yDomainMin = scale.domain()[0]
        const yDomainMax = scale.domain()[1]
        expect(yDomainMin).toBeLessThan(yDomainMax)
      })
    })
  })
})
