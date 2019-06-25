import { expect } from 'chai'

import sortEntriesByWeight from './sortEntriesByWeight'

const MOCK_ARRAY = [
  { fields: { weight: '30' } },
  { fields: { weight: '10' } },
  { fields: { weight: '20' } }
]

const SORTED_MOCK_ARRAY = [
  { fields: { weight: '10' } },
  { fields: { weight: '20' } },
  { fields: { weight: '30' } }
]

describe('Helpers > sortEntriesByWeight', function () {
  it('should exist', function () {
    expect(sortEntriesByWeight).to.be.a('function')
  })

  it('should sort a collection numerically by `fields.weight` from low to high', function () {
    const sorted = MOCK_ARRAY.sort(sortEntriesByWeight)
    expect(sorted).to.deep.equal(SORTED_MOCK_ARRAY)
  })
})
