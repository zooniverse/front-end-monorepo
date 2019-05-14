import { expect } from 'chai'

import sortEntriesByTitle from './sortEntriesByTitle'

const MOCK_ARRAY = [
  { fields: { title: 'CHARLIE' } },
  { fields: { title: 'Bravo' } },
  { fields: { title: 'alpha' } }
]

const SORTED_MOCK_ARRAY = [
  { fields: { title: 'alpha' } },
  { fields: { title: 'Bravo' } },
  { fields: { title: 'CHARLIE' } }
]

describe('Helpers > sortEntriesByTitle', function () {
  it('should exist', function () {
    expect(sortEntriesByTitle).to.be.a('function')
  })

  it('should sort a collection alphabetically by `fields.title`', function () {
    const sorted = MOCK_ARRAY.sort(sortEntriesByTitle)
    expect(sorted).to.deep.equal(SORTED_MOCK_ARRAY)
  })
})
