import { expect } from 'chai'

import pluckCategoryData from './pluckCategoryData'

const TITLE = 'foo'
const SLUG = 'bar'
const ID = 'baz'

const MOCK_ENTRY = {
  fields: {
    title: TITLE,
    slug: SLUG
  },
  sys: {
    id: ID
  }
}

describe('Helpers > pluckCategoryData', function () {
  it('should exist', function () {
    expect(pluckCategoryData).to.be.a('function')
  })

  it('should get the entry category data', function () {
    const plucked = pluckCategoryData(MOCK_ENTRY)
    expect(plucked.title).to.equal(TITLE)
    expect(plucked.slug).to.equal(SLUG)
    expect(plucked.id).to.equal(ID)
    expect(plucked.projects).to.deep.equal([])
  })
})
