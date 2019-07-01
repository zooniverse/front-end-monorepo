import { expect } from 'chai'

import sortEntriesByName from './sortEntriesByName'

const MOCK_ARRAY = [
  { fields: { name: 'CHARLIE' } },
  { fields: { name: 'Bravo' } },
  { fields: { name: 'alpha' } }
]

const SORTED_MOCK_ARRAY = [
  { fields: { name: 'alpha' } },
  { fields: { name: 'Bravo' } },
  { fields: { name: 'CHARLIE' } }
]

describe('Helpers > sortEntriesByTitle', function () {
  it('should exist', function () {
    expect(sortEntriesByName).to.be.a('function')
  })

  it('should sort a collection alphabetically by `fields.name`', function () {
    const sorted = MOCK_ARRAY.sort(sortEntriesByName)
    expect(sorted).to.deep.equal(SORTED_MOCK_ARRAY)
  })
})
