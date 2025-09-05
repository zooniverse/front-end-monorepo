import filterByLabel, { filters } from './filterByLabel'

describe('filterByLabel', function () {
  it('should return an empty string if label is not defined', function () {
    const result = filterByLabel()
    expect(result).to.be.a('string')
    expect(result).to.have.lengthOf(0)
  })

  it('should return the label if filters are not defined', function () {
    const label = 'foo'
    const result = filterByLabel(label)
    expect(result).to.equal(label)
  })

  it('should return an empty string if the first character of the label does match a defined filter', function () {
    const result = filterByLabel('#foo', filters)
    expect(result).to.be.a('string')
    expect(result).to.have.lengthOf(0)
  })

  it('should return an empty string if the label starts with //', function () {
    const result = filterByLabel('//foo', filters)
    expect(result).to.be.a('string')
    expect(result).to.have.lengthOf(0)
  })

  it('should return the label if the first character of the label does not match a defined filter', function () {
    const label = '@foo'
    const result = filterByLabel(label, filters)
    expect(result).to.equal(label)
  })
})
