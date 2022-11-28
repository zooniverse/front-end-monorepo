import asyncStates from './async-states.js'

describe('asyncStates', function () {
  const states = [
    'initialized',
    'loading',
    'putting',
    'posting',
    'success',
    'error'
  ]

  states.forEach(function (state) {
    describe(`\`${state}\` state`, function () {
      it('should exist', function () {
        expect(asyncStates[state]).to.equal(state)
      })

      it('should be immutable', function () {
        expect(() => asyncStates[state] = 'foobar').to.throw()
      })
    })
  })

  describe('`values` property', function () {
    it('should return all available states', function () {
      expect(asyncStates.values).to.deep.equal(states)
    })

    it('should be immutable', function () {
      expect(() => asyncStates.values = 'foobar').to.throw()
    })
  })
})
