import { getStatsDateString } from './getStatsDateString'

describe('utils > getStatsDateString', function () {
  it('should return the date string in the format "YYYY-MM-DD"', function () {
    const date = new Date('2021-06-01')
    const dateString = getStatsDateString(date)

    expect(dateString).to.equal('2021-06-01')
  })

  it('should return the date string in the format "YYYY-MM-DD" when passed a string', function () {
    const dateString = getStatsDateString('2021-06-01T06:30:00.000Z')

    expect(dateString).to.equal('2021-06-01')
  })

  it('should return the default date string when passed an undefined value', function () {
    const dateString = getStatsDateString(undefined)

    expect(dateString).to.equal('2015-03-17')
  })

  it('should return the default date string provided when passed undefined and a default date', function () {
    const dateString = getStatsDateString(undefined, '2021-07-01')

    expect(dateString).to.equal('2021-07-01')
  })
})
