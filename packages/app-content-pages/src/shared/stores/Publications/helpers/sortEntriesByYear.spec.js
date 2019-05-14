import { expect } from 'chai'

import sortEntriesByYear from './sortEntriesByYear'

const MOCK_ARRAY = [
  { fields: { year: '2017' } },
  { fields: { year: '1999' } },
  { fields: { year: '2005' } }
]

const SORTED_MOCK_ARRAY = [
  { fields: { year: '2017' } },
  { fields: { year: '2005' } },
  { fields: { year: '1999' } }
]

describe('Helpers > sortEntriesByYear', function () {
  it('should exist', function () {
    expect(sortEntriesByYear).to.be.a('function')
  })

  it('should sort a collection numerically by `fields.year` from most to least recent', function () {
    const sorted = MOCK_ARRAY.sort(sortEntriesByYear)
    expect(sorted).to.deep.equal(SORTED_MOCK_ARRAY)
  })
})
