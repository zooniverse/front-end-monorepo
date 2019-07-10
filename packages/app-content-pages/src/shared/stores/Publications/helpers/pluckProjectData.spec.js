import { expect } from 'chai'

import pluckProjectData from './pluckProjectData'

const TITLE = 'foo'
const SLUG = 'bar'
const ID = 'baz'
const PROJECT_ID = 'qux'
const CATEGORY_ID = 'quuz'

const MOCK_ENTRY = {
  fields: {
    categories: [
      { sys: { id: CATEGORY_ID } }
    ],
    projectId: PROJECT_ID,
    title: TITLE,
    slug: SLUG
  },
  sys: {
    id: ID
  }
}

describe('Helpers > pluckProjectData', function () {
  it('should exist', function () {
    expect(pluckProjectData).to.be.a('function')
  })

  it('should get the entry project data', function () {
    const plucked = pluckProjectData(MOCK_ENTRY)
    expect(plucked.title).to.equal(TITLE)
    expect(plucked.slug).to.equal(SLUG)
    expect(plucked.id).to.equal(ID)
    expect(plucked.categories).to.deep.equal([CATEGORY_ID])
    expect(plucked.panoptesId).to.equal(PROJECT_ID)
    expect(plucked.publications).to.deep.equal([])
  })
})
