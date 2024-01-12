import dateRanges from './dateRanges'

describe('components > shared > BarChart > dateRanges', () => {
  const ranges = [
    'Last7Days',
    'Last30Days',
    'ThisMonth',
    'Last3Months',
    'ThisYear',
    'Last12Months',
    'AllTime'
  ]

  ranges.forEach(function (range) {
    describe(`\`${range}\` range`, function () {
      it('should exist', function () {
        expect(dateRanges[range]).to.equal(range)
      })

      it('should be immutable', function () {
        expect(function () {
          dateRanges[range] = 'foobar'
        }).to.throw()
      })
    })
  })

  describe('`values` property', function () {
    it('should return all available ranges', function () {
      expect(dateRanges.values).to.deep.equal(ranges)
    })

    it('should be immutable', function () {
      expect(function () {
        dateRanges.values = 'foobar'
      }).to.throw()
    })
  })
})
