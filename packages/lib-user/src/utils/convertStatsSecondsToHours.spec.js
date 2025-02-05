import { convertStatsSecondsToHours } from './convertStatsSecondsToHours'

describe('utils > convertStatsSecondsToHours', function() {
  it('should return 0 for 0 seconds', function() {
    expect(convertStatsSecondsToHours(0)).to.equal(0)
  })

  it('should return 1 for 3600 seconds', function() {
    expect(convertStatsSecondsToHours(3600)).to.equal(1)
  })

  it('should return 2 for 7200 seconds', function() {
    expect(convertStatsSecondsToHours(7200)).to.equal(2)
  })

  it('should return 0.8 for 3000 seconds', function() {
    expect(convertStatsSecondsToHours(3000)).to.equal(0.8)
  })

  it('should return 1.5 for 5400 seconds', function() {
    expect(convertStatsSecondsToHours(5400)).to.equal(1.5)
  })

  it('should return 0 for undefined', function() {
    expect(convertStatsSecondsToHours(undefined)).to.equal(0)
  })

  it('should return 0 for null', function() {
    expect(convertStatsSecondsToHours(null)).to.equal(0)
  })

  it('should return 0 for NaN', function() {
    expect(convertStatsSecondsToHours(NaN)).to.equal(0)
  })
})
