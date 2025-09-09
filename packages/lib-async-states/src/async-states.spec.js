import asyncStates from './async-states'

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
        asyncStates[state] = 'foobar'
        expect(asyncStates[state]).to.equal(state)
      })
    })
  })

  describe('`values` property', function () {
    it('should return all available states', function () {
      expect(asyncStates.values).to.deep.equal(states)
    })

    it('should be immutable', function () {
      asyncStates.values = 'foobar'
      expect(asyncStates.values).to.deep.equal(states)
    })
  })
})
