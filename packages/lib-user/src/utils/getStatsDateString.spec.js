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
})
