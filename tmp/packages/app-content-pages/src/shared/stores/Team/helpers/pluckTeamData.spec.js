import { expect } from 'chai'
import camelCase from 'lodash/camelCase'

import pluckTeamData from './pluckTeamData'

const ID = 'foo'
const NAME = 'baz'

const MOCK_ENTRY = {
  fields: {
    name: NAME
  },
  sys: {
    id: ID
  }
}

describe('Helpers > pluckTeamData', function () {
  it('should exist', function () {
    expect(pluckTeamData).to.be.a('function')
  })

  it('should get the entry team data', function () {
    const plucked = pluckTeamData(MOCK_ENTRY)
    expect(plucked.id).to.equal(ID)
    expect(plucked.name).to.equal(NAME)
    expect(plucked.people).to.deep.equal([])
    expect(plucked.slug).to.equal(camelCase(NAME))
  })
})
