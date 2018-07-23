import layoutsMap from './layouts'

describe('Helpers > layouts', function () {
  const layouts = [
    'default'
  ]

  layouts.forEach(function (layout) {
    describe(`\`${layout}\` layout`, function () {
      it('should exist', function () {
        expect(layoutsMap[layout]).to.equal(layout)
      })

      it('should be immutable', function () {
        expect(function () {
          layoutsMap[layout] = 'foobar'
        }).to.throw()
      })
    })
  })

  describe('`values` property', function () {
    it('should return all available layouts', function () {
      expect(layoutsMap.values).to.deep.equal(layouts)
    })

    it('should be immutable', function () {
      expect(function () {
        layoutsMap.values = 'foobar'
      }).to.throw()
    })
  })
})
