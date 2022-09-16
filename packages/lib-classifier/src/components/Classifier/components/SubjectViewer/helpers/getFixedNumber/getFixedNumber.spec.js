import getFixedNumber from './'

describe('Helper > getFixedNumber', function () {
  it('if number === 0, it should return 0', function () {
    const test = getFixedNumber(0, 3)
    expect(test).to.equal(0)
  })

  it('if number is negative, it should return a negative number', function () {
    const test = getFixedNumber(-123.123456789, 2)
    expect(test).to.equal(-123.12)
  })

  it('should round the input `number` to the `digits` decimal places', function () {
    const test1 = getFixedNumber(0.12345678, 3)
    expect(test1).to.equal(0.123)

    const test2 = getFixedNumber(7463785.1234567, 5)
    expect(test2).to.equal(7463785.12346)

    const test3 = getFixedNumber(0.5, 0)
    expect(test3).to.equal(1)
  })
})
