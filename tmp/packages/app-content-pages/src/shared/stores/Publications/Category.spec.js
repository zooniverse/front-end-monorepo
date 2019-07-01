import { expect } from 'chai'

import Category from './Category'

const MOCK_CATEGORY = {
  id: '12345',
  projects: [],
  slug: 'slug',
  title: 'title'
}

describe('Stores > Category', function () {
  let store

  beforeEach(function () {
    store = Category.create(MOCK_CATEGORY)
  })

  it('should export an object', function () {
    expect(Category).to.be.an('object')
  })

  it('should have a `id` property', function () {
    expect(store.id).to.equal(MOCK_CATEGORY.id)
  })

  it('should have a `projects` property', function () {
    expect(store.projects).to.deep.equal(MOCK_CATEGORY.projects)
  })

  it('should have a `slug` property', function () {
    expect(store.slug).to.equal(MOCK_CATEGORY.slug)
  })

  it('should have a `title` property', function () {
    expect(store.title).to.equal(MOCK_CATEGORY.title)
  })
})
