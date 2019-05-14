import { expect } from 'chai'

import pluckPublicationData from './pluckPublicationData'

const AUTHORS = 'baz'
const ID = 'baz'
const PROJECT_ID = 'qux'
const TITLE = 'foo'
const URL = 'bar'
const YEAR = 'quuz'

const MOCK_ENTRY = {
  fields: {
    authors: AUTHORS,
    projects: [
      { sys: { id: PROJECT_ID } }
    ],
    title: TITLE,
    url: URL,
    year: YEAR
  },
  sys: {
    id: ID
  }
}

describe('Helpers > pluckPublicationData', function () {
  it('should exist', function () {
    expect(pluckPublicationData).to.be.a('function')
  })

  it('should get the entry publication data', function () {
    const plucked = pluckPublicationData(MOCK_ENTRY)
    expect(plucked.authors).to.equal(AUTHORS)
    expect(plucked.id).to.equal(ID)
    expect(plucked.projects).to.deep.equal([PROJECT_ID])
    expect(plucked.title).to.equal(TITLE)
    expect(plucked.url).to.equal(URL)
    expect(plucked.year).to.deep.equal(YEAR)
  })
})
