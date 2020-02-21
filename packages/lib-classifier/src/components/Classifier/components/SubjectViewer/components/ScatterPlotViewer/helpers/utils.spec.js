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
  margin,
  padding,
  parentWidth,
  parentHeight,
  randomSingleSeriesData
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

  describe.only('getDataPoints utility function', function () {
    describe('single series of data', function () {
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
  })
})
