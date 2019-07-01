import { expect } from 'chai'

import Publication from './Publication'

const MOCK_PUBLICATION = {
  authors: 'authors',
  id: 'id',
  title: 'title',
  url: 'url',
  year: '2019'
}

describe('Stores > Publication', function () {
  let store

  beforeEach(function () {
    store = Publication.create(MOCK_PUBLICATION)
  })

  it('should export an object', function () {
    expect(Publication).to.be.an('object')
  })

  it('should have a `authors` property', function () {
    expect(store.authors).to.equal(MOCK_PUBLICATION.authors)
  })

  it('should have a `id` property', function () {
    expect(store.id).to.equal(MOCK_PUBLICATION.id)
  })

  it('should have a `title` property', function () {
    expect(store.title).to.equal(MOCK_PUBLICATION.title)
  })

  it('should have a `url` property', function () {
    expect(store.url).to.equal(MOCK_PUBLICATION.url)
  })

  it('should have a `year` property', function () {
    expect(store.year).to.equal(MOCK_PUBLICATION.year)
  })
})
