import subjectViewers from './subjectViewers'

describe('Helpers > subjectViewers', function () {
  const viewers = [
    'singleImage',
    'lightCurve',
    'multiFrame',
    'subjectGroup',
    'dataImage',
    'variableStar'
  ]

  viewers.forEach(function (viewer) {
    describe(`\`${viewer}\` viewer`, function () {
      it('should exist', function () {
        expect(subjectViewers[viewer]).to.equal(viewer)
      })

      it('should be immutable', function () {
        expect(function () {
          subjectViewers[viewer] = 'foobar'
        }).to.throw()
      })
    })
  })

  describe('`values` property', function () {
    it('should return all available viewers', function () {
      expect(subjectViewers.values).to.deep.equal(viewers)
    })

    it('should be immutable', function () {
      expect(function () {
        subjectViewers.values = 'foobar'
      }).to.throw()
    })
  })
})
