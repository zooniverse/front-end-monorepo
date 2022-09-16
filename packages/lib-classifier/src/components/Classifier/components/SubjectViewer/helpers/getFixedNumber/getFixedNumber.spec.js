import getFixedNumber from './'

describe.only('Helper > getFixedNumber', function () {
  it('should round the input `number` to the `digits` decimal places', function () {
    const test1 = getFixedNumber(0.12345678, 3)
    expect(test1).to.equal(0.123)

    const test2 = getFixedNumber(7463785.1234567, 5)
    expect(test2).to.equal(7463785.12346)

    const test3 = getFixedNumber(0.5, 0)
    expect(test3).to.equal(1)
  })
})
