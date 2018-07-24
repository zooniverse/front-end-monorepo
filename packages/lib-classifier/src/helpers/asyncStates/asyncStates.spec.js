import asyncStates from './asyncStates'

describe('Helpers > asyncStates', function () {
  const states = [
    'initialized',
    'loading',
    'success',
    'error'
  ]

  states.forEach(function (state) {
    describe(`\`${state}\` state`, function () {
      it('should exist', function () {
        expect(asyncStates[state]).to.equal(state)
      })

      it('should be immutable', function () {
        expect(function () {
          asyncStates[state] = 'foobar'
        }).to.throw()
      })
    })
  })

  describe('`values` property', function () {
    it('should return all available states', function () {
      expect(asyncStates.values).to.deep.equal(states)
    })

    it('should be immutable', function () {
      expect(function () {
        asyncStates.values = 'foobar'
      }).to.throw()
    })
  })
})
