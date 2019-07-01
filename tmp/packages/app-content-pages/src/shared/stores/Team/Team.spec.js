import { expect } from 'chai'

import Team from './Team'

const MOCK_TEAM = {
  id: 'id',
  name: 'name',
  people: []
}

describe('Stores > Team', function () {
  let store

  beforeEach(function () {
    store = Team.create(MOCK_TEAM)
  })

  it('should export an object', function () {
    expect(Team).to.be.an('object')
  })

  it('should have an `id` property', function () {
    expect(store.id).to.equal(MOCK_TEAM.id)
  })

  it('should have a `name` property', function () {
    expect(store.name).to.equal(MOCK_TEAM.name)
  })

  it('should have an `people` property', function () {
    expect(store.people).to.deep.equal(MOCK_TEAM.people)
  })
})
