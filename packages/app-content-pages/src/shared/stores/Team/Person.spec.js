import { expect } from 'chai'

import Person from './Person'

const MOCK_PERSON = {
  avatarSrc: 'AVATAR_SRC',
  bio: 'BIO',
  id: 'ID',
  jobTitle: 'JOB_TITLE',
  name: 'NAME',
  twitter: 'TWITTER'
}

describe('Stores > Person', function () {
  let store

  before(function () {
    store = Person.create(MOCK_PERSON)
  })

  it('should export an object', function () {
    expect(Person).to.be.an('object')
  })

  it('should have an `avatarSrc` property', function () {
    expect(store.avatarSrc).to.equal(MOCK_PERSON.avatarSrc)
  })

  it('should have a `bio` property', function () {
    expect(store.bio).to.equal(MOCK_PERSON.bio)
  })

  it('should have an `id` property', function () {
    expect(store.id).to.equal(MOCK_PERSON.id)
  })

  it('should have a `jobTitle` property', function () {
    expect(store.jobTitle).to.equal(MOCK_PERSON.jobTitle)
  })

  it('should have a `name` property', function () {
    expect(store.name).to.equal(MOCK_PERSON.name)
  })

  it('should have a `twitter` property', function () {
    expect(store.twitter).to.equal(MOCK_PERSON.twitter)
  })
})
