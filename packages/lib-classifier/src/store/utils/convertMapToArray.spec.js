import convertMapToArray from './convertMapToArray'

describe('Store utils > convertMapToArray', function () {
  it('should default to return the map values as an array', function () {
    const myMap = new Map([['foo', 'bar']])
    const arrayResult = convertMapToArray(myMap)
    expect(arrayResult).to.be.an('array')
    expect(arrayResult[0]).to.equal(myMap.get('foo'))
  })

  it('should return an array of pairs if the options object includes { pairs: true }', function () {
    const myMap = new Map([['foo', 'bar']])
    const arrayResult = convertMapToArray(myMap, { pairs: true })
    expect(arrayResult).to.be.an('array')
    const mapEntry = myMap.entries().next().value
    expect(arrayResult[0][0]).to.equal(mapEntry[0])
    expect(arrayResult[0][1]).to.equal(mapEntry[1])
  })
})