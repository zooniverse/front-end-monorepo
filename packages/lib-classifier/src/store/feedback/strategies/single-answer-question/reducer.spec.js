import reducer from './reducer'

describe('Feedback > Single Answer Question > Reducer', function () {
  it('should not mutate the original object', function () {
    const original = { answer: '0' }
    const reduced = reducer(original)
    expect(reduced).to.not.equal(original)
  })

  it('should handle a correct answer', function () {
    const rule = { answer: '0' }
    const result = reducer(rule, 0)
    expect(result.success).to.equal(true)
  })

  it('should handle an incorrect answer', function () {
    const rule = { answer: '1' }
    const result = reducer(rule, 2)
    expect(result.success).to.equal(false)
  })

  it('should handle a correct undefined answer', function () {
    const rule = { answer: '-1' }
    const result = reducer(rule, undefined)
    expect(result.success).to.equal(true)
  })

  it('should handle an incorrect undefined answer', function () {
    const rule = { answer: '0' }
    const result = reducer(rule, undefined)
    expect(result.success).to.equal(false)
  })

  it('should handle a correct null answer', function () {
    const rule = { answer: '-1' }
    const result = reducer(rule, null)
    expect(result.success).to.equal(true)
  })

  it('should handle an incorrect null answer', function () {
    const rule = { answer: '0' }
    const result = reducer(rule, null)
    expect(result.success).to.equal(false)
  })
})
