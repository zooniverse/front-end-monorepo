import { expect } from 'chai'

import Project from './Project'

const MOCK_PROJECT = {
  avatarSrc: 'avatarSrc',
  id: 'id',
  panoptesId: '12345',
  publications: [],
  title: 'title'
}

describe('Stores > Project', function () {
  let store

  beforeEach(function () {
    store = Project.create(MOCK_PROJECT)
  })

  it('should export an object', function () {
    expect(Project).to.be.an('object')
  })

  it('should have an `avatarSrc` property', function () {
    expect(store.avatarSrc).to.equal(MOCK_PROJECT.avatarSrc)
  })

  it('should have an `id` property', function () {
    expect(store.id).to.equal(MOCK_PROJECT.id)
  })

  it('should have an `panoptesId` property', function () {
    expect(store.panoptesId).to.equal(MOCK_PROJECT.panoptesId)
  })

  it('should have an `publications` property', function () {
    expect(store.publications).to.deep.equal(MOCK_PROJECT.publications)
  })

  it('should have an `title` property', function () {
    expect(store.title).to.equal(MOCK_PROJECT.title)
  })
})
