import { expect } from 'chai'
import formatTimeStamp from './formatTimeStamp'

describe('Helpers > formatTimeStamp', function () {
  describe('Input time greater than 1 second', function () {
    it('should return time in seconds as a readable mm:ss timestamp string', function () {
      const timeStamp1 = formatTimeStamp(0.500, 20.000)
      expect(timeStamp1).to.equal('0:10')

      const timeStamp2 = formatTimeStamp(1200.000)
      expect(timeStamp2).to.equal('20:00')
    })

    it('should remove double zeros from the mm indices', function () {
      const timeStamp = formatTimeStamp(0.755, 4.025)
      expect(timeStamp).to.equal('0:03')
    })
  })

  describe('Input time less than 1 second', function () {
    it('should return string `0:00`', function () {
      const timeStamp = formatTimeStamp(0.010, 20.000)
      expect(timeStamp).to.equal('0:00')
    })
  })

  describe('Invalid input time', function () {
    it('should return string `NaN`', function () {
      const timeStamp1 = formatTimeStamp('0.123')
      expect(timeStamp1).to.equal('NaN')
      const timeStamp2 = formatTimeStamp(NaN)
      expect(timeStamp2).to.equal('NaN')
    })
  })
})
