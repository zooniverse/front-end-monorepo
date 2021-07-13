import { expect } from 'chai'
import formatTimeStamp from './formatTimeStamp'

describe('Helpers > formatTimeStamp', function () {
  it('should be a function', function () {
    expect(formatTimeStamp).to.be.a('function')
  })

  describe('Valid output', function () {
    it('should return 04:000', function () {
      const timestamp1 = formatTimeStamp(0.5, 8)

      expect(timestamp1).to.equal('04:000')
    })

    it('should return 03:038', function () {
      const timestamp1 = formatTimeStamp(0.7548, 4.025)

      expect(timestamp1).to.equal('03:038')
    })
  })
})
