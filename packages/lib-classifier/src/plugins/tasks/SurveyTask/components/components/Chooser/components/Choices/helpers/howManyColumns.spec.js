import howManyColumns from './howManyColumns'

describe('Function > howManyColumns', function ()  {
  it('should be a function',  function () {
    expect(howManyColumns).to.be.a('function')
  })

  it('should return 1 if the length of the array is less than or equal to than 5', function () {
    expect(howManyColumns(Array(4))).to.equal(1)
    expect(howManyColumns(Array(5))).to.equal(1)
  })

  it('should return 2 if the length of the array is less than or equal to 20', function () {
    expect(howManyColumns(Array(19))).to.equal(2)
    expect(howManyColumns(Array(20))).to.equal(2)
  })

  it('should return 3 if the length of the array is greater than 20', function () {
    expect(howManyColumns(Array(21))).to.equal(3)
  })
})