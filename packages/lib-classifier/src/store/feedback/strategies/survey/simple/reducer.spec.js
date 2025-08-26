import reducer from './reducer'

describe('Feedback > Survey > Simple > Reducer', function () {
  it('should not mutate the original object', function () {
    const original = { choiceIds: 'AARDVARK,HONEYBADGER' }
    const reduced = reducer(original)
    expect(reduced).to.not.equal(original)
  })

  it('should handle correct choiceIds', function () {
    const rule = { choiceIds: 'AARDVARK,HONEYBADGER' }
    const result = reducer(rule, [
      {
        choice: 'AARDVARK'
      },
      {
        choice: 'HONEYBADGER'
      }
    ])
    expect(result.success).to.be.true()
  })

  it('should handle an incorrect choiceIds', function () {
    const rule = { choiceIds: 'AARDVARK,HONEYBADGER' }
    const result = reducer(rule, [
      {
        choice: 'BUSHPIG'
      }
    ])
    expect(result.success).to.be.false()
  })

  it('should handle a partial match of choiceIds', function () {
    const rule = { choiceIds: 'AARDVARK,HONEYBADGER' }
    const result = reducer(rule, [
      {
        choice: 'HONEYBADGER'
      }
    ])
    expect(result.success).to.be.false()
  })

  it('should handle a correct empty choiceIds', function () {
    const rule = { choiceIds: '' }
    const result = reducer(rule, [])
    expect(result.success).to.be.true()
  })

  it('should handle an incorrect empty choiceIds', function () {
    const rule = { choiceIds: 'AARDVARK,HONEYBADGER' }
    const result = reducer(rule, [])
    expect(result.success).to.be.false()
  })
})
